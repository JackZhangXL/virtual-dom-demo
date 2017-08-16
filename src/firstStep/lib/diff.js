import { diffAlgorithm } from './diff_algorithm';
import patch from './patch';

function diffChildren(oldChildren, newChildren, patches, index, currentPatch) {
    const diffs = diffAlgorithm(oldChildren, newChildren, 'key');
    console.log('diffs', diffs);
    newChildren = diffs.children;

    if (diffs.moves.length) {
        const reorderPatch = { type: patch.REORDER, moves: diffs.moves };
        currentPatch.push(reorderPatch);
    }

    let leftNode = null;
    let currentNodeIndex = index;
    oldChildren.forEach((child, i) => {
        currentNodeIndex = (leftNode && leftNode.count)
            ? currentNodeIndex + leftNode.count + 1
            : currentNodeIndex + 1;
        walk(child, newChildren[i], patches, currentNodeIndex);
        leftNode = child;
    });
}

function diffProps(oldNode, newNode) {
    const oldProps = oldNode.props;
    const newProps = newNode.props;

    let key;
    const propsPatches = {};
    let isSame = true;

    // find out different props
    for (key in oldProps) {         // eslint-disable-line
        if (newProps[key] !== oldProps[key]) {
            isSame = false;
            propsPatches[key] = newProps[key];
        }
    }

    // find out new props
    for (key in newProps) {         // eslint-disable-line
        if (!oldProps.hasOwnProperty(key)) {
            isSame = false;
            propsPatches[key] = newProps[key];
        }
    }

    return isSame ? null : propsPatches;
}

function walk(oldNode, newNode, patches, index) {
    if (oldNode === newNode) {
        return;
    }

    const currentPatch = [];

    if (newNode === null) {
        // do nothing
    } else if (typeof oldNode === 'string' && typeof newNode === 'string') {
        // TextNode content replacing
        if (newNode !== oldNode) {
            currentPatch.push({ type: patch.TEXT, content: newNode });
        }
    } else if (oldNode.tagName === newNode.tagName && oldNode.key === newNode.key) {
        // Nodes are the same, diff old node's props and children
        // Diff props
        const propsPatches = diffProps(oldNode, newNode);
        if (propsPatches) {
            console.log('propsPatches', propsPatches);
            currentPatch.push({ type: patch.PROPS, props: propsPatches });
        }
        // Diff children. If the node has a `ignore` property, do not diff children
        diffChildren(oldNode.children, newNode.children, patches, index, currentPatch);
        // if (!isIgnoreChildren(newNode)) {
        //     diffChildren(oldNode.children, newNode.children, patches, index, currentPatch);
        // }
    } else {
        // Nodes are not the same, replace the old node with new node
        currentPatch.push({ type: patch.REPLACE, node: newNode });
    }
console.log('patches', patches);
console.log('currentPatch', currentPatch);
    if (currentPatch.length) {
        patches[index] = currentPatch;
    }
}

function diff(oldTree, newTree) {
    const index = 0;
    const patches = {};
    walk(oldTree, newTree, patches, index);
    return patches;
}

// function isIgnoreChildren (node) {
//     return (node.props && node.props.hasOwnProperty('ignore'));
// }

export default diff;

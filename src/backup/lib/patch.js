import { setAttr } from './util';

const REPLACE = 0;
const REORDER = 1;
const PROPS = 2;
const TEXT = 3;

function setProps(node, props) {
    for (const key in props) {              // eslint-disable-line
        if (props[key] === undefined) {
            node.removeAttribute(key);
        } else {
            setAttr(node, key, props[key]);
        }
    }
}

function reorderChildren(node, moves) {
    const staticNodeList = Array.from(node.childNodes);
    const maps = {};

    staticNodeList.forEach((item) => {
        if (item.nodeType === 1) {
            const key = item.getAttribute('key');
            if (key) {
                maps[key] = item;
            }
        }
    });

    moves.forEach((move) => {
        const index = move.index;
        if (move.type === 0) { // remove item
            if (staticNodeList[index] === node.childNodes[index]) { // maybe have been removed for inserting
                node.removeChild(node.childNodes[index]);
            }
            staticNodeList.splice(index, 1);
        } else if (move.type === 1) { // insert item
            const insertNode = maps[move.item.key]
                ? maps[move.item.key] // reuse old item
                : (typeof move.item === 'object')
                ? move.item.render()
                : document.createTextNode(move.item);
            staticNodeList.splice(index, 0, insertNode);
            node.insertBefore(insertNode, node.childNodes[index] || null);
        }
    });
}

function applyPatches(node, currentPatches) {
    currentPatches.forEach((currentPatch) => {
        switch (currentPatch.type) {
            case REPLACE:
                const newNode = (typeof currentPatch.node === 'string')
                    ? document.createTextNode(currentPatch.node)
                    : currentPatch.node.render();
                node.parentNode.replaceChild(newNode, node);
                break;
            case REORDER:
                reorderChildren(node, currentPatch.moves);
                break;
            case PROPS:
                setProps(node, currentPatch.props);
                break;
            case TEXT:
                if (node.textContent) {
                    node.textContent = currentPatch.content;
                } else {
                    // ie
                    node.nodeValue = currentPatch.content;
                }
                break;
            default:
                throw new Error(`Unknown patch type ${currentPatch.type}`);
        }
    });
}

function dfsWalk(node, walker, patches) {
    const currentPatches = patches[walker.index];

    const len = node.childNodes ? node.childNodes.length : 0;
    for (let i = 0; i < len; i++) {
        walker.index++;
        dfsWalk(node.childNodes[i], walker, patches);
    }

    if (currentPatches) {
        applyPatches(node, currentPatches);
    }
}

function patch(node, patches) {
    dfsWalk(node, { index: 0 }, patches);
}

patch.REPLACE = REPLACE;
patch.REORDER = REORDER;
patch.PROPS = PROPS;
patch.TEXT = TEXT;

export default patch;

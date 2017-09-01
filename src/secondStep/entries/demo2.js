import React, { Component } from 'react';
import { render } from 'react-dom';
import Element from '../lib/element';
import Diff from '../lib/diff';
import Patch from '../lib/patch';

import './demo.pcss';

export default class Demo extends Component {
    render() {
        return (
            <div>
                <div id="realDom">
                    <div id="real-container">
                        <p>Real DOM</p>
                        <div>cannot update</div>
                        <ul>
                            <li className="item">Item 1</li>
                            <li className="item">Item 2</li>
                            <li className="item">Item 3</li>
                        </ul>
                    </div>
                </div>
                <div id="virtualDom" />
            </div>
        );
    }
}

render(
    <Demo />,
    document.getElementById('app'),
);

const renderVirtualDom = () => {
    const tree = Element('div', { id: 'virtual-container' }, [
        Element('p', {}, ['Virtual DOM']),
        Element('div', {}, ['before update']),
        Element('ul', {}, [
            Element('li', { class: 'item' }, ['Item 1']),
            Element('li', { class: 'item' }, ['Item 2']),
            Element('li', { class: 'item' }, ['Item 3']),
        ]),
    ]);

    const root = tree.render();
    document.getElementById('virtualDom').appendChild(root);

    const newTree = Element('div', { id: 'virtual-container' }, [
        Element('h3', {}, ['Virtual DOM']),                     // REPLACE
        Element('div', {}, ['after update']),                   // TEXT
        Element('ul', { class: 'marginLeft10' }, [              // PROPS
            Element('li', { class: 'item' }, ['Item 1']),
            // Element('li', { class: 'item' }, ['Item 2']),    // REORDER remove
            Element('li', { class: 'item' }, ['Item 3']),
        ]),
    ]);

    setTimeout(() => {
        const patches = Diff(tree, newTree);
        Patch(root, patches);
    }, 2000);
};

renderVirtualDom();

// 求三个数字中的最小值
function Minimum(a, b, c) {
    return a < b ? (a < c ? a : c) : (b < c ? b : c);
}

function Levenshtein_Distance(s, t) {
    const sLength = s.length;     // length of s
    const mLength = t.length;     // length of t
    const d = [];           // matrix
    let i;                  // iterates through s
    let j;                  // iterates through t
    let sIndex;                // ith character of s
    let tIndex;                // jth character of t
    let cost;               // cost

    // Step 1
    if (sLength === 0) return mLength;
    if (mLength === 0) return sLength;

    // Step 2
    for (i = 0; i <= sLength; i++) {
        d[i] = [];
        d[i][0] = i;
    }

    for (j = 0; j <= mLength; j++) {
        d[0][j] = j;
    }

    // Step 3
    for (i = 1; i <= sLength; i++) {
        sIndex = s.charAt(i - 1);
        // Step 4
        for (j = 1; j <= mLength; j++) {
            tIndex = t.charAt(j - 1);
            // Step 5
            if (sIndex === tIndex) {
                cost = 0;
            } else {
                cost = 1;
            }

            // Step 6
            d[i][j] = Minimum(d[i-1][j] + 1, d[i][j-1] + 1, d[i-1][j-1] + cost);
        }
    }

    // Step 7
    return d[sLength][mLength];
}

//求两个字符串的相似度,返回相似度百分比
function Levenshtein_Distance_Percent(s, t) {
    const l = s.length > t.length ? s.length : t.length;
    const d = Levenshtein_Distance(s, t);
    return (1 - d / l).toFixed(4);
}

const str1 = 'ddsddf';
const str2 = 'xdsfsx';

alert(Levenshtein_Distance_Percent(str1, str2));

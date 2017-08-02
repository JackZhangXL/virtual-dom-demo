import React, { Component } from 'react';
import { render } from 'react-dom';
import Element from '../lib/element';
import Diff from '../lib/diff';
import Patch from '../lib/patch';

import './demo.pcss';

export default class Demo extends Component {
    render() {
        return (
            <div className="wrap">
                <div id="realDom">
                    <h3>Real DOM</h3>
                    <ul id="list1">
                        <li className="item">Item 1</li>
                        <li className="item">Item 2</li>
                        <li className="item">Item 3</li>
                    </ul>
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
    const tree = Element('div', {'id': 'container'}, [
        Element('h3', ['Virtual DOM']),
        Element('p', ['before update']),
        Element('ul', [
            Element('li', { class: 'item' }, ['Item 1']),
            Element('li', { class: 'item' }, ['Item 2']),
            Element('li', { class: 'item' }, ['Item 3']),
        ]),
    ]);

    const root = tree.render();
    document.getElementById('virtualDom').appendChild(root);

    const newTree = Element('div', {'id': 'container'}, [
        Element('h3', {style: 'color: red'}, ['Virtual DOM']),
        Element('p', {style: 'color: red'}, ['after update']),
        Element('ul', [
            Element('li', { class: 'item red' }, ['Update Item 1']),
            Element('li', { class: 'item red' }, ['Update Item 2']),
            Element('li', { class: 'item red' }, ['Update Item 3']),
        ]),
    ]);

    setTimeout(() => {
        const patches = Diff(tree, newTree);
        Patch(root, patches);
    }, 2000);
};

renderVirtualDom();

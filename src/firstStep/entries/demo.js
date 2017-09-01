import React, { Component } from 'react';
import { render } from 'react-dom';
import Element from '../lib/element';

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
};

renderVirtualDom();

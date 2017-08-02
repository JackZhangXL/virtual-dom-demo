import React, { Component } from 'react';
import { render } from 'react-dom';
import Element from '../lib/element';

import './demo.pcss';

export default class Demo extends Component {

    render() {
        return (
            <div className="wrap">
                <h3>Real DOM</h3>
                <div id="realDom">
                    <ul id="list1">
                        <li className="item">Item 1</li>
                        <li className="item">Item 2</li>
                        <li className="item">Item 3</li>
                    </ul>
                </div>
                <h3>Virtual DOM</h3>
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
    const ul = Element('ul', {id: 'list2'}, [
        Element('li', {class: 'item'}, ['Item 1']),
        Element('li', {class: 'item'}, ['Item 2']),
        Element('li', {class: 'item'}, ['Item 3']),
    ]);

    const ulRoot = ul.render();
    document.getElementById('virtualDom').appendChild(ulRoot)
};

renderVirtualDom();

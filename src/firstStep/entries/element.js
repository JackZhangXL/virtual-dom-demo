import React, { Component } from 'react';
import { render } from 'react-dom';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import './element.pcss';

export default class Number extends Component {

    addNum = () => {
        console.log('addNum');
    };

    minusNum = () => {
        console.log('minusNum');
    };

    clearNum = () => {
        console.log('clearNum');
    };

    render() {
        return (
            <div className="wrap">
                <h3>origin Redux</h3>
                Current Number: <span className="numValue">0</span>
                <div>
                    <Button size="large" className="numBtn" onClick={this.addNum}>+</Button>
                    <Button size="large" className="numBtn" onClick={this.minusNum}>-</Button>
                    <Button size="large" className="numBtn" onClick={this.clearNum}>clear</Button>
                </div>
            </div>
        );
    }
}

render(
    <Number />,
    document.getElementById('app'),
);

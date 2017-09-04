import React, { Component } from 'react';
import { render } from 'react-dom';
import { Input, Button } from 'antd';
import 'antd/dist/antd.css';
import './demo.pcss';

export default class Demo extends Component {
    static Minimum = (a, b, c) => {
        return a < b ? (a < c ? a : c) : (b < c ? b : c);
    };

    static LevenshteinDistance = (s, t) => {
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
                d[i][j] = Demo.Minimum(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
            }
        }

        // Step 7
        return d[sLength][mLength];
    };

    // 求两个字符串的相似度,返回相似度百分比
    static LevenshteinDistancePercent = (s, t) => {
        const l = s.length > t.length ? s.length : t.length;
        const d = Demo.LevenshteinDistance(s, t);
        return (1 - (d / l)).toFixed(4);
    };

    constructor() {
        super();
        this.state = {
            value1: '',
            value2: '',
            result: 0,
        };
    }

    handleClick = () => {
        const {
            value1,
            value2,
        } = this.state;

        const result = Demo.LevenshteinDistancePercent(value1, value2);
        this.setState({
            result,
        });
    };

    handleChange1 = (e) => {
        this.setState({
            value1: e.target.value,
        });
    };

    handleChange2 = (e) => {
        this.setState({
            value2: e.target.value,
        });
    };

    render() {
        const {
            value1,
            value2,
            result,
        } = this.state;

        return (
            <div>
                <h3>Levenshtein Distance</h3>
                <Input
                    style={{ marginTop: '20px', width: '200px', display: 'block' }}
                    value={value1}
                    onChange={this.handleChange1}
                />
                <Input
                    style={{ marginTop: '20px', width: '200px', display: 'block' }}
                    value={value2}
                    onChange={this.handleChange2}
                />
                <Button style={{ marginTop: '20px' }} onClick={this.handleClick}>计算</Button>
                <p style={{ marginTop: '20px', fontSize: '18px' }}>Result: {result}</p>
            </div>
        );
    }
}

render(
    <Demo />,
    document.getElementById('app'),
);

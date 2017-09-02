import { setAttr } from './util';

function Element(tagName, props, children) {
    if (!(this instanceof Element)) {
        return new Element(tagName, props, children);
    }

    this.tagName = tagName;
    this.props = props || {};
    this.children = children || [];
    this.key = props ? props.key : undefined;

    let count = 0;
    this.children.forEach((child) => {
        if (child instanceof Element) {
            count += child.count;
        }
        count++;
    });
    this.count = count;
}

/**
 * Render the hold element tree.
 */
Element.prototype.render = function() {             // eslint-disable-line
    const el = document.createElement(this.tagName);
    const props = this.props;

    for (const propName in props) {                 // eslint-disable-line
        setAttr(el, propName, props[propName]);     // eslint-disable-line
    }

    this.children.forEach((child) => {
        const childEl = (child instanceof Element) ? child.render() : document.createTextNode(child);
        el.appendChild(childEl);
    });

    return el;
};

export default Element;

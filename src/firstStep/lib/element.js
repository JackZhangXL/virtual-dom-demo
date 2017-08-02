import _ from './util';

function Element (tagName, props, children) {
    if (!(this instanceof Element)) {
        if (!Array.isArray(children) && children != null) {
            children = arguments.slice(2).filter(_.truthy);
        }
        return new Element(tagName, props, children);
    }

    if (Array.isArray(props)) {
        children = props;
        props = {};
    }

    this.tagName = tagName;
    this.props = props || {};
    this.children = children || [];
    this.key = props ? props.key : void 666;

    let count = 0;

    this.children.forEach((child, i) => {
        if (child instanceof Element) {
            count += child.count;
        } else {
            children[i] = '' + child;
        }
        count++;
    });

    this.count = count;
}

/**
 * Render the hold element tree.
 */
Element.prototype.render = function () {
    const el = document.createElement(this.tagName);
    const props = this.props;

    for (const propName in props) {
        const propValue = props[propName];
        _.setAttr(el, propName, propValue);
    }

    this.children.forEach((child) => {
        const childEl = (child instanceof Element) ? child.render() : document.createTextNode(child);
        el.appendChild(childEl);
    });

    return el;
};

export default Element;

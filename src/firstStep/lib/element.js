import _ from './util';

function Element(tagName, props, children) {
    if (!(this instanceof Element)) {
        // if (!Array.isArray(children) && children != null) {
        //     children = arguments.slice(2).filter(_.truthy);
        // }
        return new Element(tagName, props, children);
    }

    this.tagName = tagName;
    this.props = props || {};
    this.children = children || [];
    this.key = props ? props.key : undefined;

    let count = 0;
    this.children.forEach((child, i) => {
        if (child instanceof Element) {
            count += child.count;
        // } else {
        //     children[i] = '' + child;
        }
        count++;
    });
    this.count = count; // li: 1    ul: 6   div: 11
}

/**
 * Render the hold element tree.
 */
Element.prototype.render = function() {             // eslint-disable-line
    const el = document.createElement(this.tagName);
    const props = this.props;

    for (const propName in props) {                 // eslint-disable-line
        _.setAttr(el, propName, props[propName]);   // eslint-disable-line
    }

    this.children.forEach((child) => {
        const childEl = (child instanceof Element) ? child.render() : document.createTextNode(child);
        el.appendChild(childEl);
    });

    return el;
};

export default Element;

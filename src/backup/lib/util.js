// _.truthy = function truthy (value) {
//     return !!value
// }

export const setAttr = (node, key, value) => {
    switch (key) {
        case 'style':
            node.style.cssText = value;
            break;
        case 'value': {
            const tagName = node.tagName.toLowerCase() || '';
            if (tagName === 'input' || tagName === 'textarea') {
                node.value = value;
            } else {
                node.setAttribute(key, value);
            }
            break;
        }
        default:
            node.setAttribute(key, value);
            break;
    }
};

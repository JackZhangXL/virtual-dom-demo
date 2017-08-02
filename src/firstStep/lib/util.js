var _ = exports

_.type = function (obj) {
    return Object.prototype.toString.call(obj).replace(/\[object\s|\]/g, '')
}

_.truthy = function truthy (value) {
    return !!value
}

_.isString = function isString (list) {
    return _.type(list) === 'String'
}

_.toArray = function toArray (listLike) {
    if (!listLike) {
        return []
    }

    var list = []

    for (var i = 0, len = listLike.length; i < len; i++) {
        list.push(listLike[i])
    }

    return list
}

_.setAttr = function setAttr (node, key, value) {
    switch (key) {
        case 'style':
            node.style.cssText = value
            break
        case 'value':
            var tagName = node.tagName || ''
            tagName = tagName.toLowerCase()
            if (
                tagName === 'input' || tagName === 'textarea'
            ) {
                node.value = value
            } else {
                // if it is not a input or textarea, use `setAttribute` to set
                node.setAttribute(key, value)
            }
            break
        default:
            node.setAttribute(key, value)
            break
    }
}

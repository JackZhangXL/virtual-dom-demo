function getItemKey(item, key) {
    if (!item || !key) {
        return undefined;
    }

    return typeof key === 'string' ? item[key] : key(item);
}

/**
 * Convert list to key-item keyIndex object.
 * @param {Array} list
 * @param {String|Function} key
 */
function makeKeyIndexAndFree(list, key) {
    const keyIndex = {};
    const free = [];
    for (let i = 0, len = list.length; i < len; i++) {
        const item = list[i];
        const itemKey = getItemKey(item, key);
        if (itemKey) {
            keyIndex[itemKey] = i;
        } else {
            free.push(item);
        }
    }
    return {
        keyIndex,
        free,
    };
}

/**
 * Diff two list in O(N).
 * @param {Array} oldList - Original List
 * @param {Array} newList - List After certain insertions, removes, or moves
 * @return {Object} - {moves: <Array>}
 *                  - moves is a list of actions that telling how to remove and insert
 */
function diffAlgorithm(oldList, newList, key) {
    const oldMap = makeKeyIndexAndFree(oldList, key);
    const newMap = makeKeyIndexAndFree(newList, key);

    const newFree = newMap.free;

    const oldKeyIndex = oldMap.keyIndex;
    const newKeyIndex = newMap.keyIndex;

    const moves = [];

    // a simulate list to manipulate
    const children = [];
    let i = 0;
    let item;
    let itemKey;
    let freeIndex = 0;

    // fist pass to check item in old list: if it's removed or not
    while (i < oldList.length) {
        item = oldList[i];
        itemKey = getItemKey(item, key);
        if (itemKey) {
            if (!newKeyIndex.hasOwnProperty(itemKey)) {
                children.push(null);
            } else {
                children.push(newList[newKeyIndex[itemKey]]);
            }
        } else {
            children.push(newFree[freeIndex++] || null);
        }
        i++;
    }

    const simulateList = children.slice(0);

    function remove(index) {
        moves.push({ index, type: 0 });
    }

    function insert(index, item) {
        moves.push({ index, item, type: 1 });
    }

    function removeSimulate(index) {
        simulateList.splice(index, 1);
    }

    // remove items no longer exist
    i = 0;
    while (i < simulateList.length) {
        if (simulateList[i] === null) {
            remove(i);
            removeSimulate(i);
        } else {
            i++;
        }
    }

    // i is cursor pointing to a item in new list
    // j is cursor pointing to a item in simulateList
    let j = (i = 0);
    while (i < newList.length) {
        item = newList[i];
        itemKey = getItemKey(item, key);

        const simulateItem = simulateList[j];
        const simulateItemKey = getItemKey(simulateItem, key);

        if (simulateItem) {
            if (itemKey === simulateItemKey) {
                j++;
            } else {
                // new item, just inesrt it
                if (!oldKeyIndex.hasOwnProperty(itemKey)) {
                    insert(i, item);
                } else {
                    // if remove current simulateItem make item in right place
                    // then just remove it
                    const nextItemKey = getItemKey(simulateList[j + 1], key);
                    if (nextItemKey === itemKey) {
                        remove(i);
                        removeSimulate(j);
                        j++; // after removing, current j is right, just jump to next one
                    } else {
                        // else insert item
                        insert(i, item);
                    }
                }
            }
        } else {
            insert(i, item);
        }

        i++;
    }

    return {
        moves,
        children,
    };
}

// export makeKeyIndexAndFree;
export default diffAlgorithm;

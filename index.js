exports.json2Tree = function (jsonArray, config) {
    const getChildren = (array, parentId, config) => {
        let children = [];
        array.forEach(node => {
            if (node[config.nodeParentIdField] === parentId) {
                node[config.childrenField] = getChildren(array, node[config.nodeIdField], config);
                Object.keys(config.fieldMaps).forEach(key => {
                    node[config.fieldMaps[key]] = node[key] || undefined
                });
                children.push(node);
            }
        });
        return children;
    };
    let returnData;
    config = Object.assign({
        nodeIdField: 'id',
        nodeParentIdField: 'parentId',
        topNodeValue: 0,
        childrenField: 'children',
        fieldMaps: {}
    }, config || {});
    const array = JSON.parse(JSON.stringify(jsonArray));
    returnData = getChildren(array, config.topNodeValue, config) || [];
    return returnData
}

exports.tree2Json = function (treeData, config) {
    const findChildren = (childrenData, parentId, returnData) => {
        childrenData.forEach(node => {
            node[config.nodeParentIdField] = parentId;
            Object.keys(config.fieldMaps).forEach(key => {
                node[config.fieldMaps[key]] = node[key] || undefined
            });
            if (Array.isArray(node[config.childrenField])) {
                findChildren(node[config.childrenField], node.id, returnData);
                if (config.retainChildren !== true) {
                    delete node[config.childrenField]
                }
            }
            returnData.push(node)
        })
    };
    config = Object.assign({
        nodeParentIdField: 'parentId',
        topNodeValue: 0,
        childrenField: 'children',
        fieldMaps: {},
        retainChildren: false
    }, config || {});
    let returnData = [];
    const array = JSON.parse(JSON.stringify(treeData));
    findChildren(array, config.topNodeValue, returnData);
    return returnData
}
/** ============================================= 组装树结构 ============================================= **/

const parse_getChildren = (array, parentId, config) => {
    let returnData = [];
    array.forEach(node => {
        if (node[config.parentIdField] === parentId) {
            const children = parse_getChildren(array, node[config.idField], config);
            if (config.handleNode) {
                config.handleNode(node, children)
            }
            node[config.childrenField] = children;
            returnData.push(node);
        }
    });
    return returnData;
};

exports.parse = function (jsonArray, config = {}) {
    let returnData;
    config = Object.assign({
        idField: 'id',
        parentIdField: 'parentId',
        topNodeParentId: 0,
        childrenField: 'children',
        handleNode: null
    }, config);
    const array = JSON.parse(JSON.stringify(jsonArray));
    returnData = parse_getChildren(array, config.topNodeParentId, config) || [];
    return returnData
};

/** ============================================= 组装树结构 ============================================= **/


/** ============================================= 拆解树结构 ============================================= **/

let data = []

const jsonify_findChildren = (children, parentId, config) => {
    children.forEach(node => {
        node[config.parentIdField] = parentId;
        if (Array.isArray(node[config.childrenField])) {
            jsonify_findChildren(node[config.childrenField], node.id, config);
            if (config.retainChildren !== true) {
                delete node[config.childrenField]
            }
        }
        if (config.handleNode) {
            config.handleNode(node, children)
        }
        data.push(node)
    })
};

exports.jsonify = function (treeData, config = {}) {
    config = Object.assign({
        parentIdField: 'parentId',
        topNodeParentId: 0,
        childrenField: 'children',
        retainChildren: false,
        handleNode: null
    }, config);
    data = [];
    const array = JSON.parse(JSON.stringify(treeData));
    jsonify_findChildren(array, config.topNodeParentId, config);
    return data
};

/** ============================================= 拆解树结构 ============================================= **/
/** ========================== 组装树结构 ========================== **/

const parse_getChildren = (data, parentId, config) => {
    let returnData = [];
    data.forEach(node => {
        if (node[config.parentIdField] === parentId) {
            const children = parse_getChildren(data, node[config.idField], config);
            if (config.handleNode) {
                config.handleNode(node, children)
            }
            node[config.childrenField] = children;
            returnData.push(node);
        }
    });
    return returnData;
};

const parse = function (jsonArray, config = {}) {
    let returnData;
    config = Object.assign({
        idField: 'id',
        parentIdField: 'parentId',
        topNodeParentId: 0,
        childrenField: 'children',
        handleNode: null
    }, config);
    const data = JSON.parse(JSON.stringify(jsonArray));
    returnData = parse_getChildren(data, config.topNodeParentId, config) || [];
    return returnData
};

/** ========================== 组装树结构 ========================== **/


/** ========================== 拆解树结构 ========================== **/

let globalData = []

const jsonify_findChildren = (data, parentId, config) => {
    data.forEach(node => {
        node[config.parentIdField] = parentId;
        const children = node[config.childrenField] || []
        if (config.handleNode) {
            config.handleNode(node, children)
        }
        if (Array.isArray(children)) {
            jsonify_findChildren(children, node.id, config);
            if (config.retainChildren !== true) {
                delete node[config.childrenField]
            }
        }
        globalData.push(node)
    })
};

const jsonify = function (treeData, config = {}) {
    config = Object.assign({
        parentIdField: 'parentId',
        topNodeParentId: 0,
        childrenField: 'children',
        retainChildren: false,
        handleNode: null
    }, config);
    globalData = [];
    const data = JSON.parse(JSON.stringify(treeData));
    jsonify_findChildren(data, config.topNodeParentId, config);
    return globalData
};

/** ========================== 拆解树结构 ========================== **/


/** ========================== 在json数据中查找某个节点的父亲节点 ========================== **/

findParentsInJson_json = (id, data, config, remainNode) => {
    data.forEach(node => {
        if (id === node[config.idField]) {
            if (remainNode) {
                globalData.unshift(node);
            }
            if (node[config.parentIdField] !== config.topNodeParentId) {
                findParentsInJson_json(node[config.parentIdField], data, config, true)
            }
        }
    })
}

const findParentsInJson_ids = (id, data, config, remainNode) => {
    data.forEach(node => {
        if (id === node[config.idField]) {
            if (remainNode) {
                globalData.unshift(node[config.idField]);
            }
            if (node[config.parentIdField] !== config.topNodeParentId) {
                findParentsInJson_ids(node[config.parentIdField], data, config, true)
            }
        }
    })
}

const findParentsInJson = function (id, data, config) {
    config = Object.assign({
        idField: 'id',
        parentIdField: 'parentId',
        topNodeParentId: 0,
        returnType: 'ids', //ids json tree
        remainNode: true,
    }, config);
    globalData = [];
    switch (config.returnType) {
        case "ids":
            findParentsInJson_ids(id, data, config, config.remainNode);
            break
        case 'tree':
            findParentsInJson_json(id, data, config, config.remainNode);
            globalData = parse(globalData, config);
            break
        default:
            findParentsInJson_json(id, data, config, config.remainNode);
    }
    return globalData
}

const testData = [
    {nodeId: 1, name: '节点1', pid: null},
    {nodeId: 2, name: '节点1-1', pid: 1},
    {nodeId: 3, name: '节点1-2', pid: 1},
    {nodeId: 4, name: '节点1-1-1', pid: 2},
    {nodeId: 5, name: '节点1-1-2', pid: 2},
];

const a = findParentsInJson(5, testData, {
    idField: 'nodeId',
    parentIdField: 'pid',
    topNodeParentId: null,
    returnType: 'tree', //ids json tree
})

console.log(JSON.stringify(a))

/** ========================== 在json数据中查找某个节点的父亲节点 ========================== **/

exports = {parse, jsonify, findParentsInJson}
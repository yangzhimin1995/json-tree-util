/** ========================== 组装树结构 ========================== **/

const parse_getChildren = (data, parentId, options) => {
    let returnData = [];
    data.forEach(node => {
        if (node[options.parentIdField] === parentId) {
            const children = parse_getChildren(data, node[options.idField], options);
            if (options.handleNode) {
                options.handleNode(node, children)
            }
            node[options.childrenField] = children;
            returnData.push(node);
        }
    });
    return returnData;
};

const parse = function (jsonArray, options = {}) {
    let returnData;
    options = Object.assign({
        idField: 'id',
        parentIdField: 'parentId',
        topNodeParentId: 0,
        childrenField: 'children',
        handleNode: null
    }, options);
    const data = JSON.parse(JSON.stringify(jsonArray));
    returnData = parse_getChildren(data, options.topNodeParentId, options) || [];
    return returnData
};

/** ========================== 组装树结构 ========================== **/


/** ========================== 拆解树结构 ========================== **/

let globalData = []

const jsonify_findChildren = (data, parentId, options) => {
    data.forEach(node => {
        node[options.parentIdField] = parentId;
        const children = node[options.childrenField] || []
        if (options.handleNode) {
            options.handleNode(node, children)
        }
        if (Array.isArray(children)) {
            jsonify_findChildren(children, node.id, options);
            if (options.retainChildren !== true) {
                delete node[options.childrenField]
            }
        }
        globalData.push(node)
    })
};

const jsonify = function (treeData, options = {}) {
    options = Object.assign({
        parentIdField: 'parentId',
        topNodeParentId: 0,
        childrenField: 'children',
        retainChildren: false,
        handleNode: null
    }, options);
    globalData = [];
    const data = JSON.parse(JSON.stringify(treeData));
    jsonify_findChildren(data, options.topNodeParentId, options);
    return globalData
};

/** ========================== 拆解树结构 ========================== **/


/** ========================== 在json数据中查找某个节点的父亲节点 ========================== **/

const findParentsInJson_json = (id, data, options, remainNode) => {
    data.forEach(node => {
        if (id === node[options.idField]) {
            if (remainNode) {
                globalData.unshift(node);
            }
            if (node[options.parentIdField] !== options.topNodeParentId) {
                findParentsInJson_json(node[options.parentIdField], data, options, true)
            }
        }
    })
}

const findParentsInJson_id = (id, data, options, remainNode) => {
    data.forEach(node => {
        if (id === node[options.idField]) {
            if (remainNode) {
                globalData.unshift(node[options.idField]);
            }
            if (node[options.parentIdField] !== options.topNodeParentId) {
                findParentsInJson_id(node[options.parentIdField], data, options, true)
            }
        }
    })
}

const findParentsInJson = function (id, data, options) {
    options = Object.assign({
        idField: 'id',
        parentIdField: 'parentId',
        topNodeParentId: 0,
        returnType: 'id', //id json tree
        remainNode: true,
    }, options);
    globalData = [];
    switch (options.returnType) {
        case "id":
            findParentsInJson_id(id, data, options, options.remainNode);
            break
        case 'tree':
            findParentsInJson_json(id, data, options, options.remainNode);
            globalData = parse(globalData, options);
            break
        default:
            findParentsInJson_json(id, data, options, options.remainNode);
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
    returnType: 'tree', //id json tree
})

console.log(JSON.stringify(a))

//返回id
//     [1,2,5]

//返回json数组
//     [
//         {"nodeId":1,"name":"节点1","pid":null},
//         {"nodeId":2,"name":"节点1-1","pid":1},
//         {"nodeId":5,"name":"节点1-1-2","pid":2}
//     ]

//返回树状结构
//     [{
//         "nodeId": 1,
//         "name": "节点1",
//         "pid": null,
//         "children": [{
//             "nodeId": 2,
//             "name": "节点1-1",
//             "pid": 1,
//             "children": [{
//                 "nodeId": 5,
//                 "name": "节点1-1-2",
//                 "pid": 2,
//                 "children": []
//             }]
//         }]
//     }]

/** ========================== 在json数据中查找某个节点的父亲节点 ========================== **/

exports = {parse, jsonify, findParentsInJson}
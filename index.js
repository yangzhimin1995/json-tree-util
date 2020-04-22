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
        data.push(node)
    })
};

jsonify = function (treeData, config = {}) {
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

const testData = [{
    id: 1,
    name: "节点1",
    pid: null,
    childrenList: [{
        id: 2,
        name: "节点1-1",
        pid: 1,
        childrenList: [{
            id: 4,
            name: "节点1-1-1",
            pid: 2,
        }, {
            id: 5,
            name: "节点1-1-2",
            pid: 2,
        }],
    }, {
        id: 3,
        name: "节点1-2",
        pid: 1,
    }],
}];

const handleNode = (node, children) => {
    node['label'] = node.name;
    node['isLeaf'] = children.length === 0;
}

const returnData = jsonify(testData, {
    parentIdField: 'pid',
    topNodeParentId: null,
    childrenField: 'childrenList',
    retainChildren: false,
    handleNode,
})

console.log(JSON.stringify(returnData))

/** ============================================= 拆解树结构 ============================================= **/
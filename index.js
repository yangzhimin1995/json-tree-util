const json = {};
const tree = {};

/** ========================== 组装树结构 ========================== **/

const jp_findChildren = (data, parentId, options) => {
    let returnData = [];
    data.forEach(node => {
        if (node[options.parentIdField] === parentId) {
            const children = jp_findChildren(data, node[options.idField], options);
            if (options.handleNode) {
                options.handleNode(node, children)
            }
            node[options.childrenField] = children;
            returnData.push(node);
        }
    });
    return returnData;
};

json.parse = function (data, options = {}) {
    options = Object.assign({
        idField: 'id',
        parentIdField: 'parentId',
        topNodeParentId: 0,
        childrenField: 'children',
        handleNode: null
    }, options);
    let returnData;
    returnData = jp_findChildren(data, options.topNodeParentId, options) || [];
    return returnData
};

/** ========================== 组装树结构 ========================== **/


/** ========================== 拆解树结构 ========================== **/


const tj_findChildren = (data, parentId, options, returnData) => {
    data.forEach(node => {
        if (options.parentIdField) {
            node[options.parentIdField] = parentId
        }
        const children = node[options.childrenField] || []
        if (options.handleNode) {
            options.handleNode(node, children)
        }
        tj_findChildren(children, node[options.idField], options, returnData);
        if (options.remainChildren !== true) {
            delete node[options.childrenField]
        }
        returnData.push(node)
    })
};

tree.jsonify = function (data, options = {}) {
    options = Object.assign({
        idField: 'id',
        parentIdField: '',
        topNodeParentId: undefined,
        childrenField: 'children',
        remainChildren: false,
        handleNode: null
    }, options);
    const returnData = [];
    tj_findChildren(data, options.topNodeParentId, options, returnData);
    return returnData
};

/** ========================== 拆解树结构 ========================== **/

/** ========================== 在json数组中寻找某目标节点的父节点，返回id数组 ========================== **/

const jf_findParents = (data, parentId, remainNode, options, returnData, type = 'id') => {
    data.forEach(node => {
        const id = node[options.idField]
        if (id === parentId) {
            if (remainNode) {
                if (type === 'id') {
                    returnData.unshift(id);
                } else {
                    returnData.unshift(node);
                }
            }
            jf_findParents(data, node[options.parentIdField], true, options, returnData, type)
        }
    })
}

json.findParentIds = (id, data, options) => {
    options = Object.assign({
        idField: 'id',
        parentIdField: 'parentId',
        remainNode: false,
    }, options);
    let returnData = [];
    jf_findParents(data, id, options.remainNode, options, returnData);
    return returnData
}

/** ========================== 在json数组中寻找某目标节点的父节点，返回id数组 ========================== **/


/** ========================== 在json数组中寻找某目标节点的父节点，返回json数组 ========================== **/

json.findParents = (id, data, options) => {
    options = Object.assign({
        idField: 'id',
        parentIdField: 'parentId',
        remainNode: false,
    }, options);
    let returnData = [];
    jf_findParents(data, id, options.remainNode, options, returnData, 'node');
    return returnData
}

/** ========================== 在json数组中寻找某目标节点的父节点，返回json数组 ========================== **/


/** ========================== 在json数组中寻找某目标节点的子节点，返回id数组 ========================== **/

const jf_findChildren = (data, nodeId, remainNode, options, returnData, type = 'id') => {
    data.forEach(node => {
        const id = node[options.idField];
        if (id === nodeId) {
            if (remainNode) {
                if (type === 'id') {
                    returnData.push(id);
                } else {
                    returnData.push(node);
                }
            }
        }
        if (node[options.parentIdField] === nodeId) {
            jf_findChildren(data, id, true, options, returnData, type)
        }
    })
}

json.findChildrenIds = (id, data, options) => {
    options = Object.assign({
        idField: 'id',
        parentIdField: 'parentId',
        remainNode: false,
    }, options);
    let returnData = [];
    jf_findChildren(data, id, options.remainNode, options, returnData);
    return returnData
}

/** ========================== 在json数组中寻找某目标节点的子节点，返回id数组 ========================== **/


/** ========================== 在json数组中寻找某目标节点的子节点，返回json数组 ========================== **/

json.findChildren = (id, data, options) => {
    options = Object.assign({
        idField: 'id',
        parentIdField: 'parentId',
        remainNode: false,
    }, options);
    let returnData = [];
    jf_findChildren(data, id, options.remainNode, options, returnData, 'node');
    return returnData
}

/** ========================== 在json数组中寻找某目标节点的子节点，返回json数组 ========================== **/

module.exports = {json, tree}
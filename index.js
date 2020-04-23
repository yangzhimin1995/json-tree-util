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

const parse = function (data, options = {}) {
    options = Object.assign({
        idField: 'id',
        parentIdField: 'parentId',
        topNodeParentId: 0,
        childrenField: 'children',
        handleNode: null
    }, options);
    let returnData;
    returnData = parse_getChildren(data, options.topNodeParentId, options) || [];
    return returnData
};

/** ========================== 组装树结构 ========================== **/


/** ========================== 拆解树结构 ========================== **/


const jsonify_findChildren = (data, parentId, options, returnData) => {
    data.forEach(node => {
        if (options.parentIdField) {
            node[options.parentIdField] = parentId
        }
        const children = node[options.childrenField] || []
        if (options.handleNode) {
            options.handleNode(node, children)
        }
        jsonify_findChildren(children, node[options.idField], options, returnData);
        if (options.remainChildren !== true) {
            delete node[options.childrenField]
        }
        returnData.push(node)
    })
};

const jsonify = function (data, options = {}) {
    options = Object.assign({
        idField: 'id',
        parentIdField: '',
        topNodeParentId: undefined,
        childrenField: 'children',
        remainChildren: false,
        handleNode: null
    }, options);
    const returnData = [];
    jsonify_findChildren(data, options.topNodeParentId, options, returnData);
    return returnData
};

/** ========================== 拆解树结构 ========================== **/


/** ========================== 在树形数据中寻找某目标节点的所有父节点的id数组 ========================== **/



/** ========================== 拆解树结构 ========================== **/

module.exports = {parse, jsonify}
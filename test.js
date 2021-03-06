const jtUtils = require('./index')

const list = [
    {id: 1, name: "一级 1", parentId: 0},
    {id: 2, name: "二级 1-1", parentId: 1},
    {id: 3, name: "三级 1-1-1", parentId: 2},
    {id: 4, name: "一级 2", parentId: 0},
    {id: 5, name: "二级 2-1", parentId: 4},
    {id: 6, name: "三级 2-1-1", parentId: 5},
    {id: 7, name: "二级 2-2", parentId: 4},
    {id: 8, name: "三级 2-2-1", parentId: 7},
    {id: 9, name: "一级 3", parentId: 0},
    {id: 10, name: "二级 3-1", parentId: 9},
    {id: 11, name: "三级 3-1-1", parentId: 10},
    {id: 12, name: "二级 3-2", parentId: 9},
    {id: 13, name: "三级 3-2-1", parentId: 12},
    {id: 14, name: "三级 3-2-2", parentId: 12},
]

const treeData = [{
    id: 1,
    name: '一级 1',
    children: [{
        id: 2,
        name: '二级 1-1',
        children: [{
            id: 3,
            name: '三级 1-1-1'
        }]
    }]
}, {
    id: 4,
    name: '一级 2',
    children: [{
        id: 5,
        name: '二级 2-1',
        children: [{
            id: 6,
            name: '三级 2-1-1'
        }]
    }, {
        id: 7,
        name: '二级 2-2',
        children: [{
            id: 8,
            name: '三级 2-2-1'
        }]
    }]
}, {
    id: 9,
    name: '一级 3',
    children: [{
        id: 10,
        name: '二级 3-1',
        children: [{
            id: 11,
            name: '三级 3-1-1'
        }]
    }, {
        id: 12,
        name: '二级 3-2',
        children: [{
            id: 13,
            name: '三级 3-2-1'
        }, {
            id: 14,
            name: '三级 3-2-2'
        }]
    }]
}];

/** =================================================================================== **/

// const handleNode = (node, children) => {
//     node['label'] = node.name;
//     node['isLeaf'] = children.length === 0;
// }
// const data = jtUtils.json.parse(list, {
//     handleNode
// })
// console.log(JSON.stringify(data))

/** =================================================================================== **/

// const handleNode = (node, children) => {
//     node['label'] = node.name;
//     node['isLeaf'] = children.length === 0;
// }
// const data = jtUtils.tree.jsonify(treeData, {
//     parentIdField: 'parent-id', // 设置。父节点存放的字段
//     topNodeParentId: null, // 设置。顶级节点的父id的值
//     handleNode
// })
// console.log(JSON.stringify(data))

/** =================================================================================== **/

// const handleFilter = (node) => {
//     if (node.name.indexOf('2-2') !== -1) {
//         node['isTargetNode'] = true;
//         return node
//     }
// }
// const data = jtUtils.json.filter(list, handleFilter)
// console.log(JSON.stringify(data))

/** =================================================================================== **/

// const data = jtUtils.json.findParentIds(13, list, {remainNode: true})
// console.log(JSON.stringify(data))

/** =================================================================================== **/

// const data = jtUtils.json.findParents(13, list, {remainNode: true})
// console.log(JSON.stringify(data))

/** =================================================================================== **/

// const data = jtUtils.json.findChildrenIds(12, list, {remainNode: true})
// console.log(JSON.stringify(data))

/** =================================================================================== **/

// const data = jtUtils.json.findChildren(12, list, {remainNode: true})
// console.log(JSON.stringify(data))

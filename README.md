# json-tree-utils

### json数组、树形数据的处理工具


#### 安装
```

npm i json-tree-utils

```

#### 引入
```

import jtUtils from "json-tree-utils"

```

#### 准备点测试数据
   ```
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
        id:1,
        name: '一级 1',
        children: [{
            id:2,
            name: '二级 1-1',
            children: [{
                id:3,
                name: '三级 1-1-1'
            }]
        }]
    }, {
        id:4,
        name: '一级 2',
        children: [{
            id:5,
            name: '二级 2-1',
            children: [{
                id:6,
                name: '三级 2-1-1'
            }]
        }, {
            id:7,
            name: '二级 2-2',
            children: [{
                id:8,
                name: '三级 2-2-1'
            }]
        }]
    }, {
        id:9,
        name: '一级 3',
        children: [{
            id:10,
            name: '二级 3-1',
            children: [{
                id:11,
                name: '三级 3-1-1'
            }]
        }, {
            id:12,
            name: '二级 3-2',
            children: [{
                id:13,
                name: '三级 3-2-1'
            },{
                id:14,
                name: '三级 3-2-2'
            }]
        }]
    }];  

   ```

#### 组装树结构(json数组转成树形数据)
   ```
   
    jtUtils.json.parse(data, options);

    data: json数组
    options: 可选配置项
   
    默认 options = {        
       idField: 'id', // 指定项。节点唯一标识的字段，整棵树中是唯一的
       parentIdField: 'parentId', // 指定项。父节点存放的字段
       topNodeParentId: 0, // 指定项。顶级节点的父id的值
       childrenField: 'children', // 设置项。子节点存放的字段
       handleNode: (node, children)=>{} // 设置项。每个节点的回调处理
    }
   
   
    使用示例：
    
    const handleNode = (node, children) => {
        node['label'] = node.name;
        node['isLeaf'] = children.length === 0;
    }

    const data = jtUtils.json.parse(list, {
        handleNode
    })

    console.log(JSON.stringify(data))
   
   ```

#### 拆解树结构(树形数据转成json数组)
   ```
    
    jtUtils.tree.jsonify(data, options);
    
    data: 树形数据
    options: 可选配置项
    
    默认 options = {        
        idField: 'id', // 设置项。节点唯一标识的字段，整棵树中是唯一的
        parentIdField: 'parentId', // 设置项。父节点存放的字段
        topNodeParentId: 0, // 设置项。顶级节点的父id的值
        childrenField: 'children', // 指定项。子节点存放的字段
        remainChildren: false, // 设置项。是否保留每个节点的子节点
        handleNode: null // 设置项。每个节点的回调处理
    }
    
    
    使用示例：
    
    const handleNode = (node, children) => {
        node['label'] = node.name;
        node['isLeaf'] = children.length === 0;
    }
    
    const data = jtUtils.tree.jsonify(treeData, {
        handleNode
    })
    
    console.log(JSON.stringify(data))
    
   ```

#### 过滤树节点(返回所有目标节点以及该节点的所有父节点)
   ```
    
    jtUtils.json.filter(data, handleFilter，options)
    
    data: json数组
    handleFilter: node的过滤处理，return的节点为目标节点
    options: 可选配置项
    
    默认 options = {        
        idField: 'id', // 指定项。节点唯一标识的字段，整棵树中是唯一的
        parentIdField: 'parentId', // 指定项。父节点存放的字段
    }
    
    
    使用示例：
    
    const handleFilter = (node) => {
        if (node.name.indexOf('2-2') !== -1) {
            node['isTargetNode'] = true;
            return node
        }
    }

    const data = jtUtils.json.filter(list, handleFilter)

    console.log(JSON.stringify(data))
    
   ```

#### 查找目标节点的父节点ID(返回某目标节点的所有父节点id的数组)
   ```
    
    jtUtils.json.findParentIds(id, data, options)
    
    id: 目标节点的id值
    data: json数组
    options: 可选配置项
    
    默认 options = {        
        idField: 'id', // 指定项。节点唯一标识的字段，整棵树中是唯一的
        parentIdField: 'parentId', // 指定项。父节点存放的字段
        remainNode: false, //设置项。是否将目标节点ID一起返回
    }
    
    
    使用示例：
    
    const data = jtUtils.json.findParentIds(13, list, {remainNode: true})
    
    console.log(JSON.stringify(data))
    
   ```

#### 查找目标节点的父节点数据(返回某目标节点的所有父节点数据的数组)
   ```
    
    jtUtils.json.findParents(id, data, options)
    
    id: 目标节点的id值
    data: json数组
    options: 可选配置项
    
    默认 options = {        
        idField: 'id', // 指定项。节点唯一标识的字段，整棵树中是唯一的
        parentIdField: 'parentId', // 指定项。父节点存放的字段
        remainNode: false, //设置项。是否将目标节点ID一起返回
    }
    
    
    使用示例：
    
    const data = jtUtils.json.findParents(13, list, {remainNode: true})
    
    console.log(JSON.stringify(data))
    
   ```

#### 查找目标节点的子节点ID(返回某目标节点的所有子节点id的数组)
   ```
    
    jtUtils.json.findChildrenIds(id, data, options)
    
    id: 目标节点的id值
    data: json数组
    options: 可选配置项
    
    默认 options = {        
        idField: 'id', // 指定项。节点唯一标识的字段，整棵树中是唯一的
        parentIdField: 'parentId', // 指定项。父节点存放的字段
        remainNode: false, //设置项。是否将目标节点ID一起返回
    }
    
    
    使用示例：
    
    const data = jtUtils.json.findChildrenIds(12, list, {remainNode: true})
    
    console.log(JSON.stringify(data))
    
   ```

#### 查找目标节点的子节点数据(返回某目标节点的所有子节点数据的数组)
   ```
    
    jtUtils.json.findChildrens(id, data, options)
    
    id: 目标节点的id值
    data: json数组
    options: 可选配置项
    
    默认 options = {        
        idField: 'id', // 指定项。节点唯一标识的字段，整棵树中是唯一的
        parentIdField: 'parentId', // 指定项。父节点存放的字段
        remainNode: false, //设置项。是否将目标节点ID一起返回
    }
    
    
    使用示例：
    
    const data = jtUtils.json.findChildrens(12, list, {remainNode: true})
    
    console.log(JSON.stringify(data))
    
   ```
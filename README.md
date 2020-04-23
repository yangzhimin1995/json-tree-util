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
            }]
        }]
    }];  

   ```

#### 组装树结构(json数组 转成 树形数据)
   ```
   
    jtUtils.parse(data, options);

    data: json数组
    options: 可选配置项
   
    默认 options = {        
       idField: 'id', // 节点唯一标识的字段，整棵树中是唯一的
       parentIdField: 'parentId', // 父节点存放的字段
       topNodeParentId: 0, // 顶级节点的父id的值
       childrenField: 'children', // 子节点存放的字段
       handleNode: (node, children)=>{} // 每个节点的回调处理
    }
   
   
    使用示例：
    
    const handleNode = (node, children) => {
       node['label'] = node.name;
       node['isLeaf'] = children.length === 0;
    }
    
    const data = jtUtils.parse(list, {
       handleNode,
    })
    
    console.log(JSON.stringify(data))
   
   ```

#### 拆解树结构(树形数据 转成 json数组)
   ```
    
    jtUtils.jsonify(data, options);
    
    data: 树形数据
    options: 可选配置项
    
    默认 options = {        
        idField: 'id', // 节点唯一标识的字段，整棵树中是唯一的
        parentIdField: '', // 父节点存放的字段
        topNodeParentId: undefined, // 顶级节点的父id的值，parentIdField不为空时有效
        childrenField: 'children', // 子节点存放的字段
        remainChildren: false, // 是否保留子节点数据
        handleNode: (node, children)=>{} // 每个节点的回调处理
    }
    
    
    使用示例：
    
    const handleNode = (node, children) => {
        node['label'] = node.name;
        node['isLeaf'] = children.length === 0;
    }
    
    const data = jtUtils.jsonify(treeData, {
        handleNode,
    })
    
    console.log(JSON.stringify(data))
    
   ```
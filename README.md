# json-tree-utils

### json数组与树状结构数据的转换等处理工具


#### 安装
```

npm i json-tree-utils

```

#### 引入
```

import jtUtils from "json-tree-utils"

```

#### 测试数据
   ```
    const list = [
       {nodeId: 1, name: '节点1', pid: null},
       {nodeId: 2, name: '节点1-1', pid: 1},
       {nodeId: 3, name: '节点1-2', pid: 1},
       {nodeId: 4, name: '节点1-1-1', pid: 2},
       {nodeId: 5, name: '节点1-1-2', pid: 2},
    ];

    const testData = [{
        nodeId: 1,
        name: "节点1",
        pid: null,
        childrenList: [{
            nodeId: 2,
            name: "节点1-1",
            pid: 1,
            childrenList: [{
                nodeId: 4,
                name: "节点1-1-1",
                pid: 2,
            }, {
                nodeId: 5,
                name: "节点1-1-2",
                pid: 2,
            }],
        }, {
            nodeId: 3,
            name: "节点1-2",
            pid: 1,
        }],
    }];    

   ```

#### 组装树结构(json数组 转成 树状结构数据)
   ```
   
    jtUtils.parse(data, options);

    data: json数组，数据里面包含上下级父子关系
    options: 可选配置项
   
    默认 options = {        
       idField: 'id', // 节点ID存放的字段
       parentIdField: 'parentId', // 父节点存放的字段
       topNodeParentId: 0, // 顶级节点的父亲id
       childrenField: 'children', // 子节点存放的字段
       handleNode: (node, children)=>{} // 节点处理方法
    }
   
   
    使用示例：
    
    const handleNode = (node, children) => {
       node['label'] = node.name;
       node['isLeaf'] = children.length === 0;
    }
    
    const data = jtUtils.parse(list, {
       idField: 'nodeId',
       parentIdField: 'pid',
       topNodeParentId: null,
       childrenField: 'childrenList',
       handleNode,
    })
    
    console.log(JSON.stringify(data))
   
   ```

#### 拆解树结构(树状结构数据 转成 json数组)
   ```
    
    jtUtils.jsonify(data, options);
    
    data: 树状结构数据
    options: 可选配置项
    
    默认 options = {        
        idField: 'id', // 节点ID存放的字段
        parentIdField: 'parentId', // 父节点存放的字段
        childrenField: 'children', // 子节点存放的字段
        remainChildren: false, // 是否保留子节点数据
        handleNode: (node, children)=>{} // 节点处理方法
    }
    
    
    使用示例：
    
    const handleNode = (node, children) => {
        node['label'] = node.name;
        node['isLeaf'] = children.length === 0;
    }
    
    const data = jtUtils.jsonify(treeData, {
        idField: 'nodeId',
        parentIdField: 'pid',
        childrenField: 'childrenList',
        remainChildren: false,
        handleNode,
    })
    
    console.log(JSON.stringify(data))
    
   ```
    
#### 在json数组中寻找某目标节点的所有父亲节点
   ```
    
    jtUtils.findParentsInJson(id, data, options);
    
    id: 目标节点的唯一值
    data: json数组
    options: 可选配置项
    
    默认 options = {
        idField: 'id', // 节点ID存放的字段
        parentIdField: 'parentId', // 父节点存放的字段
        returnType: 'id', // 返回类型 id:返回id数组  json:返回json数组  tree:返回树状结构数据
        remainNode: true, // 是否将该目标节点一起返回
        topNodeParentId: 0, // 顶级节点的父亲id，returnType = 'tree' 时必须指定
        childrenField: 'children', // 子节点存放的字段，returnType = 'tree' 时有效
        handleNode: (node, children)=>{} // 节点处理方法，returnType = 'tree' 时有效
    }                                    
    
    
    使用示例：
    
    const data = jtUtils.findParentsInJson(5, list, {
        idField: 'nodeId',
        parentIdField: 'pid',
        returnType: 'id'
    })
    
    console.log(JSON.stringify(data))
    
   ```
    
#### 在json数组中寻找某目标节点的所有子节点
   ```
    
    jtUtils.findChildrenInJson(id, data, options);
    
    id: 目标节点的唯一值
    data: json数组
    options: 可选配置项
    
    默认 options = {
        idField: 'id', // 节点ID存放的字段
        parentIdField: 'parentId', // 父节点存放的字段
        returnType: 'id',  // 返回类型 id:返回id数组  json:返回json数组  tree:返回树状结构数据
        remainNode: true, // 是否将该目标节点一起返回
        childrenField: 'children', // 子节点存放的字段，returnType = 'tree' 时有效
        handleNode: (node, children)=>{} // 节点处理方法，returnType = 'tree' 时有效
    }                                    
    
    
    使用示例：
    
    const returnData = findChildrenInJson(1, list, {
        idField: 'nodeId',
        parentIdField: 'pid',
        childrenField: 'childrenList',
        returnType: 'id',
    })
    
    console.log(JSON.stringify(returnData))
    
   ```

#### 在树状结构数据中寻找某目标节点的所有父亲节点
   ```
    
    jtUtils.findParentsInTree(id, data, options);
    
    id: 目标节点的唯一值
    data: 树状结构数据
    options: 可选配置项
    
    默认 options = {
        idField: 'id', // 节点ID存放的字段
        parentIdField: 'parentId', // 父节点存放的字段
        childrenField: 'children', // 子节点存放的字段
        returnType: 'id', // 返回类型 id:返回id数组  json:返回json数组  tree:返回树状结构数据
        remainNode: true, // 是否将该目标节点一起返回
        topNodeParentId: 0, // 顶级节点的父亲id，returnType = 'tree' 时必须指定
        handleNode: (node, children)=>{} // 节点处理方法，returnType = 'tree' 时有效
    }                                    
    
    
    使用示例：

    const data = findParentsInTree(5, treeData, {
        parentIdField: 'pid',
        topNodeParentId: null,
        childrenField: 'childrenList',
        returnType: 'id',
    })
    
    console.log(JSON.stringify(data))
    
   ```
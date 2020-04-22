# json-tree-util
### json数据与树状结构数据的转换等处理工具

#### 安装
`npm install json-tree-util`

#### 引入
`import jtUtil from "json-tree-util"`


#### 组装树结构(json数组 转成 树状结构数据)
   ```
   
   jtUtil.parse(data, config);
   
   默认 config = {        
       idField: 'id', // 节点唯一值的字段
       parentIdField: 'parentId', // 保存父亲节点唯一值的字段
       topNodeParentId: 0, // 顶级节点的父亲id
       childrenField: 'children', // 组装的子节点存放的字段
       handleNode: (node, children)=>{} // 节点处理方法
   }
   
   
   使用示例：
   
   const testData = [
       {nodeId: 1, name: '节点1', pid: null},
       {nodeId: 2, name: '节点1-1', pid: 1},
       {nodeId: 3, name: '节点1-2', pid: 1},
       {nodeId: 4, name: '节点1-1-1', pid: 2},
       {nodeId: 5, name: '节点1-1-2', pid: 2},
   ];
   
   const handleNode = (node, children) => {
       node['label'] = node.name;
       node['isLeaf'] = children.length === 0;
   }
   
   const treeData = parse(testData, {
       idField: 'nodeId',
       parentIdField: 'pid',
       topNodeParentId: null,
       childrenField: 'childrenList',
       handleNode,
   })

   console.log(JSON.stringify(treeData))
   
   输出： 

   [{
       "nodeId": 1,
       "name": "节点1",
       "pid": null,
       "label": "节点1",
       "isLeaf": false,
       "childrenList": [{
           "nodeId": 2,
           "name": "节点1-1",
           "pid": 1,
           "label": "节点1-1",
           "isLeaf": false,
           "childrenList": [{
               "nodeId": 4,
               "name": "节点1-1-1",
               "pid": 2,
               "label": "节点1-1-1",
               "isLeaf": true,
               "childrenList": []
           }, {
               "nodeId": 5,
               "name": "节点1-1-2",
               "pid": 2,
               "label": "节点1-1-2",
               "isLeaf": true,
               "childrenList": []
           }]
       }, {
           "nodeId": 3,
           "name": "节点1-2",
           "pid": 1,
           "label": "节点1-2",
           "isLeaf": true,
           "childrenList": []
       }]
   }]
   
   ```

#### 拆解树结构(树状结构数据 转成 json数组)
    ```
    
    jtUtil.jsonify(data, config);
    
    默认 config = {        
        parentIdField: 'parentId', // 保存父亲节点唯一值的字段
        topNodeParentId: 0, // 顶级节点的父亲id
        childrenField: 'children', // 组装的子节点存放的字段
        retainChildren: false //是否保留子节点数据
        handleNode: (node, children)=>{} // 节点处理方法
    }
    
    
    使用示例：
    
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
    
    输出：
    
    [
        {"id": 4, "name": "节点1-1-1", "pid": 2},
        {"id": 5, "name": "节点1-1-2", "pid": 2},
        {"id": 2, "name": "节点1-1", "pid": 1},
        {"id": 3, "name": "节点1-2", "pid": 1},
        {"id": 1, "name": "节点1", "pid": null}
    ]
    
    ```
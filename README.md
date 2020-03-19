# json-tree
### json数组与树结构数组的互相转换

#### 安装
`npm install json-tree-util`

#### 引入
`import jtUtil from "json-tree-util";`


#### json数组转树状数据的使用
   ```
   
   jtUtil.json2Tree(jsonArray, config);
   
   默认 config = {        
       nodeIdField: 'id', //节点唯一值的字段
       nodeParentIdField: 'parentId', //保存父亲节点唯一值的字段
       topNodeValue: 0, //顶级节点的值
       childrenField: 'children', //组装的子节点存放的字段
       fieldMaps: {} //字段映射
   }
   
   其中fieldMaps用来生成额外的字段，例如fieldMaps:{name:'label'},
   如果数据中有'name'字段，那么返回的数据将会新增一个'label'字段，两者的值相同。
   
   
   使用示例：
   
   const jsonArray = [
                   {id: 1, name: '节点1', pid: 0},
                   {id: 2, name: '节点1-1', pid: 1},
                   {id: 3, name: '节点1-2', pid: 1},
                   {id: 4, name: '节点1-1-1', pid: 2},
                   {id: 5, name: '节点1-1-2', pid: 2},
                  ];

   const treeData = jtUtil.json2Tree(jsonArray, {nodeParentIdField: 'pid', fieldMaps: {name: 'label'}});
   console.log(treeData);
   
   结果输出： 
   treeData = [{
       id: 1,
       name: "节点1",
       pid: 0,
       label: "节点1",
       children: [{
           id: 2,
           name: "节点1-1",
           pid: 1,
           label: "节点1-1",
           children: [{
               id: 4,
               name: "节点1-1-1",
               pid: 2,
               label: "节点1-1-1",
               children: [],
           }, {
               id: 5,
               name: "节点1-1-2",
               pid: 2,
               label: "节点1-1-2",
               children: [],
           }],
       }, {
           id: 3,
           name: "节点1-2",
           pid: 1,
           label: "节点1-2",
           children: [],
       }],
   }]
   
   ```

#### 树状数据转json数组的使用
    ```
    
    jtUtil.tree2Json(treeData, config);
    
    默认 config = {        
        nodeParentIdField: 'parentId', //保存父亲节点唯一值的字段
        topNodeValue: 0, //顶级节点的值
        childrenField: 'children', //组装的子节点存放的字段
        fieldMaps: {}, //字段映射
        retainChildren: false //是否保留子节点数据
    }
    
    fieldMaps参数用法同上
    
    
    使用示例：
    
    const treeData = [{
        id: 1,
        name: "节点1",
        pid: 0,
        children: [{
            id: 2,
            name: "节点1-1",
            pid: 1,
            children: [{
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
    
    let jsonArray = jtUtil.tree2Json(treeData, {topNodeValue: null, nodeParentIdField: 'pid'});
    console.log(jsonArray);
    
    结果输出：
    jsonArray = [
        {"id": 4, "name": "节点1-1-1", "pid": 2},
        {"id": 5, "name": "节点1-1-2", "pid": 2},
        {"id": 2, "name": "节点1-1", "pid": 1},
        {"id": 3, "name": "节点1-2", "pid": 1},
        {"id": 1, "name": "节点1", "pid": null}
    ]
    
    ```
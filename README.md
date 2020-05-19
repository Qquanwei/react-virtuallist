## 使用

![framework](https://p1.music.126.net/KBgcVD7mTldxw130unnDDw==/109951165000832035.png)

React 长列表性能优化，虚拟滚动。只初始化可视窗口的元素, 减少js执行时间。


安装

```bash
nenpm install react-virtuallist --save
```

使用

```js
import React from 'react';
import SmartList from 'react-virtuallist';

function List({ list }) {
  return <SmartList items={list} render={renderItem} getKey={getKey} height={50} />
}
```


参数

| 名称      | 是否必传 | 解释                                                             |        |
|-----------|----------|------------------------------------------------------------------|--------|
| className | false    | className                                                        |        |
| items     | true     | 列表数据                                                         |        |
| render    | true     | 每个元素的渲染函数, 指纹 render: ({item, index}) => ReactElement |        |
| getKey    | true     | 获取元素的唯一key, 指纹 getKey: ({ item, index}) => string       | number |
| height    | true     | 375尺寸下元素高度，目前只支持等高渲染                            |        |
| children  | false    | 当items为空时渲染children                                        |        |

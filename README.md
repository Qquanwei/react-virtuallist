# @music/ct-smartlist

> window上的列表组件

## 使用

![framework](https://p1.music.126.net/KBgcVD7mTldxw130unnDDw==/109951165000832035.png)

React 长列表性能优化，虚拟滚动。只初始化可视窗口的元素, 减少js执行时间。

内部使用IntersectionObserver实现，Android5, iOS10 已验证.


安装

```bash
nenpm install @music/ct-smartlist --save
```

使用

```js
import React from 'react';
import WindowVirtualScroll from '@music/ct-smartlist';

function List({ list }) {
  return <WindowVirtualScroll items={list} render={renderItem} getKey={getKey} height={50} />
}
```


参数


| 名称      | 是否必传 | 解释                                                                          |   |
|-----------|----------|-------------------------------------------------------------------------------|---|
| className | false    | className                                                                     |   |
| items     | true     | 列表数据                                                                      |   |
| render    | true     | 每个元素的渲染函数, 指纹 render: ({item, index}) => ReactElement              |   |
| getKey    | true     | 获取元素的唯一key, 指纹 getKey: ({ item, index}) => string丨number            |   |
| height    | true     | 375尺寸下元素高度，目前只支持等高渲染, 这里会自动换算不同设备宽高。           |   |
| height    | true     | 函数， ({ item, index}) => number                                             |   |
| children  | false    | 当items为空时渲染children                                                     |   |
| maxWidth  | false    | 计算height的最大宽度, 如果使用屏幕宽度则为0, 如果最大宽度为600, 则手动设置600 |   |


## FoldableWindowVirtualScroll

可折叠的VirtualScroll

```
import { FoldableWindowVirtualScroll } from '@music/smartlist';

  return <FoldableWindowVirtualScroll
       enableFold={true}
       foldChildren=(({ toggleFold }) => <div onClick={toggleFold}>fold placeholder</div>)
       foldStart={1}
       foldEnd={10}
       foldHeight={200}
       items={list}
       render={renderItem}
       getKey={getKey}
       height={50} />

```

FoldableWindowVirtualScroll 为 WindowVirtualScroll 的一个装饰器，其支持所有 WindowVirtualScroll 的参数，下面只列取特有的一些参数


| 名称         | 是否必传 | 解释                     |
|--------------|----------|--------------------------|
| enableFold   | true     | 是否开启折叠             |
| foldChildren | true     | 折叠区域的渲染方法       |
| foldStart    | true     | 从0开始，折叠起始位置，包含该位置 |
| foldEnd      | true     | 从0开始，折叠结束位置，包含该位置 |
| foldHeight   | true     | 折叠区域高度             |

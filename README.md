# @music/ct-smartlist

> window上的列表组件

[![pipeline status](https://g.hz.netease.com/NeteaseMusicUI/live-activity/ct-smartlist/badges/master/pipeline.svg)](https://g.hz.netease.com/NeteaseMusicUI/live-activity/ct-smartlist/commits/master)
[![coverage report](https://g.hz.netease.com/NeteaseMusicUI/live-activity/ct-smartlist/badges/master/coverage.svg)](https://g.hz.netease.com/NeteaseMusicUI/live-activity/ct-smartlist/commits/master)
[![nenpm](http://npm.hz.netease.com/badge/v/@music/ct-smartlist.svg)](http://npm.hz.netease.com/package/@music/ct-smartlist)
[![nenpm](http://npm.hz.netease.com/badge/d/@music/ct-smartlist.svg)](http://npm.hz.netease.com/package/@music/ct-smartlist)

## 使用

![framework](https://p1.music.126.net/KBgcVD7mTldxw130unnDDw==/109951165000832035.png)

React 长列表性能优化，虚拟滚动。只初始化可视窗口的元素, 减少js执行时间。


安装

```bash
nenpm install @music/ct-smartlist --save
```

使用

```js
import React from 'react';
import SmartList from '@music/ct-smartlist';

function List({ list }) {
  return <SmartList items={list} render={renderItem} getKey={getKey} height={50} />
}
```


参数

| 名称      | 是否必传 | 解释                                                                |        |
|-----------|----------|---------------------------------------------------------------------|--------|
| className | false    | className                                                           |        |
| items     | true     | 列表数据                                                            |        |
| render    | true     | 每个元素的渲染函数, 指纹 render: ({item, index}) => ReactElement    |        |
| getKey    | true     | 获取元素的唯一key, 指纹 getKey: ({ item, index}) => string丨number          |  |
| height    | true     | 375尺寸下元素高度，目前只支持等高渲染, 这里会自动换算不同设备宽高。 |        |
| children  | false    | 当items为空时渲染children                                           |        |

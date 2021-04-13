const menuData = [
  {
    id: 1,
    path: 'hotelmall',
    title: '旅店首页',
    child: [
      {title: '旅店详情', path: 'hotelmall', id: 0},
      {title: '我的房间', path: 'myroom', id: 1}
    ]
  },
  {
    id: 2,
    path: 'shop',
    title: '旅店商城',
    child: [
      {title: '商品详情', path: 'shop', id: 2},
      {title: '我的购物车', path: 'cart', id: 3}
    ]
  },
  {
    id: 3,
    path: 'profile',
    title: '用户信息',
    child: [
      {title: '我的基本信息', path: 'profile', id: 4},
      {title: '消费记录', path: 'history', id: 5}
    ]
  },
  {
    id: 4,
    path: 'commentarea',
    title: '评论区',
    child: [
      {title: '本店评论', path: 'commentarea', id: 6}
    ]
  },
  {
    id: 5,
    path: 'happytime',
    title: '轻松一刻',
    child: [
      {title: '有趣图片', path: 'happytime', id: 7}
    ]
  },
  {
    id: 6,
    path: 'demand',
    title: '需求建议',
    child: [
      {title: '需求详情', path: 'demand', id: 8}
    ]
  }
]

export default menuData

const menuData = [
    {
        name: 'dashboard',
        icon: 'dashboard',
        path: 'dashboard',
        children: [
            {
                name: 'dashboard',
                path: 'dashboard',
            },
           
        ],
    },
    {
        name: '店铺管理',
        icon: 'form',
        path: 'form',
        children: [
            {
                name: '店铺列表',
                path: 'shop',
            },
        ],
    },
    {
        name: '商品管理',
        icon: 'bulb',
        path: 'goods',
        children: [
            {
                name: '商品管理',
                path: 'goods',
            },
            {
                name: '商品分类',
                path: 'goods_category',
            },
        ],
    },
    {
        name: '用户管理',
        icon: 'user',
        path: 'user',
        children: [
            {
                name: '用户列表',
                path: 'user',
            },
        ],
    },
    {
        name: '内容管理',
        icon: 'paper-clip',
        path: 'article',
        children: [
            {
                name: '文章管理',
                path: 'article',
            },
            
        ],
    },
    {
        name: '订单管理',
        icon: 'wallet',
        path: 'order',
        children: [
            {
                name: '订单管理',
                path: 'order',
            },
            
        ],
    },
    {
        name: '网站',
        icon: 'bulb',
        path: 'web',
        children: [
            {
                name: '广告管理',
                path: 'ad',
            },
            
        ],
    }
    
    
    
    
    
  ];

  export default menuData;
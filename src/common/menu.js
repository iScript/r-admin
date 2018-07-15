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
    }
    
    
    
    
  ];

  export default menuData;
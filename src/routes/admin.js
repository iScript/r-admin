import Test from "../views/Test";
import Dashboard from "../views/Dashboard";
import Shop from "../views/Shop";

import GoodsCategory from "../views/GoodsCategory";
import Goods from "../views/Goods";
import Ad from "../views/Ad";
import User from "../views/User";
import Order from "../views/Order";
import Article from "../views/Article";


const indexRoutes = [
   
    { path: "/test", component: Test },
    { path: "/dashboard", component: Dashboard },
    { path: "/shop", component: Shop },
    { path: "/goods_category", component: GoodsCategory },
    { path: "/goods", component: Goods},
    { path: "/ad", component: Ad},
    { path: "/user", component: User},
    { path: "/order", component: Order },
    { path: "/article", component: Article },
    { redirect: true, path: "/", to: "/dashboard" }


    // 注意顺序，redirect放最后
];

export default indexRoutes;
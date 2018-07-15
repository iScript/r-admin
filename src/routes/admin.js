import Test from "../views/Test";
import Dashboard from "../views/Dashboard";
import Shop from "../views/Shop";

import GoodsCategory from "../views/GoodsCategory";


const indexRoutes = [
   
    { path: "/test", component: Test },
    { path: "/dashboard", component: Dashboard },
    { path: "/shop", component: Shop },
    { path: "/goods_category", component: GoodsCategory },
    { redirect: true, path: "/", to: "/dashboard" }


    // 注意顺序，redirect放最后
];

export default indexRoutes;
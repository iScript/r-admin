import Admin from "../layouts/Admin.js";
import Login from "../views/Login"

const indexRoutes = [
   
    { path: "/login", component: Login },
    { path: "/", component: Admin }


];

export default indexRoutes;
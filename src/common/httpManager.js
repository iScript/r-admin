import axios from "axios";

var token = localStorage.user ? JSON.parse(localStorage.user).token : "";
const http = axios.create({
    baseURL: 'http://localhost:8000',
    timeout: 3000,
    headers: {'X-Custom-Header': 'y',"x-token":token}
});

var host = "http://localhost:8000";

const  httpManager = {

    getShopList : (page=1) => http.get(host+"/admin/shop?page="+page),
    createShop: (data) => http.post(host+"/admin/shop",data),
    deleteShop: (id) => http.delete(host+"/admin/shop/"+id),
    updateShop: (id,data) => http.put(host+"/admin/shop/"+id,data),

    getGoodsCategoryList : (page=1) => http.get(host+"/admin/goods_category?page="+page),
    createGoodsCategory: (data) => http.post(host+"/admin/goods_category",data),
    deleteGoodsCategory: (id) => http.delete(host+"/admin/goods_category/"+id),
    updateGoodsCategory: (id,data) => http.put(host+"/admin/goods_category/"+id,data),

} 


export default httpManager;
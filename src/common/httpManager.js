import axios from "axios";
import config from "./config.js"

var host = config.base_host;

var getToken = function(){
    console.log(typeof localStorage.user,localStorage.user)
    return (typeof localStorage.user != "undefined" ) ? JSON.parse(localStorage.user).token : "";
}

const http = axios.create({
    baseURL: host,
    timeout: 3000
});

const  httpManager = {

    //
    

    getShopList : (page=1) => http.get(host+"/admin/shop?page="+page,{headers: {'X-Custom-Header': 'y',"x-token": getToken() }}),
    createShop: (data) => http.post(host+"/admin/shop",data,{headers: {'X-Custom-Header': 'y',"x-token": getToken() }}),
    deleteShop: (id) => http.delete(host+"/admin/shop/"+id,{headers: {'X-Custom-Header': 'y',"x-token": getToken() }}),
    updateShop: (id,data) => http.put(host+"/admin/shop/"+id,data,{headers: {'X-Custom-Header': 'y',"x-token": getToken() }}),

    getGoodsCategoryList : (page=1,count=10) => http.get(host+"/admin/goods_category?page="+page+"&count="+count,{headers: {'X-Custom-Header': 'y',"x-token": getToken() }}),
    createGoodsCategory: (data) => http.post(host+"/admin/goods_category",data,{headers: {'X-Custom-Header': 'y',"x-token": getToken() }}),
    deleteGoodsCategory: (id) => http.delete(host+"/admin/goods_category/"+id,{headers: {'X-Custom-Header': 'y',"x-token": getToken() }}),
    updateGoodsCategory: (id,data) => http.put(host+"/admin/goods_category/"+id,data,{headers: {'X-Custom-Header': 'y',"x-token": getToken() }}),

    getGoodsList : (page=1) => http.get(host+"/admin/goods?page="+page,{headers: {'X-Custom-Header': 'y',"x-token": getToken() }}),
    createGoods: (data) => http.post(host+"/admin/goods",data,{headers: {'X-Custom-Header': 'y',"x-token": getToken() }}),
    deleteGoods: (id) => http.delete(host+"/admin/goods/"+id,{headers: {'X-Custom-Header': 'y',"x-token": getToken() }}),
    updateGoods: (id,data) => http.put(host+"/admin/goods/"+id,data,{headers: {'X-Custom-Header': 'y',"x-token": getToken() }}),

    completeOrder:(order_id) => http.post(`${host}/admin/order/complete`,{order_id:order_id},{headers: {'X-Custom-Header': 'y',"x-token": getToken() }}),

    // common
    getList : (model,page=1) => http.get(`${host}/admin/${model}?page=${page}`,{headers: {'X-Custom-Header': 'y',"x-token": getToken() }}),
    get : (model,id) => http.get(`${host}/admin/${model}/${id}`,{headers: {'X-Custom-Header': 'y',"x-token": getToken() }}),
    create: (model,data) => http.post(`${host}/admin/${model}`,data,{headers: {'X-Custom-Header': 'y',"x-token": getToken() }}),
    delete: (model,id) => http.delete(`${host}/admin/${model}/${id}`,{headers: {'X-Custom-Header': 'y',"x-token": getToken() }}),
    update: (model,id,data) => http.put(`${host}/admin/${model}/${id}`,data,{headers: {'X-Custom-Header': 'y',"x-token": getToken() }})

    
} 


export default httpManager;
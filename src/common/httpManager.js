import axios from "axios";

var token = localStorage.user ? JSON.parse(localStorage.user).token : "";
const http = axios.create({
    baseURL: 'http://localhost:8000',
    timeout: 3000,
    headers: {'X-Custom-Header': 'y',"x-token":token}
});

const  httpManager = {

    getShopList : (page=1) => http.get("http://localhost:8000/admin/shop?page="+page),
    createShop: (data) => http.post("http://localhost:8000/admin/shop",data),
    deleteShop: (id) => http.delete("http://localhost:8000/admin/shop/"+id),
    updateShop: (id,data) => http.put("http://localhost:8000/admin/shop/"+id,data)

} 


export default httpManager;
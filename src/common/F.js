const F = {
    checkResponse : function(response){
        if(response.data.code == 0){
            return true;
        }

        if(response.data.code == 4003){
            alert(response.data.message);
            localStorage.removeItem("user");
            //alert(222,localStorage.getItem("user"))
            //return;
            window.location.reload();
            return false;
        }else{
            alert(response.data.message);
            return false;
        }
    }
}

export default F;
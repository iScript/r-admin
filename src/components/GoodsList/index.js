import React from "react";
import httpManager from "../../common/httpManager.js"


import  "./index.css";



class GoodsList extends React.Component {

    state = {
        test:[11,22,33],
        data:[]
    };



     componentDidMount() {
        
        var a = [];
        var fori = this.props.list.length;
        var that = this;
        for(var i=0;i<this.props.list.length;i++){
            ( async function(i){
                var goods = await httpManager.get("goods",that.props.list[i].id);

                a.push(goods.data.data)
                fori--;

                if(fori == 0){
                    console.log(111111111,a)
                    that.setState({"data":a})
                }
            })(i)
            
           
        }
        
        
    }
  
    //
    render() {
       
        return (
            <ul className="goods_list_box" >
                
               

                {this.state.data.map(item => (
                    <li key={item.id}  >
                        <img src={item.picture} className="goods_img" />
                        <div className="goods_r" >
                            <h5 className="goods_title">{item.name}</h5>
                            <p className="goods_price">价格：{item.price} 促销价：{item.promotion_price}</p>
                        </div>
                    </li>
                ))}
            </ul>

        );
    }
}

export default GoodsList;
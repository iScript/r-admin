import React from "react";
import httpManager from "../../common/httpManager.js"


import  "./index.css";



class GoodsList extends React.Component {

    state = {
        test:[11,22,33],
        data:[]
    };



    async componentDidMount() {
        
        var a = [];
        
        for(var i=0;i<this.props.list.length;i++){
            var goods = await httpManager.get("goods",this.props.list[i].goods_id);
            //console.log(goods.data.data)
            a.push(goods.data.data)
        }
        this.setState({"data":a})
        console.log(111111111,a)
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
                            <p className="goods_price">{item.price}</p>
                        </div>
                        
                    
                    </li>
                ))}
            </ul>

        );
    }
}

export default GoodsList;
import React from "react";
import {Row,Col,Card} from 'antd';
import httpManager from "../../common/httpManager.js"

class Test extends React.Component {

    state = {
        d:null
    };



    componentDidMount() {
        
        
        httpManager.dashboard().then(response=> {
            console.log(response)
            var d = response.data.data;
            this.setState({d,d})
        })
    }



    render() {
        


        return (
            
            <div>
                 <div style={{ background: '#ECECEC', padding: '30px' }}>
                    <Row >
                    <Col span={8}>
                        <Card title="今日订单数" bordered={false}>{this.state.d ? this.state.d.order_today_count: 0}</Card>
                    </Col>
                    <Col span={8}>
                        <Card title="今天成交金额" bordered={false}>{this.state.d ? this.state.d.order_today_sum: 0}</Card>
                    </Col>
                    <Col span={8}>
                        <Card title="今日注册用户" bordered={false}>{this.state.d ? this.state.d.user_today_count: 0}</Card>
                    </Col>
                    </Row>
                </div>

                <div style={{ background: '#ECECEC', padding: '30px' }}>
                    <Row >
                    <Col span={8}>
                        <Card title="总商品数" bordered={false}>{this.state.d ? this.state.d.goods_count: 0}</Card>
                    </Col>
                    <Col span={8}>
                        <Card title="总订单数" bordered={false}>{this.state.d ? this.state.d.order_count: 0}</Card>
                    </Col>
                    <Col span={8}>
                        <Card title="总用户数" bordered={false}>{this.state.d ? this.state.d.user_count: 0}</Card>
                    </Col>
                    </Row>
                </div>
            </div>

        );
    }
}

export default Test;
import React , {Fragment} from "react";
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import {Row,Col,Card,Form,Input,Switch,Icon,Button,Upload,Menu,InputNumber,DatePicker,Modal,message,
    Badge,Divider,Table
} from 'antd';
import GoodsList from '../../components/GoodsList'

import httpManager from "../../common/httpManager.js"
const FormItem = Form.Item;
const xmodel = "order";





class Order extends React.Component {

    state = {
        listData:[],
        page:1,
        pageTotal : 10,

        modalVisible : false,
        orderDetail : {}
    };



    componentDidMount() {
        this.loadData()
    }



    //分页变化
    onPageChange = (page,pagesize) => {
        console.log("分页",page)
        this.setState({page:page},function(){
            this.loadData()
        });
    }

    //获取数据
    loadData = () => {
        httpManager.getList(xmodel,this.state.page).then((response) => {
            this.setState({"listData":response.data.data.data,pageTotal:response.data.data.total});
        })
    }

    //表单显示或隐藏
    handleModalVisible = flag => {
        this.setState({modalVisible: !!flag,});
    };

    handleShowOrderDetail = (record) =>{
        console.log(record)
        var orderDetail = record.address;
        orderDetail.goodsList = JSON.parse(record.detail).data;
        console.log(orderDetail)
        this.setState({modalVisible: true,orderDetail:orderDetail});
    }

    handleCompleteOrder = (record) =>{
        var id = record.id;
        httpManager.completeOrder(id).then((response) =>{
            if(response.data.code != 0){
                alert(response.data.message);return;
            }
            this.loadData();
        })
    }

  
    //
    render() {
        const columns = [
            {
                title: 'id',
                dataIndex: 'id',
            },
            {
                title: '订单id',
                dataIndex: 'order_id',
            },
            {
                title: '价格',
                dataIndex: 'price',
                
            },
            {
                title: '支付方式',
                render: (text, record, index) => (
                    <span>小程序支付</span>
                ),
                
            },
            {
                title: '状态',
                render: (text, record, index) => {
                    if(text.status == -1) return <span>失效</span>
                    if(text.status == 0) return <span>待支付</span>
                    if(text.status == 1) return (<Fragment><span>已支付</span> <a href="javascript:;" onClick={this.handleCompleteOrder.bind(this,record)} >完成发货</a></Fragment>)
                    if(text.status == 2) return <span>已完成</span>
                    return <span>未知</span>
                }
                
            },
            {
                title: '时间',
                dataIndex: 'created_at',
            },
            {
                title: '操作',
                render: (text, record, index) => (
                    
                  <Fragment>
                    <a href="javascript:;" onClick={this.handleShowOrderDetail.bind(this,record)} >查看</a>
                    
                  </Fragment>
                ),
            },
        ]



        return (
            <div>
                <Modal title="表单"  visible={this.state.modalVisible}  onCancel={() => this.handleModalVisible()}>
                    <p>联系人: {this.state.orderDetail.contact_name }</p>
                    <p>联系电话: {this.state.orderDetail.contact_number }</p>
                    <p>城市: {this.state.orderDetail.city}</p>
                    <p>详细地址: {this.state.orderDetail.address_1} {this.state.orderDetail.address_2} {this.state.orderDetail.house_number}</p>
                    <GoodsList list={this.state.orderDetail.goodsList } />
                </Modal>


                <PageHeaderLayout title="订单管理">
                    <Card bordered={false}>
                        
                        <Table
                            dataSource={this.state.listData}
                            columns={columns}
                            rowKey="id"
                            pagination={{total:this.state.pageTotal,onChange:this.onPageChange}}
                        />
                    </Card>
                </PageHeaderLayout>
            </div>

        );
    }
}

export default Order;
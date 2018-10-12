import React , {Fragment} from "react";
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import {Row,Col,Card,Form,Input,Switch,Icon,Button,Upload,Menu,InputNumber,DatePicker,Modal,message,
    Badge,Divider,Table
} from 'antd';

import httpManager from "../../common/httpManager.js"
const FormItem = Form.Item;
const xmodel = "user";



class User extends React.Component {

    state = {
        listData:[],
        page:1,
        pageTotal : 10,
        test:9,
        modalVisible: false,

    };



    componentDidMount() {
        this.loadData()
    }

    //表单显示或隐藏
    handleModalVisible = flag => {
        this.setState({modalVisible: !!flag,});
    };

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


  
    //
    render() {
        const columns = [
            {
                title: 'id',
                dataIndex: 'id',
            },
            {
                title: '昵称',
                dataIndex: 'nickname',
                
            },
            {
                title: '手机',
                dataIndex: 'mobile',
                
            },
            {
                title: '注册时间',
                dataIndex: 'register_time',
                
                
            },
            {
                title: '登录ip',
                dataIndex: 'last_login_ip',
            },
        ]

        const parentMethods = {
            handleModalVisible: this.handleModalVisible,
            //handleFormCreateOrUpdate:this.handleFormCreateOrUpdate
        };

        return (
            
            <PageHeaderLayout title="用户管理">
                <Card bordered={false}>
                    
                    <Table
                        dataSource={this.state.listData}
                        columns={columns}
                        rowKey="id"
                        pagination={{total:this.state.pageTotal,onChange:this.onPageChange}}
                    />
                </Card>
                
            </PageHeaderLayout>

        );
    }
}

export default User;
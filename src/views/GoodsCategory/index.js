import React , {Fragment} from "react";
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import {Row,Col,Card,Form,Input,Switch,Icon,Button,Upload,Menu,InputNumber,DatePicker,Modal,message,
    Badge,Divider,Table
} from 'antd';

import httpManager from "../../common/httpManager.js"
const FormItem = Form.Item;


class MyForm extends React.Component {

    // 表单点击ok
    okHandle = () => {
        this.props.form.validateFields((err, values) => {
            if (err) return;
            
            this.props.handleFormCreateOrUpdate(values)
            
            this.props.form.resetFields();

            
        });
    };
    
    render() {
        const { modalVisible, form, formType, handleModalVisible } = this.props;
        return (
            <Modal title="表单"  visible={modalVisible} onOk={this.okHandle} onCancel={() => handleModalVisible()}>
                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="店铺名称">
                    {form.getFieldDecorator('name', {
                        rules: [{ required: true, message: '请输入店铺名称' }],
                        //initialValue:props.formData.name
                    })(<Input placeholder="请输入" />)}
                </FormItem>
                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="店铺logo">
                    {form.getFieldDecorator('image', {
                        rules: [{ required: true, message: '请上传图片' }],
                        getValueFromEvent: (e) => {
                            console.log(e)
                            if(e.file.response && e.file.response.code ==200 ){
                                console.log('这里获得image的值')
                                return e.file.response.data;
                            }
                        },
                    })( 
                        //
                        <Upload name="upload_file" action="http://localhost:8000/v1/qiniu/upload" showUploadList={false}>
                           
                            {this.props.form.getFieldValue("image") ? <img src={this.props.form.getFieldValue("image")} width="50px" height="50px" /> : <Button><Icon type="upload" /> 上传</Button>}

                        </Upload>
                    )}
                </FormItem>
                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="精度">
                    {form.getFieldDecorator('longitude', {
                    rules: [{ required: true, message: '' }],
                    })(<Input placeholder="" />)}
                </FormItem>
                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="纬度">
                    {form.getFieldDecorator('latitude', {
                    rules: [{ required: true, message: '' }],
                    })(<Input placeholder="" />)}
                </FormItem>
                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="起送费">
                    {form.getFieldDecorator('start_delivery_price', {
                    rules: [{ required: true, message: '' }],
                    })(<Input placeholder="" />)}
                </FormItem>
                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="状态">
                    {form.getFieldDecorator('status', {
                        valuePropName: 'checked',
                    })(<Switch />)}
                </FormItem>
                

            </Modal>
        )
    }
}

const CreateForm = Form.create()(MyForm);

class GoodsCategory extends React.Component {

    state = {
        listData:[],
        page:1,
        pageTotal : 10,
        test:9,
        modalVisible: false,

        formType:1 , //1新增 2修改
        updateId:0  //修改id
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
        httpManager.getShopList(this.state.page).then((response) => {
            this.setState({"listData":response.data.data.data,pageTotal:response.data.data.total});
        })
    }

    //点击删除
    handleDelete = (record) =>{
        if(window.confirm("确认删除？")){
            httpManager.deleteShop(record.id).then( (response)=>{
                if(response.data.code == 0){
                    this.loadData()
                }
            } )
        }
    }

    //点击修改
    handleUpdate = (record) =>{
        this.setState({modalVisible:true,formType:2,updateId:record.id})
        record.status = record.status == 1 ? true : false;
        this.form.props.form.setFieldsValue(record);
    }

    //处理修改或新增
    handleFormCreateOrUpdate = (data) => {
        data.status = (data.status == true)?1:0;
        console.log(data);
        if(this.state.formType == 2 ){
            httpManager.updateShop(this.state.updateId,data).then((response)=>{
                this.handleModalVisible(false);this.loadData();
            });
        }else{
            httpManager.createShop(data).then((response)=>{
                this.handleModalVisible(false);this.loadData();
            });
        }  
    }

    //
    render() {
        const columns = [
            {
                title: 'id',
                dataIndex: 'id',
            },
            {
                title: '店铺名称',
                dataIndex: 'name',
                
            },
            {
                title: '图片',
                dataIndex: 'image',
                render(val){
                    return <img src={val} width="50px" height="50px" />
                }
            },
            {
                title: '状态',
                dataIndex: 'status',
                render(val) {
                    return <Badge status={val==1 ? 'success' : 'error'} text={val==1 ? '开启中' : '关闭'} />;
                }
                
            },
            {
                title: '操作',
                render: (text, record, index) => (
                    
                  <Fragment>
                    <a href="javascript:;" onClick={this.handleUpdate.bind(this,record)} >修改</a>
                    <Divider type="vertical" />
                    <a href="javascript:;" onClick={this.handleDelete.bind(this,record)} >删除</a>
                  </Fragment>
                ),
            },
        ]

        const parentMethods = {
            handleModalVisible: this.handleModalVisible,
            handleFormCreateOrUpdate:this.handleFormCreateOrUpdate
        };

        return (
            
            <PageHeaderLayout title="商品分类">
               
            </PageHeaderLayout>

        );
    }
}

export default GoodsCategory;
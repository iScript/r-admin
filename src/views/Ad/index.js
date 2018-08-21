import React , {Fragment} from "react";
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import {Row,Col,Card,Form,Input,Switch,Icon,Button,Upload,Menu,InputNumber,DatePicker,Modal,message,
    Badge,Divider,Table
} from 'antd';

import httpManager from "../../common/httpManager.js"
const FormItem = Form.Item;
const xmodel = "ad";

class MyForm extends React.Component {

    state = {
        fileList : []
    }

    componentDidMount(){
        //console.log("form mount")
    }

    // 表单点击ok
    okHandle = () => {
        this.props.form.validateFields((err, values) => {
            if (err) return;
            //console.log(values);return;
            this.props.handleFormCreateOrUpdate(values)
            this.props.form.resetFields();
        });
    };
    
    render() {
        const { modalVisible, form, formType, handleModalVisible } = this.props;
        //var fileList = [];
        return (
            <Modal title="表单"  visible={modalVisible} onOk={this.okHandle} onCancel={() => handleModalVisible()}>
                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="广告标示">
                    {form.getFieldDecorator('unique_name', {
                        rules: [{ required: true, message: '请输入名称' }],
                        //initialValue:props.formData.name
                    })(<Input placeholder="请输入" />)}
                </FormItem>
                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="广告简介">
                    {form.getFieldDecorator('description', {
                        rules: [{ required: true, message: '请输入' }],
                        //initialValue:props.formData.name
                    })(<Input placeholder="请输入" />)}
                </FormItem>
                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="图片">
                    {form.getFieldDecorator('image', {
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
                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="链接">
                    {form.getFieldDecorator('linkto', {
                        rules: [{ required: true, message: '请输入' }],
                        //initialValue:props.formData.name
                    })(<Input placeholder="请输入" />)}
                </FormItem>
                

                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="排序">
                    {form.getFieldDecorator('sort', {
                        rules: [{ required: true, message: '请输入' }],
                        //initialValue:props.formData.name
                    })(<InputNumber min={0} placeholder="请输入" />)}
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

class Ad extends React.Component {

    state = {
        listData:[],
        page:1,
        pageTotal : 10,
        modalVisible: false,
        category:[],

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
        httpManager.getList(xmodel,this.state.page).then((response) => {
            this.setState({"listData":response.data.data.data,pageTotal:response.data.data.total});
        })
    }

    //点击删除
    handleDelete = (record) =>{
        if(window.confirm("确认删除？")){
            httpManager.delete(xmodel,record.id).then( (response)=>{
                if(response.data.code != 0){alert(response.data.message);return;}
                this.loadData()
            } )
        }
    }

    //点击修改
    handleUpdate = (record) =>{
        
        this.setState({modalVisible:true,formType:2,updateId:record.id})
       
        this.form.props.form.setFieldsValue(record);

    }

    //处理修改或新增
    handleFormCreateOrUpdate = (data) => {
        
        console.log(data);
        if(this.state.formType == 2 ){
            httpManager.update(xmodel,this.state.updateId,data).then((response)=>{
                this.handleModalVisible(false);this.loadData();
            });
        }else{
            httpManager.create(xmodel,data).then((response)=>{
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
                title: '广告标示',
                dataIndex: 'unique_name',
                
            },
            {
                title: '图片',
                dataIndex: 'image',
                render(val){
                    return <img src={val} width="50px" height="50px" />
                }
            },
            {
                title: '描述',
                dataIndex: 'description'
            },
            {
                title: '链接',
                dataIndex: 'linkto',
                
            },
            {
                title: '排序',
                dataIndex: 'sort',
                
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
            
            <PageHeaderLayout title="商品管理">
                <Card bordered={false}>
                    <Button icon="plus" type="primary" onClick={() => {this.handleModalVisible(true);this.setState({formType:1});this.form.props.form.resetFields() } }>新建</Button>
                
                    <Table
                        dataSource={this.state.listData}
                        columns={columns}
                        rowKey="id"
                        pagination={{total:this.state.pageTotal,onChange:this.onPageChange}}
                    />
                </Card>
                <CreateForm  {...parentMethods}   modalVisible={this.state.modalVisible} wrappedComponentRef={(form) => this.form = form} />
            </PageHeaderLayout>

        );
    }
}

export default Ad;
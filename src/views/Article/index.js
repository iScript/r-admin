import React , {Fragment} from "react";
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import {Row,Col,Card,Form,Input,Switch,Icon,Button,Upload,Menu,InputNumber,DatePicker,Modal,message,
    Badge,Divider,Table
} from 'antd';

import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
//record.content = BraftEditor.createEditorState(record.content)
//data.content = data.content.toRAW()


import httpManager from "../../common/httpManager.js"
const FormItem = Form.Item;
const xmodel = "article";

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
            <Modal title="表单"  visible={modalVisible} onOk={this.okHandle} onCancel={() => handleModalVisible()} width="800px"  >
                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="标题">
                    {form.getFieldDecorator('title', {
                        rules: [{ required: true, message: '请输入标题' }],
                        //initialValue:props.formData.name
                    })(<Input placeholder="请输入标题" />)}
                </FormItem>
                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="概述">
                    {form.getFieldDecorator('description', {
                        rules: [{ required: true, message: '请输入' }],
                        //initialValue:props.formData.name
                    })(<Input placeholder="请输入" />)}
                </FormItem>
                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="内容">
                    {form.getFieldDecorator('content', {
                        rules: [{ required: true, message: '请输入' }],
                        //initialValue:props.formData.name
                    })(<BraftEditor
                        controls={['bold', 'italic', 'underline', 'text-color', 'separator', 'link', 'separator', 'media' ]}
                        media={{}}
                        style={{width:"600px"}}
                      />)}
                </FormItem>

            </Modal>
        )
    }
}

const CreateForm = Form.create()(MyForm);

class Article extends React.Component {

    state = {
        listData:[],
        page:1,
        pageTotal : 10,
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
        console.log("record:",record);
        this.setState({modalVisible:true,formType:2,updateId:record.id})
        
       
       var record2 = record;
        record2.content = BraftEditor.createEditorState(record2.content)
        console.log(this.form)
        
        this.form.props.form.setFieldsValue(record2,function(){
            //re
            record2.content = record.content.toHTML()
        });

    }

    //处理修改或新增
    handleFormCreateOrUpdate = (data) => {
        console.log(data)
        data.content = data.content.toHTML()
        //console.log(data);return;
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
                title: '文章标题',
                dataIndex: 'title',
                
            },
            {
                title: '文章概述',
                dataIndex: 'description',
                
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
            
            <PageHeaderLayout title="文章管理">
                <Card bordered={false}>
                    <Button icon="plus" type="primary" onClick={() => {this.handleModalVisible(true);this.setState({formType:1});this.form.props.form.resetFields();this.form.props.form.setFieldsValue({
        content: BraftEditor.createEditorState('')
      }) } }>新建</Button>
                
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

export default Article;
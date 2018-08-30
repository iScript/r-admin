import React , {Fragment} from "react";
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import {Row,Col,Card,Form,Input,TreeSelect,Icon,Button,Upload,Menu,InputNumber,DatePicker,Modal,message,
    Badge,Divider,Table
} from 'antd';

import httpManager from "../../common/httpManager.js"
import config from "../../common/config.js"
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
        const upload_url = config.base_host + "/v1/qiniu/upload";
        
        return (
            <Modal title="表单"  visible={modalVisible} onOk={this.okHandle} onCancel={() => handleModalVisible()}>
                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="分类名称">
                    {form.getFieldDecorator('name', {
                        rules: [{ required: true, message: '请输入分类名称' }],
                        //initialValue:props.formData.name
                    })(<Input placeholder="请输入" />)}
                </FormItem>
                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="分类logo">
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
                        <Upload name="upload_file" action={upload_url} showUploadList={false}>
                            {this.props.form.getFieldValue("image") ? <img src={this.props.form.getFieldValue("image")} width="50px" height="50px" /> : <Button><Icon type="upload" /> 上传</Button>}
                        </Upload>
                    )}
                </FormItem>
                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="父分类">
                    {form.getFieldDecorator('pid', {
                    rules: [{ required: true, message: '' }],
                    })(
                        <TreeSelect
                            style={{ width: 300 }}
                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                            treeData={this.props.category}
                            placeholder="请选择"
                        />
                    )}
                </FormItem>
                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="商品排序">
                    {form.getFieldDecorator('sort', {
                        rules: [{ required: true, message: '请输入' }],
                        //initialValue:props.formData.name
                    })(<InputNumber min={0} placeholder="请输入" />)}
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

    changeCategoryJson = (data) =>{
        var arr = [{title:"顶级分类",value:"0",key:0}];
        data.forEach(o => {
            var o1 = {};
            o1.key = o.id;
            o1.value = o.id+"";
            o1.title = o.name;
            if(o.children && o.children.length>0){
                var arr2 = [];
                o.children.forEach(j =>{
                    var j1 = {};
                    j1.key = j.id;
                    j1.value = j.id+"";
                    j1.title = j.name;
                    arr2.push(j1)
                })
                o1.children = arr2;
            }
            arr.push(o1)
        });
        
        return arr;
    }

    //获取数据
    loadData = () => {
        httpManager.getGoodsCategoryList(this.state.page).then((response) => {
            
            
            var arr = this.changeCategoryJson(response.data.data.data)
            console.log(arr)
            this.setState({"listData":response.data.data.data,pageTotal:response.data.data.total,category:arr});
           // console.log(this.state.category)
        })
        
    }

    //点击删除
    handleDelete = (record) =>{
        if(window.confirm("确认删除？")){
            httpManager.deleteGoodsCategory(record.id).then( (response)=>{
                if(response.data.code != 0){alert(response.data.message);return;}
                this.loadData()
            } )
        }
    }

    //点击修改
    handleUpdate = (record) =>{
        
        this.setState({modalVisible:true,formType:2,updateId:record.id})
        record.pid = record.pid+""
        console.log(record);
        this.form.props.form.setFieldsValue(record);
    }

    //处理修改或新增
    handleFormCreateOrUpdate = (data) => {
        
        console.log(data);
        if(this.state.formType == 2 ){
            httpManager.updateGoodsCategory(this.state.updateId,data).then((response)=>{
                this.handleModalVisible(false);this.loadData();
            });
        }else{
            httpManager.createGoodsCategory(data).then((response)=>{
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
                title: '分类名称',
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
            
            <PageHeaderLayout title="商品分类">
                <Card bordered={false}>
                    <Button icon="plus" type="primary" onClick={() => {this.handleModalVisible(true);this.setState({formType:1});this.form.props.form.resetFields() } }>新建</Button>
                
                    <Table
                        dataSource={this.state.listData}
                        columns={columns}
                        rowKey="id"
                        indentSize={35}
                        pagination={{total:this.state.pageTotal,onChange:this.onPageChange}}
                    />
                </Card>
                <CreateForm  {...parentMethods} category={this.state.category}  modalVisible={this.state.modalVisible} wrappedComponentRef={(form) => this.form = form} />
            </PageHeaderLayout>

        );
    }
}

export default GoodsCategory;
import React , {Fragment} from "react";
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import {Row,Col,Card,Form,Input,TreeSelect,Icon,Button,Upload,Switch,InputNumber,DatePicker,Modal,message,
    Badge,Divider,Table
} from 'antd';

import httpManager from "../../common/httpManager.js"
import F from "../../common/F.js"
import config from "../../common/config.js"
const FormItem = Form.Item;


class MyForm extends React.Component {

    state = {
        fileList : []
    }

    componentDidMount(){
        //console.log("form mount")
    }

    didUploadContent = () => {
        //return;
        console.log("did ")

        var fileList = this.props.form.getFieldValue("img_id_array")   ? 
        this.props.form.getFieldValue("img_id_array").split(" ").filter(function(d){
            return d != false;
        }).map(function(d){
            return {
                uid: Math.random(),
                name: 'xxx.png',
                status: 'done',
                url: d,
            }
        }) : [] ;
        this.setState({fileList:fileList})
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
        const upload_url = config.base_host + "/v1/qiniu/upload";
        //var fileList = [];
        return (
            <Modal title="表单"  visible={modalVisible} onOk={this.okHandle} onCancel={() => handleModalVisible()}>
                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="商品名称">
                    {form.getFieldDecorator('name', {
                        rules: [{ required: true, message: '请输入名称' }],
                        //initialValue:props.formData.name
                    })(<Input placeholder="请输入" />)}
                </FormItem>
                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="商品简介">
                    {form.getFieldDecorator('introduction', {
                        rules: [{ required: true, message: '请输入' }],
                        //initialValue:props.formData.name
                    })(<Input placeholder="请输入" />)}
                </FormItem>
                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="图片">
                    {form.getFieldDecorator('picture', {
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
                            {this.props.form.getFieldValue("picture") ? <img src={this.props.form.getFieldValue("picture")} width="50px" height="50px" /> : <Button><Icon type="upload" /> 上传</Button>}
                        </Upload>
                    )}
                </FormItem>
                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="父分类">
                    {form.getFieldDecorator('category_id', {
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
                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="商品价格">
                    {form.getFieldDecorator('price', {
                        rules: [{ required: true, message: '请输入' }],
                        //initialValue:props.formData.name
                    })(<InputNumber min={0}  step={0.01} placeholder="请输入" />)}
                </FormItem>
                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="促销价格">
                    {form.getFieldDecorator('promotion_price', {
                        rules: [],
                        //initialValue:props.formData.name
                    })(<InputNumber min={0}  step={0.01} placeholder="请输入" />)}
                </FormItem>
                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="商品库存">
                    {form.getFieldDecorator('stock', {
                        rules: [{ required: true, message: '请输入' }],
                        //initialValue:props.formData.name
                    })(<InputNumber min={0} placeholder="请输入" />)}
                </FormItem>
                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="商品排序">
                    {form.getFieldDecorator('sort', {
                        rules: [{ required: true, message: '请输入' }],
                        //initialValue:props.formData.name
                    })(<InputNumber min={0} placeholder="请输入" />)}
                </FormItem>
                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="净含量">
                    {form.getFieldDecorator('extra_1', {
                        rules: [{ required: true, message: '请输入' }],
                        //initialValue:props.formData.name
                    })(<Input placeholder="请输入" />)}
                </FormItem>
                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="保存方式">
                    {form.getFieldDecorator('extra_2', {
                        rules: [{ required: true, message: '请输入' }],
                        //initialValue:props.formData.name
                    })(<Input placeholder="请输入" 	/>)}
                </FormItem>
                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="保质期">
                    {form.getFieldDecorator('extra_3', {
                        rules: [{ required: true, message: '请输入' }],
                        //initialValue:props.formData.name
                    })(<Input placeholder="请输入" />)}
                </FormItem>
                
                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="重量说明">
                    {form.getFieldDecorator('extra_4', {
                        rules: [{}],
                        //initialValue:props.formData.name
                    })(<Input placeholder="请输入" />)}
                </FormItem>
                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="送到时间说明">
                    {form.getFieldDecorator('extra_5', {
                        rules: [{}],
                        //initialValue:props.formData.name
                    })(<Input placeholder="请输入" />)}
                </FormItem>


                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="详情图片">
                    {form.getFieldDecorator('img_id_array', {
                        getValueFromEvent: (e) => {
                            var a = "";
                            e.fileList.map(function(d){
                                var v = d.response ? d.response.data : d.url;
                                a += v+" "
                            });
                            this.setState({fileList:e.fileList})
                            return  a.trim();
                        },

                    })( 
                        //
                        <Upload name="upload_file" fileList={ 
                           this.state.fileList } 
                         listType="picture-card" action={upload_url} >
                            <Button><Icon type="upload" /> 上传</Button>
                        </Upload>
                    )}
                </FormItem>
                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="是否新品">
                    {form.getFieldDecorator('is_new', {
                        valuePropName: 'checked',
                    })(<Switch />)}
                </FormItem>
                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="是否推荐">
                    {form.getFieldDecorator('is_recommend', {
                        valuePropName: 'checked',
                    })(<Switch />)}
                </FormItem>
                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="是否上架">
                    {form.getFieldDecorator('state', {
                        valuePropName: 'checked',
                    })(<Switch />)}
                </FormItem>
                

                

            </Modal>
        )
    }
}

const CreateForm = Form.create()(MyForm);

class Goods extends React.Component {

    state = {
        listData:[],
        page:1,
        pageTotal : 10,
        modalVisible: false,
        category:[],
        param_str:"",

        formType:1 , //1新增 2修改
        updateId:0  //修改id
    };



    componentDidMount() {
        this.loadData()
        
        httpManager.getGoodsCategoryList(1,100).then( (response)=>{
            if(!F.checkResponse(response)) return;

            console.log(response.data)
            var arr = this.changeCategoryJson(response.data.data.data)
            this.setState({category:arr})
        } )
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
        var arr = [];
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
        httpManager.getGoodsList(this.state.page,this.state.param_str).then((response) => {
            if(!F.checkResponse(response)) return;

            this.setState({"listData":response.data.data.data,pageTotal:response.data.data.total});
        })
        
    }

    //点击删除
    handleDelete = (record) =>{
        if(window.confirm("确认删除？")){
            httpManager.deleteGoods(record.id).then( (response)=>{
                if(response.data.code != 0){alert(response.data.message);return;}
                this.loadData()
            } )
        }
    }

    //点击修改
    handleUpdate = (record) =>{
        
        this.setState({modalVisible:true,formType:2,updateId:record.id})
       console.log(record);
        record.category_id = record.category_id+""
        this.form.props.form.setFieldsValue(record);
        this.form.didUploadContent()
    }

    //处理修改或新增
    handleFormCreateOrUpdate = (data) => {
        
        console.log(data);
        if(this.state.formType == 2 ){
            httpManager.updateGoods(this.state.updateId,data).then((response)=>{
                if(!F.checkResponse(response)) return;
                this.handleModalVisible(false);this.loadData();
            });
        }else{
            httpManager.createGoods(data).then((response)=>{
                if(!F.checkResponse(response)) return;
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
                title: '商品名称',
                dataIndex: 'name',
                
            },
            {
                title: '图片',
                dataIndex: 'picture',
                render(val){
                    return <img src={val} width="50px" height="50px" />
                }
            },
            {
                title: '库存',
                dataIndex: 'stock'
            },
            {
                title: '状态',
                dataIndex: 'state',
                render(val){
                    return (val == 1) ? <span style={{color:"green"}}>上架中</span> : "下架中";
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
            
            <PageHeaderLayout title="商品管理">
                <Card bordered={false}>
                    <Row>
                        <Col span={4}>
                            <Button icon="plus" type="primary" onClick={() => {this.handleModalVisible(true);this.setState({formType:1});this.form.props.form.resetFields(); this.form.props.form.setFieldsValue({stock:"500",sort:"0",extra_1:"500g",extra_2:"冷藏",extra_3:"7天"}); } }>新建</Button>
                        </Col>
                        <Col span={20}>
                            <Input.Search style={{width:'200px'}}
                            placeholder="搜索"
                            onSearch={(value) => {this.setState({param_str:"keyword="+value},()=> {
                                this.loadData()
                            }) }}
                            enterButton
                            />
                        </Col>
                    </Row>
                    <Table
                        dataSource={this.state.listData}
                        columns={columns}
                        rowKey="id"
                        pagination={{total:this.state.pageTotal,onChange:this.onPageChange}}
                    />
                </Card>
                <CreateForm  {...parentMethods} category={this.state.category}  modalVisible={this.state.modalVisible} wrappedComponentRef={(form) => this.form = form} />
            </PageHeaderLayout>

        );
    }
}

export default Goods;
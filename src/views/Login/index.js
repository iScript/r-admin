import React, { Fragment } from 'react';
import { Link } from "react-router-dom";
import {Row,Col,Card,Form,Input,Select,Icon,Button,Dropdown,Menu,InputNumber,DatePicker,Modal,message,
    Badge,Divider,Table
} from 'antd';
import axios from 'axios';
import GFooter from "../../components/GFooter"
import logo from '../../assets/logo.svg';
import "./index.css";
import { userInfo } from 'os';

const links = [];
const copyright = (
    <Fragment>
        Copyright <Icon type="copyright" /> 2018 技术部出品
    </Fragment>
);

class Login extends React.Component {

    componentDidMount(){
        //console.log(this.props)
    }


    render() {
    
        
        return (
            
            <div className="container login">
                <div className="content">
                    <div className="top">
                        <div className="header">
                            <Link to="/">
                            <img alt="logo" className="logo" src={logo} />
                            <span className="title">YAdmin</span>
                            </Link>
                        </div>
                        <div className="desc">YAdmin 是西湖区最具影响力的 Web 设计规范</div>
                    </div>
                    
                    <div className="main">
                        <CreateForm {...this.props}  />
                    </div>
                   

                </div>
                <GFooter links={links} copyright={copyright} />
            </div>

        );
    }
}

const CreateForm = Form.create()(props => {
    
    const { getFieldDecorator } = props.form;
    const FormItem = Form.Item;
    
    const handleSubmit = (e) => {
        console.log(11)
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                axios.post("http://127.0.0.1:8000/admin/login",values).then( (response) => {
                    // handle success
                    //console.log(response);
                    if(response.data.code == 0){
                        localStorage.setItem("user",JSON.stringify(response.data.data))
                        
                        console.log(props)
                        props.history.push("/dashboard")
                        
                        //window.location.href = "#/dashboard"


                        //const {history} = props;
                        //history.replace("/dashboard")
                        //window.location="#/dashboard";
                    }
                    
                });
            }
        });
    }

    return (
        
        <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
            {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your username!' }],
            })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
            )}
            </FormItem>
            <FormItem>
            {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
            })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
            </FormItem>
            <FormItem>
            
            <Button type="primary" onClick={handleSubmit} className="login-form-button">
                登录
            </Button>
            
            </FormItem>
        </Form>

    );
  });

export default Login;
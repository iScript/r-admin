import React , {Fragment} from "react";
import Sidebar from "../components/Sidebar";
import GHeader from "../components/GHeader";
import GFooter from '../components/GFooter';
import { Switch , Route , Redirect} from 'react-router-dom';
import { Layout, Icon, message ,Modal,Input} from 'antd';
import 'antd/dist/antd.css'; 
import logo from '../assets/logo.svg';
import "../assets/index.css"
import { enquireScreen, unenquireScreen } from 'enquire-js';
import adminRoutes from "../routes/admin.js";
import menuData from "../common/menu.js"
import httpManager from "../common/httpManager.js"
import F from "../common/F.js"

const { Content, Header, Footer } = Layout;

class Admin extends React.Component {

    state = {
        isMobile:false,
        collapsed:false, //是否收缩
        modalVisible: false,
        newpass:''
    };

    constructor(){
        super()
        //console.log("super",this.props)
    }

    
     //表单显示或隐藏
    handleModalVisible = flag => {
        this.setState({modalVisible: !!flag,});
    };

    handleMenuCollapse = collapsed => {
        console.log("admin collapse",this.state.collapsed)
        this.setState({collapsed:!this.state.collapsed});
    };

    getUser = ()=>{
        return (typeof localStorage.user != "undefined" ) ? JSON.parse(localStorage.user) : null;   
    }

    resetPasswordHandle = ()=>{
        //console.log(111,this.getUser().id);return;
        if(this.state.newpass == "") return;
        httpManager.update("admin_user",this.getUser().id,{password:this.state.newpass}).then((response)=>{
            if(!F.checkResponse(response)) return;
            alert(response.data.message)
            this.handleModalVisible(false)
            this.setState({newpass:""})
        });
    }

    handleMenuClick = (key) => {
        console.log(key)
        if(key.key == "logout"){
            localStorage.clear();
            console.log(this.props)
            this.props.history.push("/login");
        }
        if(key.key == "password"){
           
            this.handleModalVisible(true)
        }

        if(key.key == "clear"){
            alert("清理成功")
        }
    }

    componentWillMount(){
       
        console.log("will go");
        // 临时先这样处理
        if(!localStorage.user){
            
            const {history} = this.props;
            history.replace("/login")

            setTimeout(() => {
                history.replace("/login");
            }, 500)
        }
        
       
    }

    

    componentDidMount(){
        console.log("dddddd")
        
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            console.log("手机访问")
            this.setState({
                isMobile: true,
            });
        }
        
        // enquireScreen(mobile => {
        //     console.log(mobile,"dddddd")
        //     const { isMobile } = this.state;
        //     if (isMobile !== mobile) {
        //       this.setState({
        //         isMobile: mobile,
        //       });
        //     }
        // });
        
        
        // 订单语音
        setInterval(function(){
            if(!this.getUser) return;
           
            httpManager.orderStatus().then(response => {
               var d = response.data.data;
               var new_order = d.today_newest_order;
               console.log("check order new",new_order)

               if(new_order){
                    var tmp = localStorage.tmpo;
                    if(tmp && tmp == new_order.order_id) return;
                    console.log("check order new22",new_order.status)
                    if(new_order.status == 1){
                  
                        console.log("你有新订单。。。")
                        var audio = document.createElement("audio");
                        audio.src = "http://ojjzd9dod.bkt.clouddn.com/dingdong.mp3";
                        audio.play();
                        localStorage.tmpo = new_order.order_id;

                    }
               }
           })
       },5000)
    }

    componentWillUnmount() {
        //cancelAnimationFrame(this.renderRef);
        unenquireScreen(this.enquireHandler);
    }




    render() {
        const { isMobile } = this.state;
        return (
            
            <Layout>
                <Sidebar logo={logo} collapsed={this.state.collapsed} menuData={menuData} isMobile={isMobile} />
                
                <Layout>
                    <Header style={{ padding: 0 }}>
                        <GHeader 
                            logo={logo}
                            isMobile={false}
                            collapsed={this.state.collapsed}
                            onCollapse={this.handleMenuCollapse}
                            handleMenuClick={this.handleMenuClick}
                        />
                    </Header>
                    <Content style={{ margin: '24px 24px 0', height: '100%' }}>
                        <Switch>
                        {adminRoutes.map((prop, key) => {
                            if (prop.redirect)
                                return <Redirect from={prop.path} to={prop.to} key={key} />;
                            return <Route  path={prop.path} component={prop.component} key={key} />;
                        })}
                        </Switch>
                    </Content>

                    <Footer style={{ padding: 0 }}>
                        <GFooter
                        links={[
                           
                            {
                            key: 'github',
                            title: <Icon type="github" />,
                            href: 'https://github.com/ant-design/ant-design-pro',
                            blankTarget: true,
                            },
                            
                        ]}
                        copyright={
                            <Fragment>
                            Copyright <Icon type="copyright" /> 2018 技术部出品
                            </Fragment>
                        }
                        />
                    </Footer>
                </Layout>
                
                <Modal title="修改密码"  visible={this.state.modalVisible} onOk={this.resetPasswordHandle} onCancel={() => this.handleModalVisible()} >
                    
                    新密码：<Input placeholder="新密码" onChange={(e)=>{
                        //console.log(this=)
                        this.setState({newpass:e.target.value})
                    }} />
                </Modal>

                
            </Layout>
    
        );
    }
}

export default Admin;
import React , {Fragment} from "react";
import Sidebar from "../components/Sidebar";
import GHeader from "../components/GHeader";
import GFooter from '../components/GFooter';
import { Switch , Route , Redirect} from 'react-router-dom';
import { Layout, Icon, message } from 'antd';
import 'antd/dist/antd.css'; 
import logo from '../assets/logo.svg';
import "../assets/index.css"

import adminRoutes from "../routes/admin.js";
import menuData from "../common/menu.js"

const { Content, Header, Footer } = Layout;

class Admin extends React.Component {

    state = {
        isMobile:true,
        collapsed:false //是否收缩
    };

    constructor(){
        super()
        //console.log("super",this.props)
    }

    handleMenuCollapse = collapsed => {
        console.log("admin collapse",this.state.collapsed)
        this.setState({collapsed:!this.state.collapsed});
    };

    handleMenuClick = (key) => {
        console.log(key)
        if(key.key == "logout"){
            localStorage.clear();
            console.log(this.props)
            this.props.history.push("/login");
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
       
    }


    render() {
        
        return (
            
            <Layout>
                <Sidebar logo={logo} collapsed={this.state.collapsed} menuData={menuData} />
                
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
                
                
            </Layout>
    
        );
    }
}

export default Admin;
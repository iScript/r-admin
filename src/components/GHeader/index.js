import React, { PureComponent } from 'react';
import { Menu, Icon, Spin, Tag, Dropdown, Avatar, Divider, Tooltip,Modal } from 'antd';
import { Link ,Switch , Route , Redirect } from 'react-router-dom';


import "./index.css";

class GHeader extends PureComponent {

    toggle = () => {
        
        const { collapsed, onCollapse } = this.props;
        onCollapse(!collapsed);
        // this.triggerResizeEvent();
    };

    // handleMenuClick = (key) => {
    //     console.log(key)
    //     if(key.key == "logout"){
    //         localStorage.clear();
    //         console.log(this.props)
    //         this.props.history.push("/login");
    //     }
    // }

    


    render() {
        const {
            logo,
            isMobile,
            collapsed,
            currentUser = {
                name:"admin",
                avatar:"https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
            },
        } = this.props;

        const menu = (
            <Menu className="menu" selectedKeys={[]} onClick={this.props.handleMenuClick}>
                <Menu.Item key="clear">
                <Icon type="user" />清理缓存
                </Menu.Item>
                <Menu.Item key="password">
                <Icon type="setting" />修改密码
                </Menu.Item>
                {/* <Menu.Item disabled>
                <Icon type="setting" />设置
                </Menu.Item>
                <Menu.Divider /> */}
                <Menu.Item key="logout">
                    <Icon type="logout" />退出登录
                </Menu.Item>
            </Menu>
        );

        return (
            

            <div className="gheader">
      
                {isMobile && [
                <Link to="/" className="logo" key="logo">
                    <img src={logo} alt="logo" width="32" />
                </Link>,
                <Divider type="vertical" key="line" />,
                ]}
                <Icon
                className="trigger"
                type={collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
                />

                <div className="right">
                    <Tooltip title="使用说明请联系技术">
                        <a
                        target="_blank"
                        href="#"
                        rel="noopener noreferrer"
                        className="action"
                        >
                        <Icon type="question-circle-o" />
                        </a>
                    </Tooltip>
                    {currentUser.name ? (
                        <Dropdown overlay={menu}>
                        <span className="action account">
                            <Avatar size="small" className="avatar" src={currentUser.avatar} />
                            <span className="name">{currentUser.name}</span>
                        </span>
                        </Dropdown>
                    ) : (
                        <Spin size="small" style={{ marginLeft: 8 }} />
                    )}
                </div>

                
                
            </div>
        );
    }
}

export default GHeader;
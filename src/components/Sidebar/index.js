import React from "react";
import { Layout, Menu, Icon,Drawer } from 'antd';
import { Link } from 'react-router-dom';

import  "./index.css";

const { Sider } = Layout;
const { SubMenu } = Menu;


class Sidebar extends React.Component {

    constructor(props) {
        super(props);
        this.menus = props.menuData;
        // this.flatMenuKeys = getFlatMenuKeys(props.menuData);
        // this.state = {
        //   openKeys: this.getDefaultCollapsedSubMenus(props),
        // };
        //console.log(this.menus)
    }

    getMenuItemPath = item => {
        const itemPath = item.path;
        const icon = item.icon;
        const { target, name } = item;
        // Is it a http link
        if (/^https?:\/\//.test(itemPath)) {
            return (
                <a href={itemPath} target="_blank">
                <span>{name}</span>
                </a>
            );
        }
        const { location, isMobile, onCollapse } = this.props;
        return (
          <Link
            to={itemPath}
          >
            {icon}
            <span>{name}</span>
          </Link>
        );
    };

    getNavMenuItems = menusData => {
        if (!menusData) {
          return [];
        }
        return menusData.filter(item => item.name && !item.hideInMenu)
            .map(item => {
            // make dom
            const ItemDom = this.getSubMenuOrItem(item);
            return ItemDom;
            //return this.checkPermissionItem(item.authority, ItemDom);
            })
            .filter(item => item);
    };

    getSubMenuOrItem = item => {
        
        //判断子节点并且子节点至少有一个name属性
        if (item.children && item.children.some(child => child.name)) {
            
            const childrenItems = this.getNavMenuItems(item.children);
            
            // 当无子菜单时就不展示菜单
            if (childrenItems && childrenItems.length > 0) {
                return (
                <SubMenu
                    title={
                    item.icon ? (
                        <span>
                            <Icon type={item.icon} />
                        <span>{item.name}</span>
                        </span>
                    ) : (
                        item.name
                    )
                    }
                    key={item.path}
                    >
                    {childrenItems}
                </SubMenu>
                );
            }
            return null;
        
        //没有子节点
        } else {
            return <Menu.Item key={item.path}>{this.getMenuItemPath(item)}</Menu.Item>;
        }
    };

    
    

    render() {
        const { logo , collapsed ,onCollapse } = this.props;

        return (
            
            <Sider width={256} collapsed={collapsed} className="sider" >
                <div className="logo" key="logo">
                <Link to="/">
                    <img src={logo} alt="logo" />
                    <h1>XM后台管理系统</h1>
                </Link>
                </div>
                
                <Menu
                key="Menu"
                theme="dark"
                mode="inline"
                style={{ padding: '16px 0', width: '100%' }}
                
                >
                    {this.getNavMenuItems(this.menus)}
                </Menu>
            </Sider>
               
        );
    }
}

export default Sidebar;
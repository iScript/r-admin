import React from 'react';
import { Breadcrumb } from 'antd';
import "./index.css"

export default class PageHeader extends React.Component {
    
    state = {
        breadcrumb: null,
    };

    componentDidMount() {
        this.getBreadcrumbDom();
    }
    
    getBreadcrumbDom = () => {
        // 待优化
        const breadcrumb = (
            <Breadcrumb className="breadcrumb" >
                <Breadcrumb.Item>首页</Breadcrumb.Item>
                <Breadcrumb.Item>内容</Breadcrumb.Item>
            </Breadcrumb>
        );
        this.setState({
            breadcrumb,
        });
    };

    

    render() {
        const {
            title,
        } = this.props;
        const { breadcrumb } = this.state;

        return (
            <div className="pageHeader" >
                {breadcrumb}
                <div className="detail">
                    <div className="main">
                        <div className="row">
                        {title && <h1 className="title">{title}</h1>}
                        </div>
                    </div>
                </div>

            </div>
        );
    }

}
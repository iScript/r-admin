import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import  './PageHeaderLayout.css';


// 无状态组件 ，无state状态的，参数为props ， 下面为props的ES6 的解构赋值。
// props.children 为组件的子节点

export default ({ children, wrapperClassName, top, ...restProps }) => (
    <div style={{ margin: '-24px -24px 0' }} className={wrapperClassName}>
        {top}
        <PageHeader key="pageheader" {...restProps} linkElement={Link} />
    
        {children ? <div className="content">{children}</div> : null}
    </div>
);
  
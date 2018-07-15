import React from 'react';
import './index.css';

const GFooter = ({ className, links, copyright }) => {
  
  return (
    <div className="globalFooter" >
        {links && (
            <div className="links">
            {links.map(link => (
                <a key={link.key} target={link.blankTarget ? '_blank' : '_self'} href={link.href}>
                {link.title}
                </a>
            ))}
            </div>
        )}
        {copyright && <div className="copyright">{copyright}</div>}
    </div>
  );
};

export default GFooter;

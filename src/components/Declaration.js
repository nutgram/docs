import React from 'react';

export default function Declaration({children, name, type}) {
    return (
        <div style={{display: 'flex', flexDirection: 'column', marginBottom: '0.5rem'}}>
            <div style={{fontWeight:'bold', fontFamily: 'monospace', fontSize: '1.05rem'}}>
                <span style={{color: '#81a9fd'}}>{name}</span>
                <span style={{color: '#f58b6b'}}>()</span>:&nbsp;
                <span style={{color: '#be8de1'}}>{type}</span>
            </div>
            <div>{children}</div>
        </div>
    );
}
import React from 'react';

const BADGES = {
    generic:  { alt: 'generic',  src: 'https://img.shields.io/badge/-GENERIC-brightgreen' },
    specific: { alt: 'specific', src: 'https://img.shields.io/badge/-SPECIFIC-blue' },
    special:  { alt: 'special',  src: 'https://img.shields.io/badge/-SPECIAL-yellow' },
};

export default function Handler({type, signature, description}) {
    const badge = BADGES[type];
    if (!badge) return null;

    return (
        <div className="margin-bottom--md">
            <img style={{verticalAlign: 'middle'}} alt={badge.alt} src={badge.src}/>&nbsp;
            <code>{signature}</code><br/>
            {description}
        </div>
    );
}
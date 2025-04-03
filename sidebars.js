/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {

    docs: [
        {
            type: 'doc',
            label: '📜 Introduction',
            id: 'introduction'
        },
        {
            type: 'category',
            label: '🏁 Getting Started',
            link: {
                type: 'generated-index',
            },
            collapsed: false,
            items: [
                'configuration/installation',
                'configuration/cache',
                'configuration/logging',
                'configuration/laravel',
                'configuration/symfony',
            ],
        },
        {
            type: 'category',
            label: '✍ Usage',
            link: {
                type: 'generated-index',
            },
            collapsed: false,
            items: [
                'usage/getting_updates',
                'usage/sending_requests',
                'usage/handlers',
                'usage/middleware',
                'usage/rate_limiting',
                'usage/keyboards',
                'usage/conversations',
                'usage/inline_menu',
                'usage/extend',
                'usage/bulk_messenger',
                'usage/web_validation',
                'usage/exceptions',
            ],
        },
        {
            type: 'category',
            label: '⚗️ Testing',
            link: {
                type: 'generated-index',
            },
            collapsed: false,
            items: [
                'testing/introduction',
                'testing/hearing',
                'testing/mocking',
                'testing/asserting',
                'testing/examples',
            ],
        },
        {
            type: 'category',
            label: '⏫ Upgrading',
            link: {
                type: 'generated-index',
            },
            collapsed: false,
            items: [
                'upgrading/from-3.x-to-4.x',
                'upgrading/from-2.x-to-3.x',
                'upgrading/from-1.x-to-2.x',
            ],
        },
    ]

    // By default, Docusaurus generates a sidebar from the docs folder structure
    //tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],

    // But you can create a sidebar manually
    /*
    tutorialSidebar: [
      {
        type: 'category',
        label: 'Tutorial',
        items: ['hello'],
      },
    ],
     */
};

module.exports = sidebars;

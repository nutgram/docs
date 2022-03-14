// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/vsDark');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Nutgram',
  tagline: 'The Telegram bot framework that doesn\'t drive you nuts.',
  url: 'https://nutgram.dev',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'nutgram', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          remarkPlugins: [require('mdx-mermaid')],
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/nutgram/docs/tree/master',
          lastVersion: 'current',
          versions: {
            current: {
              label: '2.x',
              // path: '.',
            },
          },
        },
        blog: {
          showReadingTime: true,
          editUrl:
            'https://github.com/nutgram/docs/tree/master',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Nutgram',
        logo: {
          alt: 'The Telegram bot framework that doesn\'t drive you nuts.',
          src: 'img/logo.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'introduction',
            position: 'left',
            label: 'Documentation',
          },
          {to: '/blog', label: 'Blog', position: 'left'},
          {
            type: 'docsVersionDropdown',
            position: 'right',
            //dropdownItemsAfter: [{to: '/versions', label: 'All versions'}],
            dropdownActiveClassDisabled: true,
          },
          {
            href: 'https://github.com/nutgram/nutgram',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Documentation',
                to: '/docs/introduction',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/nutgram',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/nutgram/nutgram',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Sergio Brighenti. Docs built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['php', 'bash'],
      },
    }),

  plugins: [
    [
      require.resolve("@cmfcmf/docusaurus-search-local"),
      {
        // Options here
      },
    ],
  ],
};

module.exports = config;

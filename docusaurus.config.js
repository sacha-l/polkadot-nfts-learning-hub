// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'A learning hub for use cases of non-fungible assets on Polkadot',
  favicon: 'img/favicon.svg',

  // Set the production url of your site here
  url: 'https://sacha-l.github.io',
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'sacha-l',
  projectName: 'polkadot-workshops',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/sacha-l/polkadot-workshops/blob/main/',
          // Equivalent to `enableUpdateBy`.
          showLastUpdateAuthor: true,
          // Equivalent to `enableUpdateTime`.
          showLastUpdateTime: true,

          // Configure MDX loader
          include: ['**/*.md', '**/*.mdx'], // Include .mdx files
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/sacha-l/polkadot-workshops',
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
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: '',
        logo: {
          alt: 'My Site Logo',
          src: 'img/polkadot-dot-logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Home',
          },
          {
            type: 'docSidebar',
            sidebarId: 'videoSidebar',
            position: 'left',
            label: 'Learn with videos',
          },
          {
            href: 'https://github.com/sacha-l/polkadot-workshops',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Learn about Substrate and Polkadot',
            items: [
              {
                label: 'Polkadot website',
                href: 'https://polkadot.network/',
              },
              {
                label: 'Polkadot wiki',
                href: 'https://wiki.polkadot.network/',
              },
              {
                label: 'Substrate Docs',
                href: 'https://docs.substrate.io/',
              },
              {
                label: 'Substrate Github',
                href: 'https://github.com/paritytech/substrate/',
              },
            ],
          },
          {
            title: 'Polkadot developer community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://substrate.stackexchange.com/',
              },
              {
                label: 'Developer newsletter',
                href: 'https://parity.link/HLj1a',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'My Twitter',
                href: 'https://twitter.com/SachaL__',
              },
              {
                label: 'My GitHub',
                href: 'https://github.com/sacha-l',
              },
            ],
          },
        ],
        // copyright: `Copyright © ${new Date().getFullYear()}`, // update with open source license
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;

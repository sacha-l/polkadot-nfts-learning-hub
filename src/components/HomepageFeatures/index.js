import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Explore different use cases',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        This learning hubs aims to be a place to explore different use cases of NFTs on Statemine, for end-users, businesses and prospective collection owners.
      </>
    ),
  },
  {
    title: 'About the author',
    Svg: 'none',
    description: (
      <>
        Hi my name is Sacha 👋 &mdash; I'm a Developer Advocate at Parity Technologies. I created this resource to 
        help end-users and developers learn about the different NFT capabilities on Polkadot, with a particular 
        focus on FRAME's new NFTs pallet.
      </>
    ),
  },
  {
    title: 'Explore ways to use the NFTs pallet in your app-chain',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        This learning hub also aims to be a place containing examples for runtime engineers 
        curious to use the pallet in their parachains.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

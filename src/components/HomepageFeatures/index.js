import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Explore different use cases',
    Svg: 'none',
    description: (
      <>
        This learning hubs aims to be a place to explore different use cases of non-fungible assets on Polkadot's Asset Hub and between other app-chains, for end-users, businesses and collection creators.
      </>
    ),
  },
  {
    title: 'About the author',
    Svg: 'none',
    description: (
      <>
        Hi my name is Sacha 👋 &mdash; I'm a Developer Advocate at Parity Technologies. I created this resource to 
        help end-users and developers learn about the different ways to use non-fungible assets on Polkadot, with a particular 
        focus on FRAME's new NFTs pallet.
        Please note that this is a brand new resource, currently under construction. If there are any resources you'd
        like to see or updates to existing material, please consider contributing by filing an issue here: https://github.com/sacha-l/polkadot-nfts-learning-hub/issues.
      </>
    ),
  },
  {
    title: 'Explore ways to use the NFTs pallet in your app-chain',
    Svg: 'none',
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

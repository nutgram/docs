import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
    {
        title: 'Blazing Fast',
        Svg: require('@site/static/img/fast.svg').default,
        description: (
            <>
                Focusing to keep the framework overhead as low as possible, what's worse than a slow chatbot?
            </>
        ),
    },
    {
        title: 'Production Ready',
        Svg: require('@site/static/img/production.svg').default,
        description: (
            <>
                Already battle-tested on high traffic chatbots, provides a good number of integrations and testing
                features.
            </>
        ),
    },
    {
        title: 'Conversations',
        Svg: require('@site/static/img/conversations.svg').default,
        description: (
            <>
                Nutgram provides a simple and powerful way to manage conversations, allowing you to build complex chatbots with ease.
            </>
        ),
    },
    {
        title: 'Framework Support',
        Svg: require('@site/static/img/frameworks.svg').default,
        description: (
            <>
                Provides a nice integration with Laravel and Symfony, allowing you to use Nutgram in your favorite framework.
            </>
        ),
    },
    {
        title: 'Extensible',
        Svg: require('@site/static/img/extensible.svg').default,
        description: (
            <>
                Nutgram is built with extensibility in mind, you can easily extend it with your own features.
            </>
        ),
    },
    {
        title: 'Testing',
        Svg: require('@site/static/img/testing.svg').default,
        description: (
            <>
                Test your chatbots with ease! Nutgram comes with a testing suite that makes testing a breeze.
            </>
        ),
    },
];

function Feature({Svg, title, description}) {
    return (
        <div className={clsx('col col--4')} style={{marginBottom: 15}}>
            <div className={styles.featureListLogo + " text--center"}>
                <Svg className={styles.featureSvg} role="img"/>
            </div>
            <div className="text--center padding-horiz--md">
                <h3 className={styles.featureListTitle}>{title}</h3>
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

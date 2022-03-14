import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
    {
        title: 'Blazing Fast',
        Svg: require('@site/static/img/rocket.svg').default,
        description: (
            <>
                Focusing to keep the framework overhead as low as possible, what's worse than a slow chatbot?
            </>
        ),
    },
    {
        title: 'Easy to Use',
        Svg: require('@site/static/img/items.svg').default,
        description: (
            <>
                Built on top of Guzzle, scales from a proof of concept to the most complex flows, without losing your mind.
            </>
        ),
    },
    {
        title: 'Production Ready',
        Svg: require('@site/static/img/tasks.svg').default,
        description: (
            <>
                Already battle-tested on high traffic chatbots, provides a good number of integrations and testing
                features.
            </>
        ),
    },
    {
        title: 'Batteries Included',
        Svg: require('@site/static/img/battery.svg').default,
        description: (
            <>
                Provides a nice integration with Laravel and integrates with PHPUnit.
            </>
        ),
    },
];

function Feature({Svg, title, description}) {
    return (
        <div className={clsx('col col--3')}>
            <div className="text--center">
                <Svg className={styles.featureSvg} role="img"/>
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

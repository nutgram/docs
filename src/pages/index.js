import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

function HomepageHeader() {
    const {siteConfig} = useDocusaurusContext();
    return (
        <header className={clsx('hero', styles.heroBanner)}>
            <div className="container">
                <img className={styles.logo} src="/img/logo-raw.svg" width={360} alt="Nutgram Logo" />
                <h1 className={clsx('hero__title', styles.title)}>{siteConfig.title}</h1>
                <p className={clsx('hero__subtitle', styles.tagline)}>{siteConfig.tagline}</p>
                <div className={styles.buttons}>
                    <Link
                        className="button button--secondary button--lg"
                        to="/docs/introduction">
                        🚀 Get Started
                    </Link>
                    <iframe
                        style={{overflow: 'hidden', 'marginLeft': '25px'}}
                        src="https://ghbtns.com/github-btn.html?user=nutgram&amp;repo=nutgram&amp;type=star&amp;count=true&amp;size=large"
                        width={160}
                        height={30}
                        title="GitHub Stars"
                    />
                </div>
            </div>
        </header>
    );
}

export default function Home() {
    const {siteConfig} = useDocusaurusContext();
    return (
        <Layout
            title="Welcome"
            description={`${siteConfig.tagline}`}>
            <span className={styles.heroBackground}></span>
            <HomepageHeader/>
            <main>
                <HomepageFeatures/>
            </main>
        </Layout>
    );
}

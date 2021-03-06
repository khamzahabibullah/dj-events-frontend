import Head from 'next/head';
import {useRouter} from 'next/router';
import Header from './Header';
import Footer from './Footer';
import Showcase from './Showcase';

import styles from '../styles/Layout.module.css';

const Layout = ({title, keywords, description, children}) => {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>

      <Header></Header>

      {router.pathname === '/' && <Showcase></Showcase>}

      <div className={styles.container}>{children}</div>

      <Footer></Footer>
    </div>
  );
};

Layout.defaultProps = {
  title: 'DJ Events | Find the hottest parties',
  description: 'Find the latest DJ and other musical events',
  keywords: 'music, dj, edm, parties, events',
};

export default Layout;

import React from 'react';
import styles from './banner.module.less'

export class Banner extends React.Component {
  render() {
    return (
      <div className={styles.banner} >
        <div className={'container'} >
          <h1 className={styles.logoFont} >conduit</h1>
          <p className={styles.bannerP} >A place to share your knowledge</p>
        </div>
      </div>
    );
  }
}
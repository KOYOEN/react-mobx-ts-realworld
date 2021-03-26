import React from 'react';
import styles from './banner.module.less'

export class Banner extends React.Component {
  render() {
    return (
      <div className={styles['banner']}>
        <div className={styles["container"]}>
          <h1 className={styles["logo-font"]}>conduit</h1>
          <p className={styles["banner-p"]}>A place to share your knowledge</p>
        </div>
      </div>
    );
  }
}
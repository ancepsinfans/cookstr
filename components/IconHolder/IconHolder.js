import React from 'react';
import { Bookmark, Heart, Share, Zap } from 'react-feather';
import styles from './IconHolder.module.css';

function IconHolder() {
  return (
    <IconButton>
      <Heart />
      <Bookmark />
      <Zap />
      <Share />
    </IconButton>

  );
}

function IconButton({ icon, children }) {
  return (
    <div className={styles.wrapper}>
      {
        children.map((e, idx) => {
          return (
            <button key={idx} className={styles.iconWrapper} >
              {e}
            </button>
          )
        })
      }
    </div>
  );
}

export default IconHolder;

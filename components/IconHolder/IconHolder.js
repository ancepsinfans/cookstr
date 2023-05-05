import React from 'react';
import { Bookmark, Heart, Share, Zap } from 'react-feather';
import styles from './IconHolder.module.css';
import { getLikes } from '@/utils/getLikes';
import { UserContext } from '../context/UserProvider';
import { sendEventToRelay, formAndSignEvent } from '@/utils';
import constants from '@/styles/constants';

function IconHolder({ recipe }) {
  const { publicKey, privateKey } = React.useContext(UserContext)
  const { likes, isLikedByUser, eose } = getLikes(recipe.id, publicKey)
  const [isLiked, setIsLiked] = React.useState(false)
  const [isBookmarked, setIsBookmarked] = React.useState(false)
  const isZapped = false

  React.useEffect(() => {
    if (eose) {
      setIsLiked(isLikedByUser);
    }
  }, [eose, isLikedByUser]);

  function likeHandler(privateKey) {
    if (privateKey === '') {
      window.alert('Sign in first')
      return
    } else {
      try {
        sendEventToRelay(formAndSignEvent(privateKey, 7, '+', [['e', `${recipe.id}`], ['p', `${recipe.pubkey}`]]))
        console.log('success')
      } catch (error) {
        console.error(error)
      }
    }
  }

  function bookmarkHandler(privateKey) {
    if (privateKey === '') {
      window.alert('Sign in first')
      return
    } else {
      try {
        sendEventToRelay(formAndSignEvent(privateKey, 30001, '', [['d', 'Cookstr Bookmarks'], ['e', `${recipe.id}`], ['p', `${recipe.pubkey}`]]))
      } catch (error) {
        console.error(error)
      }
    }
  }


  return (
    <div className={styles.wrapper}>

      <div cursor='pointer' className={styles.likes} >{likes}</div>

      <button
        className={`${styles.iconWrapper} ${isLiked ? styles.filled : null}`}
        onClick={() => {
          setIsLiked(!isLiked)
          likeHandler(privateKey)
        }}
      >
        <Heart className={styles.icon} />
      </button>

      <button
        onClick={() => {
          setIsBookmarked(true)
          bookmarkHandler(privateKey)
        }}
        className={`${styles.iconWrapper} ${false ? styles.filled : null}`}
      >
        <Bookmark
          fill={
            isBookmarked ?
              constants.backgroundTangerine :
              constants.teaAccent
          }
        />
      </button>

      <button
        disabled
        className={`${styles.iconWrapper} ${isLiked ? styles.filled : null}`}
      >
        <Zap
          fill={
            isZapped ?
              constants.backgroundYellow :
              constants.teaAccent
          }
          className={styles.icon}
        />
      </button>

      <button
        disabled
        className={styles.iconWrapper}
      >
        <Share className={styles.icon} />
      </button>

    </div >

  );
}



export default IconHolder;

import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import React from 'react'
import { formAndSignEvent, sendEventToRelay } from '@/utils';




export default function Home() {
  const [pkey, setPkey] = React.useState('5463aeaacb9b172b66f94d9928bf9d1e806b61ad346c169a3e76aaf814992b60');
  const [content, setContent] = React.useState('');

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.page} >


        <div>
          <form onSubmit={(e) => {
            e.preventDefault()

            sendEventToRelay(formAndSignEvent(pkey, 1, content))
          }} >
            <label htmlFor="pkey">
              pkey:
            </label>
            <input
              type='number'
              id="pkey"

              value={pkey}
              onChange={event => {
                setPkey(event.target.value);
              }}
            />
            <label htmlFor="content">
              content:
            </label>
            <input
              id="content"
              value={content}
              onChange={event => {
                setContent(event.target.value);
              }}
            />
            <button>
              send
            </button>
          </form>
          {/* <p>
            <h3>key:</h3>
            {pkey || '(empty)'}
          </p>
          <p>
            <h4>Content:</h4>
            {content || '(empty)'}
          </p> */}
          {/* <p>
            <h5>is_ok:</h5>
            {event ? `yes` : 'not ok'}
          </p> */}
        </div>
      </div >
    </>
  )
}

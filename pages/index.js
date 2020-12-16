import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Card from '../components/card'

export default function Home() {
  return (
    <div >
      <Head>
        <title>Names in hat</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 >
          Теглене на имена за подаръци за коледа!
        </h1>

       
         <Card/>

       
      </main>

      
    </div>
  )
}

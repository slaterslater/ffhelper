import Head from 'next/head'
import useSWR from 'swr'
import Headlines from '../components/Headlines';
import Footer from '../components/Footer';
import styled from 'styled-components';

export default function Home() {

  const PlayerNews = () => {
    const fetcher = (url) => fetch(url).then((r) => r.json())
    const API = process.env.NEXT_PUBLIC_API
    const { data: news, error } = useSWR(API, fetcher)
    if (error) return <p className='attention'>failed to load...</p>
    if (!news) return <p className='attention'>loading headlines...</p>
    return <Headlines data={news} />
  }

  return (
    <div>
      <Head>
        <title>NFL Fantasy Football</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{padding:'5px'}}>
        <h1 style={{position:'absolute', left:'-999em'}}>Football Headlines</h1>
        <PlayerNews />
      </main>
      <Footer />
    </div>
  )
}

import React from 'react'
import Main from '../components/Main'
import Row from '../components/Row'
import requests from '../Requests'
const Home = () => {
  return (
    <>
        <Main/>
        <Row title='Popular' fetchURL={requests.requestPopular} />
        <Row title='Top Rated' fetchURL={requests.requestTopRated} />
        <Row title='Trending' fetchURL={requests.requestTrending} />
        <Row title='Upcoming' fetchURL={requests.requestUpcoming} />
    </>
  )
}

export default Home
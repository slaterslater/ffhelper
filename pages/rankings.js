import { useEffect, useState } from "react"
import parse from 'html-react-parser';
import dayjs from "dayjs"
import weekOfYear from 'dayjs/plugin/weekOfYear'
import styled from "styled-components";
dayjs.extend(weekOfYear)

const RankingPageStyles = styled.div`
  display:flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1130px;
  margin: 0 auto;
  h2 {
    width: 100%;
    text-align: center;
  }
`

const PositionStyles = styled.div`
  width: 350px;
  h3 {
    margin-top: 15px;
  }
  ol {
    background-color: white;
    border: 1px solid lightslategray;
    border-radius: 8px;
    padding: 15px 0 15px 40px;
    box-shadow: 5px 10px 18px #888888;
  }
  li {
    padding: 2px 0 2px 5px;
  }
  li:nth-child(odd){
    background-color: lightgrey;
  }
  li::marker {
    font-weight: bold;
  }
  li:nth-of-type(1n+51) {
    display: none;
} 
`

const PositionNav = styled.nav`
  width:100%;
  ul {
    display: flex;
    justify-content: space-evenly;
    margin:0;
    padding:0;
    list-style-type: none;
    
  }
  li {

  }
  a {
    color: var(--default);
    text-decoration: none;
  }
`

export default function Rankings() {
  const [week, setWeek] = useState('')
  const [rankings, setRankings] = useState([])
  const positions = [
    'quarterbacks',
    'tight-ends',
    'defenses',
    'running-backs',
    'wide-receivers',
    'flex',
    // 'kickers',
  ]
  const heading = text => text.replace('-',' ').toUpperCase()
  const loading = rankings.error ? `unable to load ${week}` : `loading`

  useEffect(()=>{
    const season = dayjs('2021-09-08')
    const now = dayjs()
    const current_week_num = (now.day() < 3) ? now.week() - 1 : now.week()
    const season_week_num = current_week_num - season.week() + 1
    const date = season.week(current_week_num).format('YYYY/MM/DD')
    const urls = positions.map(position => (
      `${process.env.NEXT_PUBLIC_RANKING_DOMAIN}/${date}/week-${season_week_num}-rankings-${position}`)
    )
    fetch('/api/player_rankings', {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ urls }),
    })
      .then(res => res.json())
      .then(data => { 
        setRankings(data)
        setWeek(`week ${season_week_num}`)
      })
  },[])

  return (
    <RankingPageStyles>
      {/* <PositionNav>
        <ul>
          {positions.map(position => (
            <li key={'nav' + position}><a href={'#' + position}>{heading(position)}</a></li>
          ))}
        </ul>
      </PositionNav> */}
      {rankings.results 
        ? <>
            <h2>{week} Player Rankings</h2>
            {positions.map(position => {
            const html = rankings.results.find(ranking => (
              ranking[0].includes(heading(position))
            ))
            return (
              <PositionStyles id={position} key={'ranking-' + position}>
                {parse(html[0])}
                {parse(html[1])}
              </PositionStyles>
            )})}
          </>    
        : <p className='attention'>{loading} player rankings...</p>
      }
    </RankingPageStyles>
  )
}

import { useEffect, useState } from "react"
import parse from 'html-react-parser';
import dayjs from "dayjs"
import weekOfYear from 'dayjs/plugin/weekOfYear'
dayjs.extend(weekOfYear)

export default function Rankings() {
  
  const [rankings, setRankings] = useState([])
  const positions = [
    'quarterbacks',
    'running-backs',
    'wide-receivers',
    'tight-ends',
    'defenses',
    'flex',
    'kickers',
  ]
  const heading = text => text.replace('-',' ').toUpperCase()

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
      })
  },[])

  return (
    <>
      <nav>
        <ul>
          {positions.map(position => (
            <li key={'nav' + position}><a href={'#' + position}>{heading(position)}</a></li>
          ))}
        </ul>
      </nav>
      {rankings.results 
        ? positions.map(position => {
            const html = rankings.results.find(ranking => (
              ranking[0].includes(heading(position))
              // ranking[0].includes(position.replace('-',' ').toUpperCase())
            ))
            return (
              <div id={position} key={'ranking-' + position}>
                {parse(html[0])}
                {parse(html[1])}
              </div>
          )}) 
      : <p>loading player rankings...</p>
      }
    </>
  )
}

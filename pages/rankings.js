import { useEffect, useState } from "react"
import dayjs from "dayjs"
import weekOfYear from 'dayjs/plugin/weekOfYear'
dayjs.extend(weekOfYear)

export default function Rankings() {
  
  const [rankings, setRankings] = useState([])

  useEffect(()=>{
    const positions = [
      'quarterbacks',
      'running-backs',
      'wide-receivers',
      'tight-ends',
      'flex',
      'kickers',
      'defenses',
    ]
    const season = dayjs('2021-09-08')
    const now = dayjs()
    const current_week_num = (now.day() < 3) ? now.week() - 1 : now.week()
    const season_week_num = current_week_num - season.week() + 1
    const date = season.week(current_week_num).format('YYYY/MM/DD')
    const urls = positions.map(position => process.env.NEXT_PUBLIC_RANKING_URL)
    fetch('/api/player_rankings', {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ urls }),
    })
      .then(res => res.json())
      .then(data => { 
        console.log(data)
        setRankings(data)
      })
  },[])

  return <p>Rankings</p>
}

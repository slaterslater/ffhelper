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
  /* li:nth-of-type(1n+29) { */
  li:nth-of-type(1n+${props => props.listLen}) {
    display: none;
  } 
`

// const PositionNav = styled.nav`
//   width:100%;
//   ul {
//     display: flex;
//     justify-content: space-evenly;
//     margin:0;
//     padding:0;
//     list-style-type: none;
    
//   }
//   a {
//     color: var(--default);
//     text-decoration: none;
//   }
// `

export default function Rankings() {
  const [week, setWeek] = useState('')
  const [data, setData] = useState(null)
  const [msg, setMsg] = useState('loading...')
  const [len, setLen] = useState(0)
  const positions = [
    'quarterbacks',
    'tight-ends',
    'defenses',
    'running-backs',
    'wide-receivers',
    'flex',
    // 'kickers',
  ]
  const heading = text => text.replace('-',' ').replace(/s$/,'').toUpperCase()

  useEffect(()=>{
    const season = dayjs('2021-09-08')
    const now = dayjs()
    const current_week_num = (now.day() < 3) ? now.week() - 1 : now.week()
    const season_week_num = current_week_num - season.week() + 1    
    const date = season.week(current_week_num).format('YYYY/MM/DD')
    const urls = positions.map(position => (
      `${process.env.NEXT_PUBLIC_RANKING_DOMAIN}/${date}/week-${season_week_num}-football-rankings-${position}`)
    )
    // console.log(urls)
    fetch('/api/player_rankings', {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ urls }),
    })
      .then(res => res.json())
      .then(json => { 
        if (json.error || json.results.includes(null)) {
          setMsg(`Week ${season_week_num} player rankings unavailable at this time`)
          return
        }
        // find the fewest number of <li> and setLen
        const max_list_length = json.results.reduce((max, rank) => {
          max = Math.min(max, rank[1].match(/<\/li>/g).length);
          return max
        },100)
        setLen(max_list_length + 1)
        setData(json.results)
        setWeek(`week ${season_week_num}`)
      })
  },[])

  console.log(len)

  return (
    <RankingPageStyles>
      {data 
        ? <>
            <h2>{week} Player Rankings</h2>
            {positions.map(position => {
              const html = data.find(arr => {
                return arr.some(elem => elem.includes(heading(position)))
              })
              return (
                <PositionStyles id={position} key={'ranking-' + position} listLen={len}>
                  {parse(html[0])}
                  {parse(html[1])}
                </PositionStyles>
              )
            })}
          </>    
        : <p className='attention'>{msg}</p>
      }
    </RankingPageStyles>
  )
}

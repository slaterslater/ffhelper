import parse from 'html-react-parser';
import dayjs from 'dayjs';
import styled from 'styled-components';
import "@fontsource/inter";

const HeadlineStyles = styled.div`
  border-top: 2px solid black;
  max-width: 650px;
  margin:0 auto;
  margin-bottom: 15px;
  font-family: Helvetica, sans-serif;
  font-size: 16px;
  color: #3c4043;
  #player-profile {
    background-color: #F7F7F7;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    h2, h3 {
      margin: 0;
      padding: 0;
      text-transform: uppercase;
    } 
    h2 {
      font-weight: 600;
      font-size: 20px;
    }
    h3 {
      font-weight: 550;
      font-size: 16px;
    } 
    div {
      padding-left:10px;
    }
  }
  img {
    height: 100px;
  }
  .mugshot {
    margin-left: auto;
  }
  @media (max-width:450px){
    img {
      height: 65px;
    }
    #player-profile h2 {
      font-size: 16px;
    }
    #player-profile h3 {
      font-size: 13px;
    }
    font-size: 15px;
  }
`

const ContentSyles = styled.div`
display: flex;
flex-direction: column;
line-height: 1.35;
/* margin-top: 15px; */
p {
  margin-bottom: 0;
}
.title {
  font-weight: 550;
}
.content {
  /* text-align:justify; */
}
.date {
/* margin-left: auto;
margin-top: 8px; */
/* margin: 8px 3px 0 auto; */
margin-top:2px;
font-size: 13px;
font-weight: 550;
font-style: italic;
}
`


export default function Headlines({data}) {
  // console.log(data)
  return (
    <>
    {data.data.map(item => {
      const { headline, news: title, analysis, changed} = item.attributes
      // player
      const player_id = item.relationships.player.data.id
      const player_data = data.included.find(player => player.id == player_id)
      const player_image_id = player_data.relationships.image.data.id
      const position_id = player_data.relationships.position.data.id
      const player_name = player_data.attributes.name
      // image
      const player_image_url = data.included.find(image => image.id == player_image_id).attributes.uri.url
      // team
      const team_id = item.relationships.team.data.id
      const team_data = data.included.find(team => team.id == team_id)
      const team_image_id = team_data.relationships.secondary_logo.data.id
      const team_name = team_data.attributes.name
      const team_color = team_data.attributes.color
      const team_image_url = data.included.find(image => image.id == team_image_id).attributes.uri.url
      // position
      const position_abbr = data.included.find(position => position.id == position_id).attributes.abbreviation
      // console.log({team_data})

      const Img = ({src: url, desc, cname}) => <img src={process.env.NEXT_PUBLIC_EXTERNAL_SRC + url} alt={desc} className={cname} />
      const Content = ({title, content, date}) => (
        <ContentSyles>
          <div className="title">{parse(title.processed)}</div>
          <div className="content">{content && parse(content.processed)}</div>
          <div className="date">{dayjs(date).format('MMM DD, h:mm A')}</div>
        </ContentSyles>
      )

      return (
        <HeadlineStyles key={item.id} style={{ borderColor: '#' + team_color }}>
          <div id="player-profile">
            <Img cname="logo" src={team_image_url} alt={`${team_name} logo`} />
            <div>
              <h2>{player_name}</h2>
              <h3>{position_abbr} {team_name}</h3>
            </div>
            <Img cname="mugshot" src={player_image_url} alt={`${player_name}`} />
          </div>
          <Content title={title} content={analysis} date={changed} />
        </HeadlineStyles>
      )
    }
    )}
    </>
  )
}
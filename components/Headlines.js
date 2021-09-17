import parse from 'html-react-parser';
import styled from 'styled-components';
import "@fontsource/inter";

const HeadlineStyles = styled.div`
  max-width: 650px;
  margin:0 auto;
  margin-bottom: 25px;
  #player-profile {
    border-top: 2px solid black;
    background-color: var(--grey);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    div {
      padding-left: 10px;
      margin-left: -15px;
      background-color:var(--grey);
      height: 100px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
  img {
    height: 100px;
    /* color: #FFF; */
  }
  .logo {
    width: 125px;
  }
  .mugshot {
    margin-left: auto;
  }
  @media (max-width:450px){
    img {
      height: 65px;
    }
    .logo {
      width: 82px;
    }
    #player-profile div {
      height: 65px;
      margin-left: -10px;
    }
  }
`

const ContentSyles = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.35;
  p {
    margin-bottom: 0;
    margin-top: 10px;
  }
  .title {
    font-weight: 550;
  }
  .content {
    /* text-align:justify; */
  }
  .date {
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
      const player_image_id = player_data.relationships.image.data?.id || null
      const position_id = player_data.relationships.position.data.id
      const player_name = player_data.attributes.name
      // image
      const player_image_url = player_image_id 
        ? data.included.find(image => image.id == player_image_id).attributes.uri.url 
        : process.env.NEXT_PUBLIC_DEFAULT_PLAYER
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
      const Img = ({src: url, alt: desc, bg: color, cname}) => (
        <img src={process.env.NEXT_PUBLIC_NEWS_DOMAIN + url} 
          alt={desc} 
          style={{color:`#${color}`, backgroundColor:`#${color}`}} 
          className={cname} 
        />
      )
      const Content = ({title, content, date}) => (
        <ContentSyles>
          <div className="title">{parse(title.processed)}</div>
          <div className="content">{content && parse(content.processed)}</div>
          {/* <div className="date">{dayjs(date).format('MMM DD, h:mm A')}</div> */}
        </ContentSyles>
      )

      return (
        <HeadlineStyles key={item.id}>
          <div id="player-profile" style={{ borderColor: '#' + team_color }}>
            <Img cname="logo" src={team_image_url} bg={team_color} alt={`${team_name} logo`} />
            <div>
              <h2>{player_name}</h2>
              <h3>{position_abbr} &bull; {team_name}</h3>
            </div>
            <Img cname="mugshot" src={player_image_url} alt={`${player_name}`} />
          </div>
          <Content title={title} content={analysis} date={changed} />
        </HeadlineStyles>
      )
    })}
    </>
  )
}
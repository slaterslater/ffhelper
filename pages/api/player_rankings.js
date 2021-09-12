// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async (req, res) => {
  // const qb_url = 'https://www.si.com/fantasy/2021/09/08/week-1-rankings-quarterbacks'
  // const response = await fetch(qb_url)
  // const htmlString = await response.text()
  
  if (req.method === 'POST') {
    const urls = req.body.urls
    try {
      let results = []
      const scrape = async url => {
        const response = await fetch(url)
        const htmlString = await response.text()
        const ranking = htmlString.match(/(<h3>.*<\/h3>|<ol>.*<\/ol>)/g)
        results.push(ranking)
      }
      Promise.all(urls.map(url => scrape(url)))
        .then(() => { res.status(200).json({ rankings: results })
      });
    } catch (e) {
      res.status(400).json({ error: `could not fetch data...` })
    }
  }

}

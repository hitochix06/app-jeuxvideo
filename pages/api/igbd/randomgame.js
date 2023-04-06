//recupere un jeu aleatoire


export default async function handler(req, res) {
 const url = 'https://api.igdb.com/v4/games';
 const options = {
   method: 'POST',
   headers: {
     'Client-ID': process.env.IGDB_CLIENT_ID,
     'Authorization': `Bearer ${process.env.IGDB_ACCESS_TOKEN}`,
   },
   body: `fields name, slug, cover.url ; limit ${req.query.nb}; where rating != null & cover != null;`,
 };

 const response = await fetch(url, options);
 const data = await response.json();

 res.status(200).json(data);
}

//https://api-docs.igdb.com/#games
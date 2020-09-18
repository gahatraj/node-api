const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

// app.get()
// app.post()
// app.put()
// app.delete()

const players = [
    {id: 1, name: 'Kepa Arrizabalaga', team:'Chelsea', position:'Goalkeeper', jersey:1},
    {id: 2, name: 'Antonio Rudiger', team:'Chelsea', position:'Defender', jersey:2},
    {id: 3, name: 'Marcos Alonso', team:'Chelsea', position:'Defender', jersey:3},
    {id: 4, name: 'Andreas Christensen', team:'Chelsea', position:'Defender', jersey:4},
    {id: 5, name: 'Kurt Zouma', team:'Chelsea', position:'Defender', jersey:15},
    {id: 6, name: 'Reece James', team:'Chelsea', position:'Defender', jersey:24},
    {id: 7, name: 'Cesar Azpilicueta', team:'Chelsea', position:'Defender', jersey:28},
    {id: 8, name: 'Fikayo Tomori', team:'Chelsea', position:'Defender', jersey:14},
    {id: 9, name: 'Emerson', team:'Chelsea', position:'Defender', jersey:33},
    {id: 10, name: 'Ben Chilwell', team:'Chelsea', position:'Defender', jersey:21},
    {id: 11, name: 'Thiago Silva', team:'Chelsea', position:'Defender', jersey:6},
    {id: 12, name: 'Juan Castillo', team:'Chelsea', position:'Defender', jersey:0},
    {id: 13, name: 'Hakim Ziyech', team:'Chelsea', position:'Midfielder', jersey:22},
    {id: 14, name: 'Jorginho', team:'Chelsea', position:'Midfielder', jersey:5},
    {id: 15, name: 'Kante', team:'Chelsea', position:'Midfielder', jersey:7},
    {id: 16, name: 'Ross Barkley', team:'Chelsea', position:'Midfielder', jersey:8},
    {id: 17, name: 'Ruben Loftus-Cheek', team:'Chelsea', position:'Midfielder', jersey:12},
    {id: 18, name: 'Mateo Kovacic', team:'Chelsea', position:'Midfielder', jersey:17},
    {id: 19, name: 'Mason Mount', team:'Chelsea', position:'Midfielder', jersey:19},
    {id: 20, name: 'Christian Pulisic', team:'Chelsea', position:'Midfielder', jersey:10},
    {id: 21, name: 'Billy Gilmour', team:'Chelsea', position:'Midfielder', jersey:23},
    {id: 22, name: 'Kai Havertz', team:'Chelsea', position:'Midfielder', jersey:29},
    {id: 21, name: 'Timo Werner Gilmour', team:'Chelsea', position:'Forward', jersey:11},
    {id: 21, name: 'Tammy Abraham', team:'Chelsea', position:'Forward', jersey:9},
    {id: 21, name: 'Olivier Giroud', team:'Chelsea', position:'Forward', jersey:18},
    {id: 21, name: 'Gallum Huson Odoi', team:'Chelsea', position:'Forward', jersey:20},
    {id: 21, name: 'Willy Caballero', team:'Chelsea', position:'Goalkeeper', jersey:13}
]



app.get('/', (req, res)=>{
    res.send('Hello World');
})

app.get('/api/players',(req, res)=>{
    res.send(players)
})

// req.params to get parameter
// req.query to get queries
app.get('/api/players/:id', (req, res)=>{
    const player = players.find( c => c.id === parseInt(req.params.id))
    if(!player) res.status(404).send('The player with the given ID was not found')
    res.send(player);
})

//Hadling POST Request

// POST request without using JOI
// app.post('/api/players', (req, res) =>{
//     //input validation
//     if(!req.body.name || req.body.name.lengh < 3){
//         //400 Bad Request
//         res.status(400).send('Name is required and should be minimum 3 character');
//         return;
//     }
//     const player = {
//         id: players.length + 1,
//         name: req.body.name
//     };
//     players.push(player);
//     res.send(players);
// });

//with JOI
app.post('/api/players', (req, res)=>{
    //Validate
    //const result = validateplayer(req.body)

    //object destructring, you define the objects from the
    // response as variables
    const { error } = validateplayer(req.body);
    //If invalid, return 400 - Bad request
    if(error) return res.status(400).send(result.error.message)
    
    newplayer = {
        id : players.length + 1,
        name: req.body.name
    }

    players.push(newplayer)
    res.send(players)
})


//Handling POST request to update record
app.put('/api/players/:id', (req, res) =>{
    //Look up the player
    const player = players.find(c => c.id === parseInt(req.params.id))
    //If not existing, return 404
    if(!player){
        res.status(400).send('The given player is not found.')
        return;  
    }
    //Validate
    //const result = validateplayer(req.body)

    //object destructring, you define the objects from the
    // response as variables
    const { error } = validateplayer(req.body);
    //If invalid, return 400 - Bad request
    if(error){
        res.status(400).send(result.error.message)
        return;
    }
    //Update player
    player.name = req.body.name
    //Return the updated player
    res.send(players);

})

validateplayer = (player)=>{
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })
    return schema.validate(player)
}

//Delete
app.delete('/api/players/:id', (req, res) =>{
  //Look up the player id
  const player = players.find(c => c.id === parseInt(req.params.id) )
  if(!player){
    res.status(400).send('The player is not found')
    return;
  }  

  //Delete
  const index = players.indexOf(player)
  players.splice(index, 1)

  res.send(player);





})

//PORT is an environment variable
//We can set PORT value in the environment variable and use that to run the app on
const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`listening on port ${port}..`)
})
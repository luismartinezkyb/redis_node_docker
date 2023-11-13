import express from 'express';
import responseTime from 'response-time';
import { clientRedis } from './redis/redis.config.js';


const app = express();

const PORT = 3000;


// app.use('/api/v1/character', app.route);
app.use(responseTime());
app.get('/character', async(req, res) => {
  try {
    const characters = await clientRedis.get('characters');
    if(characters){
      return res.json({data:JSON.parse(characters), status: 200, message: 'Success from redis'})
    }
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    
    await clientRedis.set('characters', JSON.stringify(data))
    res.json({data, status: 200, message: 'Success'})
    
  } catch (error) {
    console.log(error)
    res.status(401).json({
      status: 401,
      message: 'Error on request character '+error.message
    });
  }
})

app.listen(PORT, ()=>{
  console.log(`app listening on url: http://localhost:${PORT}`)
})

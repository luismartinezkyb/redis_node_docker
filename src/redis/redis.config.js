import {createClient} from 'redis'

export const clientRedis = await createClient({
  host: '127.0.0.1',
  port: 6379
})
.on('error', err=>console.log('Redis Client Error'))
.connect();
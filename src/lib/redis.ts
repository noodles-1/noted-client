import { createClient } from "redis";
import { RedisConnection } from "redis-om";

declare global {
    var redisClient: RedisConnection
}

export let client: RedisConnection

if (process.env.NODE_ENV === 'development') {
    if (!global.redisClient) {
        global.redisClient = createClient({
            url: process.env.REDIS_URL
        })
        if (!global.redisClient.isOpen)
            global.redisClient.connect()
        client = global.redisClient
    }

    client = global.redisClient
}
else {
    client = createClient({
        url: process.env.REDIS_URL
    })

    if (!client.isOpen)
        client.connect()
}
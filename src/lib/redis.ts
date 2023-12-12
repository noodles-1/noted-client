import { createClient } from 'redis';

export const client = createClient({
    password: process.env.REDIS_PW,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : undefined
    }
});

client.on('error', (err) => console.log(err))

if (!client.isOpen)
    client.connect()
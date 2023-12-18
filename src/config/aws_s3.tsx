import AWS from 'aws-sdk'

export const s3 = new AWS.S3({
    apiVersion: process.env.NEXT_PUBLIC_AWS_API_VERSION,
    region: process.env.NEXT_PUBLIC_AWS_REGION,
    credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY as string
    }
})
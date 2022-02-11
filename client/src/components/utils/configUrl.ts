const prod = 'https://2wutza4963.execute-api.us-east-1.amazonaws.com/prod'
const dev = 'http://localhost:8000'

export const configUrl = process.env.NODE_ENV === 'development' ? dev : prod

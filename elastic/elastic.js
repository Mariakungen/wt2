import { Client } from '@elastic/elasticsearch'

async function elasticClient(){
const Client = new Client ({
    cloud: {
    id: process.env.ID
    },
      auth: {
        username: process.env.USERNAME,
        password: process.env.PASSWORD
      }
})

return client
}


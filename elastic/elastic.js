import { Client } from '@elastic/elasticsearch'

async function elasticClient() {
  console.log('auth')
  const client = new Client({
    cloud: {
      id: process.env.ID
    },
    auth: {
      username: process.env.ES_USERNAME,
      password: process.env.PASSWORD
    }
  })

  return client
}




export async function query(req, res) {
  try {
    console.log('före')
    const client = await elasticClient()
    console.log('efter')
    let data = []
    const searchResult = await client.search({
      index: 'choclate',
      body: {
        "aggs": {
          "Terms": {
            "terms": {
              "field": "Cocoa\nPercent"
            },
            "aggs": {
              "aafd": {
                "avg": {
                  "field": "Rating"
                }
              }
            }
          }
        }
      }
      })
      console.log(searchResult)
      console.log(searchResult.aggregations.Terms.buckets)
    } catch (error) {
      console.log(error.message)
    }

  }

import { Client } from '@elastic/elasticsearch'

export default async function handler(req, res) {
  const client = elasticClient()
  const cocoaData = await query()
  
  res.status(200).json({ cocoaData })
 
}
async function elasticClient() {
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
    const client = await elasticClient()
    let data = []
    const searchResult = await client.search({
      index: 'choclate',
      body: {
        "aggs": {
          "Terms": {
            "terms": {
              "field": "Cocoa\nPercent",
              "order": {
                "_key":"desc"
              },
              "size": 50
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
      var cocoaElasticData = searchResult.aggregations.Terms.buckets
     return cocoaElasticData
     // 
    // console.log(cocoaElasticData, 'testing')
    } catch (error) {
      console.log(error.message)
    }

  }
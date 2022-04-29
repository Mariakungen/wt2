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
                  "range": {
                  "field": "Rating",
                  "ranges": [
                    {"key": "1 to 2",
                      "from": 1.00,
                     "to": 2.00
                    },
                    {"key": "2 to 3",
                      "from": 2.00, 
                    "to": 3.00
                  },
                    {"key": "3 to 4",
                      "from": 3.00, 
                    "to": 4.00
                  },  
                  ]
                }
              }
              }
            }
          }
        }
      }
      })

      // https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-range-aggregation.html
      // Histogram fields för strängar också??
      var cocoaElasticData = searchResult.aggregations.Terms.buckets
      console.log(cocoaElasticData, 'testing')
     return cocoaElasticData
   
    } catch (error) {
      console.log(error.message)
    }

  }
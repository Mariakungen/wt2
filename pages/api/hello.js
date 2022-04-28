// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Client } from '@elastic/elasticsearch'

export default async function handler(req, res) {
  const client = elasticClient()
  const cocoaData = query()
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
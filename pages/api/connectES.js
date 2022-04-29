import { Client } from '@elastic/elasticsearch'
import babel from 'next/babel' 
/**
 * Authorisation to elasticsearch, make queries and returns to index.js.
 *
 * @author Maria Olsson
 * @version 1.0.0
 */

/**
 * Calls functions for authentication from elasticsearch to end up with the result from the search.
 */
export default async function ConnectToElastic(req, res) {
  elasticAuth()
  const cocoaData = await query()
  res.status(200).json({ cocoaData })
}

/**
 * Handles the auth data to elasticsearch and its deployment .
 */
async function elasticAuth() {
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

/**
 * Makes query and returns the result.
 */
export async function query(req, res) {
  try {
    const client = await elasticAuth()
    const result = await client.search({
      index: 'choclate',
      body: {
        "aggs": {
          "Terms": {
            "terms": {
              "field": "Cocoa\nPercent",
              "order": {
                "_key": "asc"
              },
              "size": 50
            },
            "aggs": {
              "barrating": {
                "avg": {
                  "field": "Rating"
                }
              }
            }
          }
        }
      }
    })
    var cocoaElasticData = result.aggregations.Terms.buckets
    return cocoaElasticData

  } catch (error) {
    console.log(error.message)
  }

}
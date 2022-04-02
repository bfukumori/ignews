import * as prismic from '@prismicio/client'
import sm from '../../sm.json'

export const endpoint = sm.apiEndpoint

export function createClient(req?: any) {
  const client = prismic.createClient(endpoint, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,

  })
  return client
}

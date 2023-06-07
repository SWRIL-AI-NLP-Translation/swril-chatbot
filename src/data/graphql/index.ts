import { GraphQLClient } from '../../modules/http'

const endpoint = process.env.API_URL + '/graphql'
if (!process.env.API_URL) throw new Error('API_URL is not defined')
export const graphql = new GraphQLClient(endpoint)


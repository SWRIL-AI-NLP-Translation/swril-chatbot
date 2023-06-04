import { GraphQLClient } from "../../modules/http";

const production = true;

const productionEndpoint = 'https://api.swril.ca';
const devEndpoint = 'http://localhost:8080';

const endpoint = (production ? productionEndpoint : devEndpoint) + '/graphql';
export const graphql = new GraphQLClient(endpoint);


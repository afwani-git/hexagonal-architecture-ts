import { ApolloServer } from 'apollo-server';
import { BootsrapingServer } from '../BootstrapingServer';

import { typeDefs } from './Schema';
import { resolvers   } from './Resolver';


export class GraphqlServer implements BootsrapingServer{

    private server: ApolloServer

    constructor(
    ){ 

        this.server = new ApolloServer({
            typeDefs,
            resolvers
        });
    }

    async initServer(){
        await this.server.listen(8081);

        console.log('graphql connected');
    }
}

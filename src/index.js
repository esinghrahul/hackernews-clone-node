const {GraphQLServer} = require('graphql-yoga')

let Links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'full stack tutorial of using graphql'
}]

let idCount = Links.length

const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews clone`,
        feed: () => Links,
    },
    Mutation: {
        post: (parent, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url
            }
            Links.push(link)
            return link
        }
    },
    Link: {
        id: (parent) => parent.id,
        description: (parent) => parent.description,
        url: (parent) => parent.url,
    }
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
})

server.start(()=> console.log('Server is running on http://localhost:4000'))

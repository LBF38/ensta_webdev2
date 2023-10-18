export const typeDefs = `#graphql
#Comments in GraphQL (such as this one) start with the hash (#) symbol.
type Person {
    id: ID!
    name: String!
    age: Int!
}
type Post {
    id: ID!
    title: String!
}
type Query {
    people: [Person]
    posts: [Post]
    post(id: ID!): Post
    person(id: ID!): Person
}
`

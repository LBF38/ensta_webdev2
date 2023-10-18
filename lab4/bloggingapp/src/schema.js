export const typeDefs = `#graphql
#Comments in GraphQL (such as this one) start with the hash (#) symbol.
type Person {
    id: ID!
    name: String!
    age: Int!
    posts: [Post!]!
}
type Post {
    id: ID!
    title: String!
    author: Person!
}
type Query {
    people: [Person]
    posts: [Post]
    post(id: ID!): Post
    person(id: ID!): Person
}
type Mutation {
    addPerson(person: AddPersonInput!): Person
}
input AddPersonInput {
    name: String!
    age: Int!
}
`

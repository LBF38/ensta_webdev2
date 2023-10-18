import db from "./db.js";
export const resolvers = {
    Query: {
        people: () => db.people,
        posts: () => db.posts,
        post: (_, args) => db.posts.find(post => post.id === args.id),
        person: (_, args) => db.people.find(person => person.id === args.id),
    },
};

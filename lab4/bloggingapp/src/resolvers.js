import db from "./db.js";
export const resolvers = {
    Query: {
        people: () => db.people,
        posts: () => db.posts,
        post: (_, args) => db.posts.find(post => post.id === args.id),
        person: (_, args) => db.people.find(person => person.id === args.id),
    },
    Post: {
        author: (parent) => db.people.find((person) => person.id ===
            parent.author_id)
    },
    Person: {
        posts: (parent) => db.posts.filter((post) => post.author_id ===
            parent.id)
    },
    Mutation: {
        addPerson: (_, args) => {
            const newPerson = {
                ...args.person, id:
                    (parseInt(db.people[db.people.length - 1].id) + 1).toString()
            };
            db.people.push(newPerson);
            return newPerson;
        }
    }
};

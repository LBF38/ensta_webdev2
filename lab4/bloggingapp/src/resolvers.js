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
        },
        updatePerson: (_, args) => {
            db.people = db.people.map((person) => {
                if (person.id === args.id)
                    return { ...person, ...args.modifiedPerson };
                else return person;
            });
            return db.people.find((person) => person.id === args.id);
        },
        deletePerson: (_, args) => {
            db.people = db.people.filter((person) => person.id !==
                args.id);
            db.posts = db.posts.filter((post) => post.author_id !==
                args.id);
            return db.people;
        }
    }
};

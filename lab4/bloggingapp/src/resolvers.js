import db from "./db.js";
import { PubSub } from 'graphql-subscriptions';
const pubsub = new PubSub();

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
            parent.id),
    },
    Mutation: {
        addPerson: (_, args) => {
            const newPerson = {
                ...args.person, id:
                    (parseInt(db.people[db.people.length - 1].id) + 1).toString()
            };
            db.people.push(newPerson);
            pubsub.publish('PERSON_ADDED', { personAdded: newPerson });
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
        },
        addPost: (_, args) => {
            console.log(args);
            if (db.people.find((people) => people.id === args.post.authorId) === undefined) throw new Error("Author does not exist"); // TODO: change it to a GraphQL error
            const newPost = {
                title: args.post.title, author_id: args.post.authorId, id:
                    (parseInt(db.posts[db.posts.length - 1].id) + 1).toString()
            };
            db.posts.push(newPost);
            return newPost;
        },
        modifyPost: (_, args) => {
            console.log(args);
            db.posts = db.posts.map((post) => {
                // ignore author_id if not in db.people
                if (post.id === args.id) {
                    let modifiedPost = args.modifiedPost;
                    if (db.people.find((people) => people.id === modifiedPost.authorId) !== undefined) {
                        modifiedPost = { ...modifiedPost, author_id: modifiedPost.authorId };
                    } else {
                        delete modifiedPost.authorId;
                    }
                    return { ...post, ...modifiedPost };
                }
                else return post;
            });
            return db.posts.find((post) => post.id === args.id);
        },
        deletePost: (_, args) => {
            db.posts = db.posts.filter((post) => post.id !==
                args.id);
            return db.posts;
        }
    },
    Subscription: {
        personAdded: {
            subscribe: () => pubsub.asyncIterator(['PERSON_ADDED']),
        },
    }
};

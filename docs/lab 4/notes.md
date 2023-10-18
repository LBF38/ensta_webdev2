# Lab 4 - GraphQL API (apollo server)

We create a simple GraphQL API using @apollo/server library.

- First simple query on People and Posts

![first simple query - People and Posts](image.png)

- Query variables
Add the possibility to get a post from id:

![query var](image-1.png)

- Add `person` query to get a person from `id`:

![person query var](image-2.png)

- `PostsFromAllAuthors`

![PostsFromAllAuthors](image-3.png)

- `PostTitleAuthorName`

![PostTitleAuthorName](image-4.png)

- Add a mutation to add people

![add mutation to add people](image-5.png)

=> verified by making a query on `people`
![check mutation result with query on people](image-6.png)

- Modify people info mutation

![modify people info mutation](image-7.png)

- Delete people mutation

=> we have the following current people
![current people in db](image-8.png)

=> we then delete one of them
![delete mutation](image-9.png)

=> we check the result
![check deletion](image-10.png)

The response of the delete mutation is the persons not deleted. And it correctly matches the check we made on the next query.

- Add mutation to add post

![add post mutation](image-11.png)

- Modify post mutation

=> current posts
![current posts](image-12.png)

=> let's modify the first post title
![modify post title](image-13.png)

=> let's modify the author of the first post
![modify author of first post](image-14.png)

- Delete post mutation

=> let's delete the first post
![delete first post](image-15.png)

- Subscriptions - addPeople

![addPeople example w/ subscriptions](image-16.png)

=> only one tab has a subscription opened
![subscriptions are related to client's instances](image-17.png)

=> add a new person on the other tab is still shown on the subscription
![add new person from other tab - subscription result](image-18.png)

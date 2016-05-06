#Model

 - Post
 - PostTopic
 - Publisher
 - Topic
 - User
 - UserPost
 - UserPublisher
 - UserRatingPost
 - UserTopic

#Controller

 - BookmarkController
 - FollowsController
 - LibraryController
 - PostsController
 - RatingsController
 - TopicsController
 - PagesController
 
#Requirements
 
 - CRUD Post
 - CRUD PostTopic
 - CRUD Publisher
 - CRUD Topic
 - CRUD User
 - CRUD UserPost (Bookmark)
 - CRUD UserPublisher (FollowPublisher)
 - CRUD UserRatingPost (Rating)
 - CRUD UserTopic (FollowTopic)

#UI

Timeline -> All Post
Email -> CRUD Post

#Issue

 - Post ada yang masih draft

#Table
| table name    | column name    | column type  |
| ------------- |:-------------| -----:|
| post_topics       | id               | int(11)      |
| post_topics       | post_id          | int(11)      |
| post_topics       | topic_id         | int(11)      |
| posts             | id               | int(11)      |
| posts             | title            | varchar(255) |
| posts             | content          | text         |
| posts             | rating           | float        |
| posts             | posted_at        | datetime     |
| posts             | image_url        | varchar(255) |
| posts             | publisher_id     | int(11)      |
| posts             | value            | int(11)      |
| posts             | active           | varchar(255) |
| publishers        | id               | int(11)      |
| publishers        | username         | varchar(255) |
| publishers        | password         | varchar(255) |
| publishers        | email            | varchar(255) |
| publishers        | token            | varchar(255) |
| publishers        | rating           | float        |
| publishers        | name             | varchar(255) |
| publishers        | description      | text         |
| publishers        | imageUrl         | varchar(255) |
| publishers        | perishable_token | text         |
| schema_migrations | version          | varchar(255) |
| topics            | id               | int(11)      |
| topics            | topic_number     | int(11)      |
| topics            | name             | varchar(255) |
| user_posts        | id               | int(11)      |
| user_posts        | user_id          | int(11)      |
| user_posts        | post_id          | int(11)      |
| user_publishers   | id               | int(11)      |
| user_publishers   | user_id          | int(11)      |
| user_publishers   | publisher_id     | int(11)      |
| user_rating_posts | id               | int(11)      |
| user_rating_posts | user_id          | int(11)      |
| user_rating_posts | post_id          | int(11)      |
| user_rating_posts | rating           | int(11)      |
| user_rating_posts | description      | text         |
| user_rating_posts | created_at       | datetime     |
| user_rating_posts | updated_at       | datetime     |
| user_topics       | id               | int(11)      |
| user_topics       | user_id          | int(11)      |
| user_topics       | topic_id         | int(11)      |
| users             | id               | int(11)      |
| users             | username         | varchar(255) |
| users             | password         | varchar(255) |
| users             | email            | varchar(255) |
| users             | name             | varchar(255) |
| users             | token            | text         |
| users             | perishable_token | text         |
| users             | value            | int(11)      |
| users             | imageUrl         | text         |
+-------------------+------------------+--------------+

 
 

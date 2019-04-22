# Keeping Up With the Javascripts - Part 1: ES6

## Homework #12: Object Oriented Programming

### What is object oriented programming, and why would you use it? As you may already know, many javascript projects are written using a functional, or event-driven design pattern. In which cases would an OOP pattern be a better choice?

Object-oriented Programming refers to a type of computer programming in which developers define not only the data type of a data structure, but also the types of operations that can be applied to the data structure.

In this way, the data structure becomes an object that includes both data and functions. In addition, developers can create relationships between one object and another. For example, objects can inherit characteristics from other objects.

One of the principal advantages of object-oriented pattern over procedural pattern is that they enable developers to create modules that do not need to be changed when a new type of object is added. A developer can simply create a new object that inherits many of its features from existing objects. This makes object-oriented programs easier to modify.

## Project: Favorite TV Shows

### Description

I propose a system where the user can see a list of TV shows, the user can see the details of each show, the episodes they have and be able to add shows to their own list of favorites.

### User Stories

* As a User I want to browse the available TV shows.
* As a User I want to see a TV show details.
* As a User I want to see a TV show's episodes.
* As a User I want to add a TV show to my favorites list.
* As a User I want to remove a TV show from my favorites list.
* As a User I want to see my list of favorites TV Shows.

### Pseudocode

```
class User {
  first name,
  last name,
  email,
  password
  favorites list of shows
  ---
  addFavorite()
  removeFavorite()
  getFavorites()
}

class Show {
  title,
  description,
  genre,
  image,
  list of episodes
  ---
  addEpisode()
  removeEpisode()
  getEpisodes()
}

class Episode {
  name,
  description,
  image,
  airing date,
  duration,
  episode number,
  episode season
}

user = create user('first', 'last', 'user@mail.com', 'pw')

show1 = create show('title 1', 'desc', 'drama', 'image1_url')
show2 = create show('title 2', 'desc', 'action', 'image2_url')

list of shows = [show1, show2]

episode1 = create episode('name1', 'desc', etc)
episode2 = create episode('name2', 'desc', etc)

show1.addEpisode(episode1)
show1.addEpisode(episode2)

user.addFavorite(show1)
user.addFavorite(show2)
user.removeFavorite(show1)

user.getFavorites()
```

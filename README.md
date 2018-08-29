# Movie Search React Project with Node Express Backend

> An app that searches for movies with [OMDB API](http://www.omdbapi.com/)

## Usage

Install [nodemon](https://github.com/remy/nodemon) globally

```
npm i nodemon -g
```

Install server and client dependencies

```
npm run setup
```

Create a `.env` file in your root directory and setup you environment variable as follows

```
OMDB_KEY=xxxxxxxx
```

where `xxxxxxxx` is the API Key generated from [OMDB](http://www.omdbapi.com/).


To start the server and client at the same time (from the root of the project)

```
npm run dev
```

## Testing

```
npm run test:client
```

## Time spent on this project

I spent around 24 hours working on this project

## Making this project production ready

* I would use a more robust caching system like [Redis](https://redis.io/) I am currently using a `flat-cache`
which stores the cache as a file on the server and also has limited functionality

* Build the app by running `npm run build`

## What to add with more time
* Pagination: We are currently returning only the first 20 results
* Movie Details main view
* Deploy to Docker: Not familiar with Docker


-Bendozy

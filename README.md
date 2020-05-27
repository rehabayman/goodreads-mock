# Good Reads - Mock

It is a Web Application is meant to be as a mock for Good Reads functionalities for developing and learning issues and not by any means violating copyrights. It has two views the admin and user views.

## Getting Started

These steps will get you a copy of the project up and running for development and testing purposes.

## Installation

1.  Install  **Nodejs** _latest stable version_
2.  Install  **npm** _latest stable version_
3.  Install  **mongoDB v3.6.3**
4. _Optional Step_ ⇒ You can install **MongoDB Compass** [any user interface application for MongoDB] as it offers a user interface for dealing with the database
5.  Clone the Project
6.  **In Server Directory** 
	Run the following commands:
	```
	npm install
	cp .env.example .env
	cp config/auth.js.example config/auth.js
	mkdir logs
	mkdir -p public/upload/books
	mkdir -p public/upload/authors
	mkdir -p public/upload/users
	```
    
7. **In client Directory** 
	Run the following commands:
	```
	npm install
	cp .env.example .env
	mkdir -p public/books-covers
	mkdir -p public/authors-pics
	mkdir -p public/users-profile-pics
	```
9.  Create an empty database with named  **goodReadsDB**  in mongoDB [You can do so easily using MongoDB Compass or any user interface application for MongoDB].
10.  In the **Server/.env** file change the  `DB_HOST`,  `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD` and `DB_PORT`  variables to match the credentials of the database you just created. 
_You can optionally change other variables like `PORT` which is the port the Server is running on and other variable like `BOOKS_COVERS` or `REQUESTS_LOG` to match the paths you wish, but if there's no need for so we prefer to keep them as they are_
11. In the **client/.env** file, you change the  `PORT` _which is the port the Client is running on_ and  `REACT_APP_SERVER_PORT` _which is the port the Server is running on_
_If there's no need for so we prefer to keep them as they are unless you changed the value of `PORT` in Server/.env then you must change `REACT_APP_SERVER_PORT` to match its value_
    

## Usage

1. In the **Server** directory, run the following command to launch the Server in development mode:  `npm run dev`
Or you can start the Server using `npm start`
2. In the **client** directory, run the following command to launch the client:  `npm start`

## Admin Features

CRUD Operations on Books, Books' Categories and Books' Authors.

## User Features

1.  Update his Profile Data.
2.  Search Books.
3.  View Books and Details for each one.
4.  View All Authors and Details for each one.
5.  View Categories and Books in each one.
6.  Rate Books.
7.  Change Books' Shelves.
8.  Add Reviews on Books.

## Built With

[Nodejs](https://nodejs.org/en/) and [Reactjs](https://reactjs.org/)

## Authors

1.  [Mohamed Adham](https://github.com/mohamedadham)
2.  [Rehab Ayman](https://github.com/rehabayman)
3.  [Mohamed Zakaria](https://github.com/Mohamed-Zkaria)
4.  [Nouran M.Yehia](https://github.com/Nouran-yehia)
5.  [Basma Mohamed](https://github.com/basmmohamed)
6.  [Ali Ismail](https://github.com/Ali-ismail-g)

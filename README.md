# Web Service: MitaZo
Assignment to create a webservice in seminar
## Overview
Create your personal movie history

## Explanation
This website can store your name, name of the movie, year it was released, the date you watched and rating.

## node.js
Create a directory and install node.js,MySQL, Express, Express Session  
Create a file name index.js

run program with  
node index.js

## MySQL Database Creation
### To create database  
Create database nodelogin;

### To create a table  
Create table movielist (
id int auto_increment primary key,
handlename varchar(255),
moviename varchar(255),
yearshown varchar(255),
yearseen varchar(255),
rating int
);

### To insert data  
Insert into movielist (handlename, moviename, yearshown, yearseen, rating) values ('YOURNAME', 'NAMEOFMOVIE', 'RELEASEYEAR', 'DATEWATCHED', 'RATING');  
Words with allcaps should be the values you would like to add to the created table

### To retrieve data
Select handlename, moviename, yearshown, yearseen, rating from movielist where handlename = 'YOURNAME';  
Words with allcaps should be the name you added your movies

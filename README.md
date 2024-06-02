# Udacity project 1: My Reads: A Book Tracking App

# Author: CanhNL1
# Date: 2024/06/02

# Project Overview:
In the MyReads project, you'll create a bookshelf app that allows you to select and categorize books you have read, are currently reading, or want to read. The project emphasizes using React to build the application and provides an API server and client library that you will use to persist information as you interact with the application.

# App Functionality:
In this application, the main page displays a list of "shelves" (i.e. categories), each of which contains a number of books. The three shelves are: Currently Reading, Want to Read, Read. Each book has a control that lets you select the shelf for that book. When you select a different shelf, the book moves there. The main page also has a link to /search, a search page that allows you to find books to add to your library. The search page has a text input that may be used to find books. As the value of the text input changes, the books that match that query are displayed on the page, along with a control that lets you add the book to your library. The search page also has a link to / (the root URL), which leads back to the main page.

# To run:
1. npm install
2. npm install --save react-router-dom
3. npm install --save prop-types
4. npm start
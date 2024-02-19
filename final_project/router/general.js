const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


const doesExist = (username)=>{
  let userswithsamename = users.filter((user)=>{
    return user.username === username
  });
  if(userswithsamename.length > 0){
    return true;
  } else {
    return false;
  }
}


public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    if (!doesExist(username)) {
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});
    }
  }
  return res.status(404).json({message: "Unable to register user."});

});


// Get the book list available in the shop. Promise callbacks implement for async functionality.
public_users.get('/',function (req, res) {
    let myPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve()
    },6000)})
    myPromise.then(
      res.send(JSON.stringify(books,null,4))
    )
});

// Get book details based on ISBN. Promise callbacks used.
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
    let myPromise = new Promise((resolve,reject)=>{
    setTimeout(()=>{
      resolve()
    },6000)})
    myPromise.then(
      res.send(books[isbn])
    )
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const authorName = req.params.author;
  const filteredBooks = Object.values(books).filter((a)=> a.author === authorName);
  let myPromise = new Promise((resolve,reject)=>{
    setTimeout(()=>{
      resolve()
    },6000)})
    myPromise.then(
      res.send(filteredBooks)
    )
  
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const bookTitle = req.params.title;
  const filteredBooks = Object.values(books).filter((b)=>b.title === bookTitle);
  let myPromise = new Promise((resolve,reject)=>{
    setTimeout(()=>{
      resolve()
    },6000)})
    myPromise.then(
      res.send(filteredBooks)
    ) 
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const bookReviews = req.params.isbn;
  const filteredReviews = Object.values(books).filter((c)=>c.reviews === bookReviews)
  res.send(filteredReviews)
});

module.exports.general = public_users;

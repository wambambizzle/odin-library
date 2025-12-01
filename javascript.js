const container = document.querySelector(".container");
const booksContent = document.querySelector(".books-content");

const myLibrary = [];

function Book(title, author, pages, hasRead) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }

  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.hasRead = hasRead;

  this.info = function () {
    let readCopy = hasRead ? "read" : "not read yet";
    return `${title} by ${author}, ${pages} pages, ${readCopy}`;
  };
}

function addBookToLibrary(title, author, pages, hasRead) {
  let book = new Book(title, author, pages, hasRead);
  myLibrary.push(book);
}

// TODO: remove later
function setTestBooks() {
  let book1 = new Book("The Hobbit", "J.R.R Tolkien", 295, false);
  let book2 = new Book("The Simple Path to Wealth", "J.L. Collins", 395, true);
  let book3 = new Book("Some other book title", "Budget Dog", 321, true);
  myLibrary.push(book1, book2, book3);
}

function showBooks() {
  // TODO:
  myLibrary.forEach((book) => {
    // TODO: move this logic to a function
    const div = document.createElement("div");
    div.classList.add("book");
    // TODO: use book id as some sort of div ID
    div.id = book.id;
    // TODO: clean this up later
    div.innerHTML = `<div class="book-title">${book.title}</div>
      <div class="book-author">${book.author}</div>
      <div class="book-pages">${book.pages}</div>
      <div class="book-read">${book.hasRead ? "Read" : "Not read"}</div>
    `;

    booksContent.appendChild(div);
  });
}

setTestBooks();
showBooks();

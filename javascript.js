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

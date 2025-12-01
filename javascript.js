const container = document.querySelector(".container");
const booksContent = document.querySelector(".books-content");
const addButton = document.querySelector(".add-book");
const dialog = document.querySelector("dialog");
const closeDialogButton = document.querySelector(".form-close-button");
const formButton = document.querySelector(".form-button");
const form = document.querySelector(".form");

// const bookTitle = document.querySelector("#book_title");
// const bookAuthor = document.querySelector("#book_author");
// const bookPages = document.querySelector("#page-numbers");
// const hasRead = document.querySelector('input[name="has_read"]:checked');

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

  return book;
}

function displayBookInLibrary(book) {
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
}

// TODO: remove later
function setTestBooks() {
  let book1 = new Book("The Hobbit", "J.R.R Tolkien", 295, false);
  let book2 = new Book("The Simple Path to Wealth", "J.L. Collins", 395, true);
  let book3 = new Book("Some other book title", "Budget Dog", 321, true);
  myLibrary.push(book1, book2, book3);
}

function showBooks() {
  myLibrary.forEach((book) => {
    displayBookInLibrary(book);
  });
}

setTestBooks();
showBooks();
setAddBookListener();
setCloseDialogListener();
setFormSubmitListener();

function setAddBookListener() {
  addButton.addEventListener("click", () => {
    clearFormData();
    dialog.showModal();
  });
}

function setCloseDialogListener() {
  closeDialogButton.addEventListener("click", (event) => {
    // event.preventDefault();
    dialog.close();
  });
}

function setFormSubmitListener() {
  formButton.addEventListener("click", (event) => {
    const bookTitle = document.querySelector("#book_title");
    const bookAuthor = document.querySelector("#book_author");
    const bookPages = document.querySelector("#page-numbers");
    const hasRead = document.querySelector('input[name="has_read"]:checked');

    // TODO: remove
    // console.log(
    //   `title: ${bookTitle.value}, author: ${bookAuthor.value}, page: ${bookPages.value}`
    // );

    if (
      bookTitle.value === "" ||
      bookAuthor.value === "" ||
      bookPages.value === "" ||
      hasRead.value === ""
    ) {
      alert("Bruh");
      return;
    }

    const read = hasRead.value.toLowerCase() === "true";

    let newBook = addBookToLibrary(
      bookTitle.value,
      bookAuthor.value,
      bookPages.value,
      read
    );
    // TODO: clear values after
    displayBookInLibrary(newBook);

    dialog.close();
    clearFormData();
    event.preventDefault();
  });
}

// function resetForm() {
form.addEventListener("reset", (event) => {
  event.preventDefault();
});
// }

function clearFormData() {
  document.querySelector("#book_title").value = "";
  document.querySelector("#book_author").value = "";
  document.querySelector("#page-numbers").value = "";
  document.querySelector("#has_read_yes").checked = false;
  document.querySelector("#has_read_no").checked = false;
}

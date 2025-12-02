const container = document.querySelector(".container");
// let booksContent = document.querySelector(".books-content");
const addButton = document.querySelector(".add-book");
const dialog = document.querySelector("dialog");
const closeDialogButton = document.querySelector(".form-close-button");
const formButton = document.querySelector(".form-button");
const form = document.querySelector(".form");

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

  console.log(`book.read :${book.hasRead}`);
  const readCopy = book.hasRead ? "Mark as Unread" : "Mark as Read";

  div.innerHTML = `<div class="book-title">${book.title}</div>
      <div class="book-author">${book.author}</div>
      <div class="book-pages">${book.pages}</div>
      <div class="book-read">${book.hasRead ? "Read" : "Not read"}</div>
      <button class="remove-book-button" id=${book.id}>Remove</button>
      <button class="toggle-read-button" id=${book.id}>${readCopy} </button>
    `;

  const booksContent = document.querySelector(".books-content");
  booksContent.appendChild(div);

  setRemoveBookListener(book);
  setToggleReadListener(book);
}

function setTestBooks() {
  let book1 = new Book("The Hobbit", "J.R.R Tolkien", 295, false);
  let book2 = new Book("The Simple Path to Wealth", "J.L. Collins", 395, true);
  let book3 = new Book("Some other book title", "Budget Dog", 321, true);
  myLibrary.push(book1, book2, book3);

  // myLibrary.push(book1);
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
    dialog.close();
  });
}

function setFormSubmitListener() {
  formButton.addEventListener("click", (event) => {
    const bookTitle = document.querySelector("#book_title");
    const bookAuthor = document.querySelector("#book_author");
    const bookPages = document.querySelector("#page-numbers");
    const hasRead = document.querySelector('input[name="has_read"]:checked');

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

    displayBookInLibrary(newBook);
    setRemoveBookListener(newBook);
    setToggleReadListener(newBook);

    dialog.close();
    clearFormData();
    event.preventDefault();
  });
}

function setRemoveBookListener(book) {
  const removeBookButtons = document.querySelectorAll(".remove-book-button");
  removeBookButtons.forEach((button) => {
    if (button.id === book.id) {
      button.addEventListener("click", (event) => {
        removeBook(book.id);
      });
    }
  });
}

function setToggleReadListener(book) {
  const toggleBookButtons = document.querySelectorAll(".toggle-read-button");
  toggleBookButtons.forEach((button) => {
    if (button.id === book.id) {
      button.addEventListener("click", (event) => {
        book.hasRead = !book.hasRead;

        // TODO: JNA pick up here - why isnt this working
        // book.toggleReadStatus();
        let indexToUpdate = myLibrary.map((book) => book.id).indexOf(button.id);
        myLibrary[indexToUpdate] = book;
        rerenderAllBooks();
      });
    }
  });
}

function clearFormData() {
  document.querySelector("#book_title").value = "";
  document.querySelector("#book_author").value = "";
  document.querySelector("#page-numbers").value = "";
  document.querySelector("#has_read_yes").checked = false;
  document.querySelector("#has_read_no").checked = false;
}

function removeBook(bookId) {
  let indexToRemove = myLibrary.map((book) => book.id).indexOf(bookId);
  // Remove from local store by Index
  myLibrary.splice(indexToRemove, 1);

  const books = document.getElementsByClassName("book");

  // Remove the node from the dom by ID
  Array.from(books).forEach((book) => {
    if (book.id === bookId) {
      const parentNode = book.parentNode;
      parentNode.removeChild(book);
    }
  });
}

Book.prototype.toggleReadStatus = function () {
  this.read = !this.read;
};

function rerenderAllBooks() {
  const booksContent = document.querySelector(".books-content");
  booksContent.innerHTML = "";

  myLibrary.forEach((book) => {
    displayBookInLibrary(book);
  });
}

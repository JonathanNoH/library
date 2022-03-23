/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
/* BOOK OBJECT CONSTRUCTOR */

class Book {
  constructor(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }

  toggle() {
    this.isRead = !this.isRead;
  }
}

/* VARIABLES */

const main = document.querySelector('main');
const showFormButton = document.querySelector('.show-form');
const form = document.getElementById('add-book-form');
const titleDOM = form.elements['book-title'];
const authorDOM = form.elements['book-author'];
const pagesDOM = form.elements['book-pages'];
const readDOM = form.elements['book-read'];

const myLibrary = [];

/* FUNCTIONS */

function addBookToLibrary(title, author, pages, isRead) {
  const newBook = new Book(title, author, pages, isRead);
  myLibrary.push(newBook);
}

function toggleForm() {
  form.classList.toggle('reveal');
}

function clearMain() {
  while (main.firstChild) {
    main.removeChild(main.firstChild);
  }
}

function displayBook(book, bookNum) {
  /* create card */
  const card = document.createElement('div');
  card.classList.add('card');

  /* set up remove button */
  card.setAttribute('data-book-num', bookNum);
  const removeButton = document.createElement('button');
  const buttonNode = document.createTextNode('X');
  removeButton.appendChild(buttonNode);
  removeButton.classList.add('remove-button');
  removeButton.addEventListener('click', () => {
    removeBook(bookNum);
    displayBooks();
  });

  /* set up read button */

  const readButton = document.createElement('button');
  const readButtonNode = document.createTextNode('change');
  readButton.appendChild(readButtonNode);
  readButton.classList.add('read-button');
  readButton.addEventListener('click', () => {
    toggleRead(bookNum);
    displayBooks();
  });

  /* set up book properties */
  for (const property in book) {
    if (Object.prototype.hasOwnProperty.call(book, property)) {
      if (property === 'toggle') continue;
      const div = document.createElement('div');
      div.classList.add(`${property}`);
      let node;
      if (property === 'isRead') {
        const str = book[property] ? 'Read' : 'Not Read Yet';
        node = document.createTextNode(str);
      } else {
        node = document.createTextNode(book[property]);
      }
      div.appendChild(node);
      card.appendChild(div);
    }
  }
  card.appendChild(readButton);
  card.appendChild(removeButton);
  main.appendChild(card);
}

function displayBooks() {
  clearMain();
  if (myLibrary.length === 0) return;
  let bookNum = 0;
  myLibrary.forEach((book) => {
    displayBook(book, bookNum);
    bookNum += 1;
  });
}

function removeBook(bookNum) {
  myLibrary.splice(bookNum, 1);
  displayBooks();
}

function toggleRead(bookNum) {
  myLibrary[bookNum].toggle();
  displayBooks();
}

/* EVENT LISTENERS */

showFormButton.addEventListener('click', toggleForm);

form.addEventListener('reset', () => {
  const isRead = !!readDOM.checked;
  addBookToLibrary(titleDOM.value, authorDOM.value, pagesDOM.value, isRead);
  displayBooks();
  toggleForm();
});

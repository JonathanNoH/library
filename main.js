/* BOOK OBJECT CONSTRUCTOR */

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

Book.prototype.info = function() {
return `${this.title} by ${this.author}, ${this.pages} pages, ${isRead ? "read" : "not read yet"}`;
}

/* FUNCTIONS */

function addBookToLibrary(title, author, pages, isRead) {
    let newBook = new Book(title, author, pages, isRead)
    myLibrary.push(newBook);
}

function displayBooks() {
    if (myLibrary.length === 0) return;
    let bookNum = 0;
    for (let book of myLibrary) {
        console.log(book);
        displayBook(book, bookNum);
        bookNum += 1;
    }
}

function displayBook(book, bookNum) {
    let card = document.createElement("div");
    card.classList.add('card');
    card.setAttribute('data-book-num', bookNum);   
    for (let property in book) {
        if (property == 'info') break;
        let div = document.createElement("div");
        div.classList.add(`${property}`);
        let node;
        if (property == `isRead`) {
            const str = book[property] ? "Read" : "Not Read Yet";
            node = document.createTextNode(str);
        } else {
            node = document.createTextNode(book[property]);
        }
        div.appendChild(node);
        card.appendChild(div);
    }
    main.appendChild(card);
}

function removeBook(bookNum) {
    myLibrary.splice(bookNum, 1);
    let littleOne = document.querySelector(`[data-book-num='${bookNum}'`);
    /* I'm sorry littleOne */
    main.removeChild(littleOne);
}


function toggleForm() {
    form.classList.toggle('reveal');
}

function clearMain() {
    while (main.firstChild) {
        main.removeChild(main.firstChild);
    }
}

/* VARIABLES */

const main = document.querySelector("main");
const showFormButton = document.querySelector(".show-form");
const form = document.getElementById('add-book-form');
const title = form.elements['book-title'];
const author = form.elements['book-author'];
const pages = form.elements['book-pages'];
const read = form.elements['book-read'];

let myLibrary = [];

/* EVENT LISTENERS */

showFormButton.addEventListener('click', toggleForm);

form.addEventListener('reset', (e) => {
    let isRead = read.checked ? true : false;
    addBookToLibrary(title.value, author.value, pages.value, isRead);
    clearMain();
    displayBooks();
    toggleForm();
});


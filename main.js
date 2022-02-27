/* BOOK OBJECT CONSTRUCTOR */

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

Book.prototype.toggle = function() {
    this.isRead = this.isRead ? false : true; 
}

/* FUNCTIONS */

function addBookToLibrary(title, author, pages, isRead) {
    let newBook = new Book(title, author, pages, isRead)
    myLibrary.push(newBook);
}

function displayBooks() {
    clearMain();
    if (myLibrary.length === 0) return;
    let bookNum = 0;
    for (let book of myLibrary) {
        displayBook(book, bookNum);
        bookNum += 1;
    }
}

function displayBook(book, bookNum) {
    /* create card */
    let card = document.createElement("div");
    card.classList.add('card');

    /* set up remove button */
    card.setAttribute('data-book-num', bookNum);
    let removeButton = document.createElement("button");
    let buttonNode = document.createTextNode("remove");
    removeButton.appendChild(buttonNode);
    removeButton.classList.add('remove-button');
    removeButton.addEventListener('click', (e) => {
        removeBook(bookNum);
    })

    /* set up read button */

    let readButton = document.createElement('button');
    let readButtonNode = document.createTextNode("change");
    readButton.appendChild(readButtonNode);
    readButton.classList.add('read-button');
    readButton.addEventListener('click', (e) => {
        toggleRead(bookNum);
    });

    /* set up book properties */
    for (let property in book) {
        if (property == 'toggle') break;
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
    card.appendChild(readButton);
    card.appendChild(removeButton);
    main.appendChild(card);
}

function removeBook(bookNum) {
    myLibrary.splice(bookNum, 1);
    displayBooks();
}

function toggleRead(bookNum) {
    myLibrary[bookNum].toggle();
    displayBooks();
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
    displayBooks();
    toggleForm();
});


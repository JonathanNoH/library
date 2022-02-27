function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

Book.prototype.info = function() {
return `${this.title} by ${this.author}, ${this.pages} pages, ${isRead ? "read" : "not read yet"}`;
}

function addBookToLibrary(title, author, pages, isRead) {
    let newBook = new Book(title, author, pages, isRead)
    myLibrary.push(newBook);
}

let myLibrary = [];

function displayBooks() {
    if (myLibrary.length === 0) return;
    for (let book of myLibrary) {
        console.log(book);
        displayOneBook(book);
    }
}

function displayBook(book) {
    let card = document.createElement("div");
    card.classList.add('card')
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

let main = document.querySelector("main");
let showFormButton = document.querySelector(".show-form");

showFormButton.addEventListener('click', () => {
    form.classList.toggle("reveal");
});


const form = document.getElementById('add-book-form');
const title = form.elements['book-title'];
const author = form.elements['book-author'];
const pages = form.elements['book-pages'];
const read = form.elements['book-read'];

form.addEventListener('reset', (e) => {
    let isRead = read.checked ? true : false;
    addBookToLibrary(title.value, author.value, pages.value, isRead);
    displayBook(myLibrary[myLibrary.length - 1]);
});


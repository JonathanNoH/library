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

function displayBooks(lob) {
    if (lob.length === 0) return;
    for (let book of lob) {
        console.log(book);
    }
}
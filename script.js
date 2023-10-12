const cardContainer = document.querySelector(".card-container");

const myLibrary = [];

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.info = () => {
        const readStr = haveRead ? 'already read' : 'not read yet';
        return `${title} by ${author}, ${pages} pages, ${readStr}.`;
    };
}

function addBookToLibrary(title, author, pages, isRead) {
    myLibrary.push(new Book(title, author, pages, isRead));
}

function addBookToDisplay(book){
    let card = document.createElement("div");
    card.classList.add('card');
    card.innerHTML = `
        <h2>${book.title}</h2>
        <h3>Author: ${book.author}</h3>
        <p>Pages: ${book.pages}</p>
        <p>Read by you: ${book.isRead ? "Yes" : "No"}
    `;
    cardContainer.appendChild(card);
}

function displayAllBooks(library) {
    myLibrary.forEach(book => addBookToDisplay(book));
}

addBookToLibrary('good book', 'good author', 10, true);
addBookToLibrary('okay book', 'okay author', 100, true);
addBookToLibrary('bad book', 'bad author', 1000, false);
addBookToLibrary('awful book', 'awful author', 10000, false);

displayAllBooks(myLibrary);

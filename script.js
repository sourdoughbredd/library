const cardContainer = document.querySelector(".card-container");

const myLibrary = [];
const toggleReadButtons = [];
const removeBookButtons = [];

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

function addBookToDisplay(book, index){
    let card = document.createElement("div");
    card.classList.add('card');
    card.classList.add('book');
    card.setAttribute('data-index', index.toString())
    if (book.isRead) {
        card.classList.add('is-read');
    }
    card.innerHTML = `
        <h2 class="title">${book.title}</h2>
        <h3 class="author">by ${book.author}</h3>
        <p class="pages">Pages: ${book.pages}</p>
        <div class="read-container"></div>
        <div class="actions-container"> 
            <button class="remove-book">Remove from Library</button>
            <button class="toggle-read">Mark as Read</button>
        </div>
    `;
    cardContainer.appendChild(card);
}

function displayAllBooks(library) {
    myLibrary.forEach((book, index) => addBookToDisplay(book, index));
}

addBookToLibrary('good book', 'good author', 10, true);
addBookToLibrary('okay book with a long ass title freal', 'okay author', 100, true);
addBookToLibrary('bad book', 'bad author', 1000, false);
addBookToLibrary('awful book', 'awful author', 10000, false);

displayAllBooks(myLibrary);



const cardContainer = document.querySelector(".card-container");

let myLibrary = [];
let nextId = 0;

function Book(id, title, author, pages, isRead) {
    this.id = id;
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
    const book = new Book(nextId, title, author, pages, isRead);
    nextId += 1;
    myLibrary.push(book);
    addBookToDisplay(book);
}

function addBookToDisplay(book){
    let card = document.createElement("div");
    card.classList.add('card');
    card.classList.add('book');
    card.setAttribute('data-id', book.id.toString());  // to keep track of books so we can alter them
    if (book.isRead) {
        card.classList.add('is-read');
    }
    toggleReadStr = book.isRead ? "Mark as Unread" : "Mark as Read";
    card.innerHTML = `
        <h2 class="title">${book.title}</h2>
        <h3 class="author">by ${book.author}</h3>
        <p class="pages">Pages: ${book.pages}</p>
        <div class="read-container"></div>
        <div class="actions-container"> 
            <button class="remove-book"${book.id.toString()}">Remove from Library</button>
            <button class="toggle-read"${book.id.toString()}">${toggleReadStr}</button>
        </div>
    `;
    cardContainer.appendChild(card);

    // bookCards.push(card);
    toggleReadButton = card.querySelector('.toggle-read');
    removeBookButton = card.querySelector('.remove-book');

    toggleReadButton.addEventListener('click', () => toggleReadButtonPressed(card, book));
    removeBookButton.addEventListener('click', () => removeBookButtonPressed(card, book));
}

function displayAllBooks(library) {
    myLibrary.forEach(book => addBookToDisplay(book));
}

function removeBookButtonPressed(bookDiv, book) {
    bookDiv.remove();
    myLibrary = myLibrary.filter(b => b.id != book.id);
}

function toggleReadButtonPressed(bookDiv, book) {
    if (book.isRead) {
        bookDiv.classList.remove('is-read');
        book.isRead = false;
        bookDiv.querySelector('.toggle-read').textContent = 'Mark as Read';
    } else {
        bookDiv.classList.add('is-read');
        book.isRead = true;
        bookDiv.querySelector('.toggle-read').textContent = 'Mark as Unread';
    }
}

addBookToLibrary('good book', 'good author', 10, true);
addBookToLibrary('okay book with a long ass title freal', 'okay author', 100, true);
addBookToLibrary('bad book', 'bad author', 1000, false);
addBookToLibrary('awful book', 'awful author', 10000, false);





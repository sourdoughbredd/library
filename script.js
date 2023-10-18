const cardContainer = document.querySelector(".card-container");
const addBookBtn = document.querySelector('.placeholder > div');
const addBookFormContainer = document.querySelector('.form-container');
const submitBookBtn = document.querySelector('input[type=submit]');

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
        <p class="pages">Pages:  ${book.pages}</p>
        <div class="read-container"></div>
        <div class="actions-container"> 
            <button class="remove-book"${book.id.toString()}">Remove from Library</button>
            <button class="toggle-read"${book.id.toString()}">${toggleReadStr}</button>
        </div>
    `;
    cardContainer.appendChild(card);

    // bookCards.push(card);
    toggleReadBtn = card.querySelector('.toggle-read');
    removeBookBtn = card.querySelector('.remove-book');

    toggleReadBtn.addEventListener('click', () => toggleReadBtnPressed(card, book));
    removeBookBtn.addEventListener('click', () => removeBookBtnPressed(card, book));
}

function removeBookBtnPressed(bookDiv, book) {
    bookDiv.remove();
    myLibrary = myLibrary.filter(b => b.id != book.id);
}

function toggleReadBtnPressed(bookDiv, book) {
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

function submitBookBtnPressed(event) {
    // Collect form info
    title = addBookFormContainer.querySelector('#title-in').value;
    author = addBookFormContainer.querySelector('#author-in').value;
    pages = addBookFormContainer.querySelector('#pages-in').value;
    isRead = addBookFormContainer.querySelector('#is-read-in').checked;
    // Add book to library
    addBookToLibrary(title, author, pages, isRead);
    // Reset and hide the form
    resetAddBookForm();
    // Prevent default behavior of submit button (refreshes page)
    event.preventDefault();
}

function resetAddBookForm() {
    addBookFormContainer.querySelector('form').reset();
    addBookFormContainer.classList.add('hidden');
}

addBookBtn.addEventListener('click', () => addBookFormContainer.classList.remove('hidden'));
submitBookBtn.addEventListener('click', submitBookBtnPressed);

// addBookToLibrary('good book', 'good author', 10, true);
// addBookToLibrary('okay book with a long ass title freal', 'okay author', 100, true);
// addBookToLibrary('bad book', 'bad author', 1000, false);
// addBookToLibrary('awful book', 'awful author', 10000, false);
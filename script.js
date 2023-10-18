// DOM elements
const cardContainer = document.querySelector(".card-container");
const addBookBtn = document.querySelector('.placeholder > div');
const addBookFormContainer = document.querySelector('.form-container');
const submitBookBtn = document.querySelector('input[type=submit]');

// Storage vars
let myLibrary = [];
let nextId = 0; // unique ID for each book

// Book object
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

// Adds a book to the library and displays it
function addBookToLibrary(title, author, pages, isRead) {
    const book = new Book(nextId, title, author, pages, isRead);
    nextId += 1;
    myLibrary.push(book);
    addBookToDisplay(book);
}

// Adds a book to the display
function addBookToDisplay(book){
    // Create new card for the book
    let card = document.createElement("div");
    card.classList.add('card');
    card.classList.add('book');
    card.setAttribute('data-id', book.id.toString());  // to keep track of books so we can alter them
    // Add class for styling of books that have been read
    if (book.isRead) {
        card.classList.add('is-read');
    }
    // Write the HTML for the card with iinterac
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

    // Add event listeners to the interactive buttons on the card
    toggleReadBtn = card.querySelector('.toggle-read');
    removeBookBtn = card.querySelector('.remove-book');
    toggleReadBtn.addEventListener('click', () => toggleReadBtnPressed(card, book));
    removeBookBtn.addEventListener('click', () => removeBookBtnPressed(card, book));
}

// Callback function when user presses the button to remove a book from the library
function removeBookBtnPressed(bookDiv, book) {
    bookDiv.remove();
    myLibrary = myLibrary.filter(b => b.id != book.id);
}

// Callback function when user presses button to toggle the read/unread status
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

// Callback function when user presses submit button on the add book form
function submitBookBtnPressed(event) {
    // Collect form info entered by user
    title = addBookFormContainer.querySelector('#title-in').value;
    author = addBookFormContainer.querySelector('#author-in').value;
    pages = addBookFormContainer.querySelector('#pages-in').value;
    isRead = addBookFormContainer.querySelector('#is-read-in').checked;
    // Add book to library
    addBookToLibrary(title, author, pages, isRead);
    resetAddBookForm();
    event.preventDefault(); // Prevent default behavior of submit button (refreshes page)
}

// Function to reset the add book form (clear fields and hide)
function resetAddBookForm() {
    addBookFormContainer.querySelector('form').reset();
    addBookFormContainer.classList.add('hidden');
}

// Event listeners for the add book form buttons
addBookBtn.addEventListener('click', () => addBookFormContainer.classList.remove('hidden'));
submitBookBtn.addEventListener('click', submitBookBtnPressed);
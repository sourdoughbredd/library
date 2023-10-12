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

function addBookToLibrary(title, author, page, isRead) {
    myLibrary.push(new Book(title, author, page, isRead));
}

addBookToLibrary('good book', 'good author', 10, true);
addBookToLibrary('okay book', 'okay author', 100, true);
addBookToLibrary('bad book', 'bad author', 1000, false);
addBookToLibrary('awful book', 'awful author', 10000, false);
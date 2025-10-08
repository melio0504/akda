// Handle adding new book dialog
const addBookDialog = document.querySelector('#addBookDialog');
const addNewBookForm = document.querySelector('#addNewBookForm');
const openAddBookBtn = document.querySelector('#addBook');
const closeAddBookBtn = document.querySelector('#closeBookBtn');

openAddBookBtn.addEventListener('click', () => addBookDialog.showModal());
closeAddBookBtn.addEventListener('click', () => addBookDialog.close());
addBookDialog.addEventListener('close', () => addNewBookForm.reset());

// Gets the current date to insert automatically inside the form
window.addEventListener('DOMContentLoaded', () => {
    const today = getTodayLocalTime();
    const dateAddedInput = document.querySelector('#bookDateAdded');

    dateAddedInput.value = today;
    dateAddedInput.setAttribute('max', today);
})

function getTodayLocalTime() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

// This will handle the form data and will pass as an argument
document.querySelector('#addNewBookForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    addBookToLibrary(
        formData.get('bookTitle'),
        formData.get('bookAuthor'),
        formData.get('bookPages'),
        formData.get('bookStatus'),
        formData.get('bookRating'),
        formData.get('bookDateRead'),
        formData.get('bookDateAdded'),
        formData.get('bookCoverImg')
    );

    addBookDialog.close();
});

// Arrays with preset personalized books
const myLibrary = [
    {
        id: '3197f5b0-11a4-4050-a14c-4fa964dee160',
        title: 'Noli Me Tangere',
        author: 'Jose Rizal',
        pages: '444',
        status: 'Completed',
        rating: '5',
        dateRead: '2025-02-03',
        dateAdded: '2025-01-24',
        coverURL: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1309199939i/418285.jpg'
    }, 
    {
        id: 'b3e18ec1-44ec-4149-95d4-ade104b72b67',
        title: 'Florante At Laura',
        author: 'Francisco Balagtas',
        pages: '110',
        status: 'Completed',
        rating: '4',
        dateRead: '2025-02-05',
        dateAdded: '2025-02-03',
        coverURL: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1348164414i/1848283.jpg'
    },
    {
        id: 'e7f5b1eb-074c-4183-8d85-75847c0e4a84',
        title: 'Oliver Twist',
        author: 'Charles Dickens',
        pages: '608',
        status: 'Currently Reading',
        rating: '4',
        dateRead: '2025-03-06',
        dateAdded: '2025-03-01',
        coverURL: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1327868529i/18254.jpg'
    }, 
    {
        id: '24c76e12-c001-46bf-b2db-f4d936c90559',
        title: 'Anne of Green Gables',
        author: 'L.M. Montgomery',
        pages: '320',
        status: 'Completed',
        rating: '5',
        dateRead: '2025-03-30',
        dateAdded: '2025-03-15',
        coverURL: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1615094578i/8127.jpg'
    },
    {
        id: '8c1fd992-a212-4323-b12c-121ea6964533',
        title: 'The Lord of the Rings',
        author: 'J.R.R. Tolkien',
        pages: '1216',
        status: 'Want to read',
        rating: '5',
        dateRead: '2025-05-05',
        dateAdded: '2025-07-23',
        coverURL: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1566425108i/33.jpg'
    }
];

function Book(title, author, pages, status, rating, dateRead, dateAdded, coverURL) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.rating = rating;
    this.dateRead = dateRead || 'still reading it!';
    this.dateAdded = dateAdded;
    this.coverURL = coverURL || '/assets/images/default-cover.webp';
};

function addBookToLibrary(title, author, pages, status, rating, dateRead, dateAdded, coverURL) {
    const newBook = new Book(title, author, pages, status, rating, dateRead, dateAdded, coverURL);

    myLibrary.push(newBook);

    displayBooks(myLibrary);
};

// Display each books
const bookContainer = document.querySelector('.book-container');

function displayBooks(myLibrary) {
    bookContainer.innerHTML = '';

    myLibrary.forEach(book => {
        const bookCard = document.createElement('article');
        bookCard.classList.add('book-card');

        const bookCover = document.createElement('div');
        const img = document.createElement('img');

        img.src = book.coverURL;
        bookCover.appendChild(img);

        const bookInfo = document.createElement('div');
        bookInfo.classList.add('book-info');

        const title = document.createElement('p');
        title.textContent = `Title: ${book.title}`;

        const author = document.createElement('p');
        author.textContent = `Author: ${book.author}`;

        const pages = document.createElement('p');
        pages.textContent = `Pages: ${book.pages}`;

        const status = document.createElement('p');
        status.textContent = `Status: ${book.status}`;

        const rating = document.createElement('p');
        rating.textContent = `Rating: ${book.rating}`;

        const dateRead = document.createElement('p');
        dateRead.textContent = `Date Read: ${book.dateRead}`;

        const dateAdded = document.createElement('p');
        dateAdded.textContent = `Date Added: ${book.dateAdded}`;

        bookInfo.append(title, author, pages, status, rating, dateRead, dateAdded);

        const removeBtn = document.createElement('button');
        removeBtn.classList.add('removeBook');
        removeBtn.textContent = '✍🏻';
        removeBtn.addEventListener('click', () => openEditDialog(book.id));

        bookCard.append(bookCover, bookInfo, removeBtn);
        bookContainer.appendChild(bookCard);
    })
}

displayBooks(myLibrary);

// Handle editing and deleting books dialog
const editBookDialog = document.querySelector('#editBookDialog');
const editBookForm = document.querySelector('#editBookForm');
const deleteBookBtn = document.querySelector('#deleteBookBtn');

function openEditDialog(bookId) {
    const book = myLibrary.find(b => b.id === bookId);

    if (!book) return;

    document.querySelector('#editBookId').value = book.id;
    document.querySelector('#editBookTitle').value = book.title;
    document.querySelector('#editBookAuthor').value = book.author;
    document.querySelector('#editBookPages').value = book.pages;
    document.querySelector('#editBookStatus').value = book.status;
    document.querySelector('#editBookRating').value = book.rating;
    document.querySelector('#editBookDateRead').value = book.dateRead;
    document.querySelector('#editBookDateAdded').value = book.dateAdded;
    document.querySelector('#editBookCoverImg').value = book.coverURL;

    editBookDialog.showModal();
}

editBookForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const id = document.querySelector('#editBookId').value;
    const bookIndex = myLibrary.findIndex(b => b.id === id);

    if (bookIndex !== -1) {
        myLibrary[bookIndex] = {
        ...myLibrary[bookIndex],
        title: document.querySelector('#editBookTitle').value,
        author: document.querySelector('#editBookAuthor').value,
        pages: document.querySelector('#editBookPages').value,
        status: document.querySelector('#editBookStatus').value,
        rating: document.querySelector('#editBookRating').value,
        dateRead: document.querySelector('#editBookDateRead').value,
        dateAdded: document.querySelector('#editBookDateAdded').value,
        coverURL: document.querySelector('#editBookCoverImg').value
        };
    }

    displayBooks(myLibrary);
    editBookDialog.close();
})

deleteBookBtn.addEventListener('click', () => {
    const id = document.querySelector('#editBookId').value;
    const index = myLibrary.findIndex(b => b.id === id);
    if (index !== -1) {
        myLibrary.splice(index, 1);
    }

    displayBooks(myLibrary);
    editBookDialog.close();
});

// Sort the books by status
const showAllBooksBtn = document.querySelector('#showAllBooks');
const showWantToReadBtn = document.querySelector('#showWantToRead');
const showCurrentlyReadingBtn = document.querySelector('#showCurrentlyReading');
const showReadBookBtn = document.querySelector('#showRead');

showAllBooksBtn.addEventListener('click', () => { displayBooks(myLibrary);});

showWantToReadBtn.addEventListener('click', () => { displayOnlyWantToRead();});

showCurrentlyReadingBtn.addEventListener('click', () => { displayOnlyCurrentlyReading();});

showReadBookBtn.addEventListener('click', () => { displayOnlyRead();});

function displayOnlyWantToRead() {
    const wantToRead = myLibrary.filter(book => book.status === 'Want to read');

    displayBooks(wantToRead);
}

function displayOnlyCurrentlyReading() {
    const currentlyReading = myLibrary.filter(book => book.status === 'Currently Reading');

    displayBooks(currentlyReading);
}

function displayOnlyRead() {
    const onlyRead = myLibrary.filter(book => book.status === 'Completed');

    displayBooks(onlyRead);
}

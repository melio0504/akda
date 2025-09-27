// Handle dialog behavior
const addBookForm = document.querySelector('#addBookForm');
const addNewBookForm = document.querySelector('#addNewBookForm');
const openAddBookBtn = document.querySelector('#addBook');
const closeAddBookBtn = document.querySelector('#closeBookForm');

openAddBookBtn.addEventListener('click', () => addBookForm.showModal());
closeAddBookBtn.addEventListener('click', () => addBookForm.close());
addBookForm.addEventListener('close', () => addNewBookForm.reset());

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

    addBookForm.close();
});

// The main library (Arrays) with preset personalized books
const myLibrary = [
    {
        id: '3197f5b0-11a4-4050-a14c-4fa964dee160',
        title: 'Noli Me Tangere',
        author: 'Jose Rizal',
        pages: '444',
        status: 'Completed',
        rating: '5',
        dateRead: '09-18-2025',
        dateAdded: '09-21-2025',
        coverURL: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1309199939i/418285.jpg'
    }, 
    {
        id: 'b3e18ec1-44ec-4149-95d4-ade104b72b67',
        title: 'Florante At Laura',
        author: 'Francisco Balagtas',
        pages: '110',
        status: 'Completed',
        rating: '4',
        dateRead: '09-20-2025',
        dateAdded: '09-12-2025',
        coverURL: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1348164414i/1848283.jpg'
    },
    {
        id: 'e7f5b1eb-074c-4183-8d85-75847c0e4a84',
        title: 'Oliver Twist',
        author: 'Charles Dickens',
        pages: '608',
        status: 'Currently Reading',
        rating: '4',
        dateRead: '06-25-2025',
        dateAdded: '04-10-2025',
        coverURL: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1327868529i/18254.jpg'
    }, 
    {
        id: '24c76e12-c001-46bf-b2db-f4d936c90559',
        title: 'Anne of Green Gables',
        author: 'L.M. Montgomery',
        pages: '320',
        status: 'Completed',
        rating: '5',
        dateRead: '01-25-2025',
        dateAdded: '07-10-2024',
        coverURL: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1615094578i/8127.jpg'
    },
    {
        id: '8c1fd992-a212-4323-b12c-121ea6964533',
        title: 'The Lord of the Rings',
        author: 'J.R.R. Tolkien',
        pages: '1216',
        status: 'Want to read',
        rating: '5',
        dateRead: '01-25-2025',
        dateAdded: '07-10-2024',
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
    this.dateRead = dateRead;
    this.dateAdded = dateAdded;
    this.coverURL = coverURL || '/assets/images/default-cover.webp';
};

function addBookToLibrary(title, author, pages, status, rating, dateRead, dateAdded, coverURL) {
    const newBook = new Book(title, author, pages, status, rating, dateRead, dateAdded, coverURL);

    myLibrary.push(newBook);

    renderLibrary();
};

// Display each books
const bookContainer = document.querySelector('.book-container');

function renderLibrary() {
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
        removeBtn.id = 'removeBook';
        removeBtn.textContent = '✍🏻';

        bookCard.append(bookCover, bookInfo, removeBtn);
        bookContainer.appendChild(bookCard);
    });
}

renderLibrary();

// This will create the sort function
const showAllBooksBtn = document.querySelector('#showAllBooks');
const showWantToReadBtn = document.querySelector('#showWantToRead');
const showCurrentlyReadingBtn = document.querySelector('#showCurrentlyReading');
const showReadBookBtn = document.querySelector('#showRead');

// TODO: Sort feature implementation

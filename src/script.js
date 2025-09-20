const addBookForm = document.querySelector('#addBookForm');
const addNewBookForm = document.querySelector('#addNewBookForm');
const openAddBookBtn = document.querySelector('#addBook');
const closeAddBookBtn = document.querySelector('#closeBookForm');

openAddBookBtn.addEventListener('click', () => addBookForm.showModal());
closeAddBookBtn.addEventListener('click', () => addBookForm.close());
addBookForm.addEventListener('close', () => addNewBookForm.reset());

document.querySelector('#addNewBookForm').addEventListener('submit', function(event) {
    event.preventDefault();


});


// The main library (Objects) with preset personalized books
const myLibrary = [
    {
        id: '3197f5b0-11a4-4050-a14c-4fa964dee160',
        title: 'Noli Me Tangere',
        author: 'Jose Rizal',
        page: '444',
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
        page: '110',
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
        page: '608',
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
        page: '320',
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
        page: '1216',
        status: 'Want to read',
        rating: '5',
        dateRead: '01-25-2025',
        dateAdded: '07-10-2024',
        coverURL: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1615094578i/8127.jpg'
    }
];

function Book() {
    this.id = id;
    this.name = name;
    this.info = function() {

    }
};

function addBookToLibrary() {
    // Take parameters then create a book to store in the array
};

function displayBooks() {
    let result = '';

    myLibrary.forEach(function(book) {
        result += `<div><h3>` + book.title + book.author + book.page + book.status + book.rating + `</h3></div>`;
    });

    document.querySelector('.blahblah').textContent = result;

    // Need to fix this
}

// This will sort all the books showing

const showAllBooksBtn = document.querySelector('#showAllBooks');
const showWantToReadBtn = document.querySelector('#showWantToRead');
const showCurrentlyReadingBtn = document.querySelector('#showCurrentlyReading');
const showReadBookBtn = document.querySelector('#showRead');

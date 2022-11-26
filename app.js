const form = document.querySelector('form');
const addBookBtn = document.querySelector('.add__div button');
const tint = document.querySelector('.tint');

const formBookName = document.querySelector('#book-name');
const formBookAuthor = document.querySelector('#author-name');
const formBookPages = document.querySelector('#num-pages');
const formCheckBox = document.querySelector('#isBookRead');

const submitBtn = document.querySelector('.submit-btn');
const bookDisplay = document.querySelector('.grid-book-display');

let book1;

function createBook(e) {
    e.preventDefault();
    collapseForm();
    book1 = new Book(formBookName.value, formBookAuthor.value, formBookPages.value, formCheckBox.checked);
    createHTMLStructure();
    resetForm();
}

function expandForm(e) {
    e.stopPropagation();
    form.style.display = 'flex';
    setTimeout(() =>{
        form.classList.add('scale');
        applyTint();
    },10)
}

function applyTint() {
    tint.classList.add('opacity');
}

function removeTint() {
    tint.classList.remove('opacity');
}

function collapseForm() {
    form.classList.remove('scale');
    removeTint();
    setTimeout(changeDisplay, 700);
}

function resetForm() {
    formBookName.value = '';
    formBookAuthor.value = '';
    formBookPages.value = '';
    formCheckBox.checked = false;
}

function createHTMLStructure() {
    let gridItem = document.createElement('div');
    let bookTitle = document.createElement('span');
    let bookAuthor = document.createElement('span');
    let bookPages = document.createElement('span');
    let readBtn = document.createElement('button');
    let removeBtn = document.createElement('button');

    gridItem.classList.add('grid-item')
    bookTitle.classList.add('book-title');
    bookAuthor.classList.add('book-author');
    bookPages.classList.add('book-pages');
    readBtn.classList.add('read-toggle');
    removeBtn.classList.add('remove-btn');

    bookTitle.textContent = formBookName.value;
    bookAuthor.textContent = formBookAuthor.value;
    bookPages.textContent = formBookPages.value;
    removeBtn.textContent = 'Remove';
    
    if (formCheckBox.checked) {
        readBtn.textContent = "Read";
    } 
    else {
        readBtn.textContent = "Not Read"
    }

    bookDisplay.append(gridItem);
    gridItem.append(bookTitle, bookAuthor, bookPages, readBtn, removeBtn);
}

function changeDisplay() {
    if (form.getBoundingClientRect().height == 0) {
        form.style.display = 'none';
    }
}

addBookBtn.addEventListener('click', expandForm);
tint.addEventListener('click', collapseForm);
submitBtn.addEventListener('click', createBook);

window.onload = () => {
    collapseForm();
};

function Book(name, author, pages, read) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.output = function(){
    return `${this.name} by ${this.author} is ${this.pages} pages long. Has it been read? ${this.read}`
}

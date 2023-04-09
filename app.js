const form = document.querySelector('form');
const addBookBtn = document.querySelector('.add__div button');
const tint = document.querySelector('.tint');
const error = document.querySelector('.error');

const formBookName = document.querySelector('#book-name');
const formBookAuthor = document.querySelector('#author-name');
const formBookPages = document.querySelector('#num-pages');
const formCheckBox = document.querySelector('#isBookRead');

const submitBtn = document.querySelector('.submit-btn');
const bookDisplay = document.querySelector('.grid-book-display');

let libraryArray = [];

function createBook(e) {
  e.preventDefault();
  if (isInArray()) {
    error.classList.add('show');
  } else {
    collapseForm();
    addBookToArray();
    createHTMLStructure();
    resetForm();
    error.classList.remove('show');
  }
}

function addBookToArray() {
  libraryArray[libraryArray.length] = new Book(
    formBookName.value,
    formBookAuthor.value,
    formBookPages.value,
    formCheckBox.checked
  );
}

function isInArray() {
  let flag = false;
  libraryArray.find((book) => {
    if (book.name == formBookName.value) flag = true;
  });
  return flag;
}

function expandForm(e) {
  e.stopPropagation();
  form.style.display = 'flex';
  bookDisplay.style.zIndex = '';
  tint.style.display = '';
  setTimeout(() => {
    form.classList.add('scale');
    applyTint();
  }, 10);
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
  setTimeout(debugPageInteractions, 700);
}

function resetForm() {
  formBookName.value = '';
  formBookAuthor.value = '';
  formBookPages.value = '';
  formCheckBox.checked = false;
}

function createHTMLStructure() {
  const gridItem = document.createElement('div');
  const bookTitle = document.createElement('h3');
  const bookAuthor = document.createElement('span');
  const bookPages = document.createElement('span');
  const readBtn = document.createElement('button');
  const removeBtn = document.createElement('button');

  gridItem.classList.add('grid-item');
  bookTitle.classList.add('book-title');
  bookAuthor.classList.add('book-author');
  bookPages.classList.add('book-pages');
  readBtn.classList.add('read-toggle');
  removeBtn.classList.add('remove-btn');

  bookTitle.textContent = formBookName.value;
  bookAuthor.textContent = formBookAuthor.value;
  bookPages.textContent = `${formBookPages.value} pages`;
  removeBtn.textContent = 'Remove';

  bookDisplay.append(gridItem);
  gridItem.append(bookTitle, bookAuthor, bookPages, readBtn, removeBtn);
  setReadBtnText();

  readBtn.addEventListener('click', changeReadStatus);
  removeBtn.addEventListener('click', removeBook);
}

function removeBook(e) {
  removeFromDOM(e);
  removeFromArray(e);
}

function removeFromDOM(e) {
  e.target.parentNode.remove();
}

function getBookNameFromDOM(e) {
  return e.target.parentNode.querySelector('h3').textContent;
}

function removeFromArray(e) {
  const bookNameDOM = getBookNameFromDOM(e);
  libraryArray = libraryArray.filter((book) => book.name != bookNameDOM);
}

function changeReadStatus(e) {
  const bookObjFromArray = libraryArray.find(
    (book) => (book.name = getBookNameFromDOM(e))
  );
  bookObjFromArray.read = !bookObjFromArray.read;

  if (bookObjFromArray.read) {
    e.target.textContent = 'Read';
    e.target.classList.add('read');
  } else {
    e.target.textContent = 'Not Read';
    e.target.classList.remove('read');
  }
}
let readBtns;

function setReadBtnText() {
  readBtns = Array.from(document.querySelectorAll('.read-toggle'));
  const currentBtn = readBtns[readBtns.length - 1];
  if (isRead()) {
    currentBtn.textContent = 'Read';
    currentBtn.classList.add('read');
  } else {
    currentBtn.textContent = 'Not Read';
    currentBtn.classList.remove('read');
  }
}

function isRead() {
  return libraryArray[libraryArray.length - 1].read;
}

function debugPageInteractions() {
  if (form.getBoundingClientRect().height == 0) {
    form.style.display = 'none';
    bookDisplay.style.zIndex = 1;
    tint.style.display = 'none';
  }
}

addBookBtn.addEventListener('click', expandForm);
tint.addEventListener('click', collapseForm);
submitBtn.addEventListener('click', createBook);
submitBtn.addEventListener('keydown', createBook);

window.onload = () => {
  collapseForm();
};

function Book(name, author, pages, read) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.output = function () {
  return `${this.name} by ${this.author} is ${this.pages} pages long. Has it been read? ${this.read}`;
};

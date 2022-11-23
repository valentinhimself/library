function Book(name, author, pages, read) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.output = function(){
    return `${this.name} by ${this.author} is ${this.pages} pages long. Has it been read? ${this.read}`
}

const form = document.querySelector('form');
const addBookBtn = document.querySelector('.add__div button');
const tint = document.querySelector('.tint');

addBookBtn.addEventListener('click', expandForm);
tint.addEventListener('click', collapseForm);


function expandForm(e) {
    e.stopPropagation();
    form.classList.add('scale');
    applyTint();
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
}

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
const tint = document.querySelector('.tint')
addBookBtn.addEventListener('click', expandForm);

function expandForm() {
    form.classList.add('scale');
    applyTint();
}

function applyTint() {
    tint.classList.add('opacity');
}

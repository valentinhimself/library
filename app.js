function Book(name, author, pages, read) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.output = function(){
    return `${this.name} by ${this.author} is ${this.pages} pages long. Has it been read? ${this.read}`
}

//const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295', 'Yes');
const bookCollection = [
    { title: 'Don Quixote', year: 1605, author: 'Miguel de Cervantes', details: { hardcopy: true, numberOfPages: 300 } },
    { title: 'Lord of the Rings', year: 1954, author: 'J.R.R. Tolkien', details: { hardcopy: false, numberOfPages: 750 } },
    { title: 'Harry Potter and the Sorcerers Stone', year: 1998, author: ' J.K. Rowling', details: { hardcopy: false, numberOfPages: 250 } },
    { title: 'And Then There Were None', year: 1939, author: 'Agatha Christie', details: { hardcopy: true, numberOfPages: 154 } },
    { title: 'Alices Adventures in Wonderland', year: 1865, author: 'Lewis Carroll', details: { hardcopy: true, numberOfPages: 223 } },
    { title: 'The Lion, the Witch, and the Wardrobe', year: 1950, author: 'C.S. Lewis', details: { hardcopy: true, numberOfPages: 413 } },
    { title: 'Love in the Time of Cholera', year: 1985, author: 'Gabriel García Márquez', details: { hardcopy: false, numberOfPages: 195 } },
];

function bookSorter(bookList, year, isHardCopy) {
    return bookList.filter(item => item.year > year && item.details.hardcopy == isHardCopy)
    .map( item => item.title)
}

export { bookSorter };
const { bookSorter } = require('../main');

describe('JS algoritmus teszt book listára', () => {

    const bookCollection = [
        { title: 'Don Quixote', year: 1605, author: 'Miguel de Cervantes', details: {hardcopy: true, numberOfPages: 300}},
        { title: 'Lord of the Rings', year: 1954, author: 'J.R.R. Tolkien', details: {hardcopy: false, numberOfPages: 750}},
        { title: 'Harry Potter and the Sorcerers Stone', year: 1998, author: ' J.K. Rowling', details: {hardcopy: false, numberOfPages: 250}},
        { title: 'And Then There Were None', year: 1939, author: 'Agatha Christie', details: {hardcopy: true, numberOfPages: 154}},
        { title: 'Alices Adventures in Wonderland', year: 1865, author: 'Lewis Carroll', details: {hardcopy: true, numberOfPages: 223}},
        { title: 'The Lion, the Witch, and the Wardrobe', year: 1950, author: 'C.S. Lewis', details: {hardcopy: true, numberOfPages: 413}},
        { title: 'Love in the Time of Cholera', year: 1985, author: 'Gabriel García Márquez', details: {hardcopy: false, numberOfPages: 195}},
    ];

    test('Nem létező évszámra történő szűrés.', () => {
        const results = bookSorter(bookCollection, 2010, true);
        expect(results.length).toBe(0);
    });

     test('Minden könyvre szűr, hardcopy true érték mellett.', () => {
         const results = bookSorter(bookCollection, 1500, true);
         expect(results.length).toBe(4);
     });

     test('Minden könyvre szűr, hardcopy false érték mellett.', () => {
        const results = bookSorter(bookCollection, 1500, false);
        expect(results.length).toBe(3);
     })

     test('Az 1850 utáni könyvekre szűr, hardcopy false érték mellett.', () => {
        const results = bookSorter(bookCollection, 1850, false);
         expect(results.length).toBe(3);
     })

     test('Az 1960 utáni könyvekre szűr, hardcopy false érték mellett.', () => {
        const results = bookSorter(bookCollection, 1960, false);
         expect(results.length).toBe(2);
     })

     test('Az 1930 utáni könyvekre szűr, hardcopy false érték mellett.', () => {
        const results = bookSorter(bookCollection, 1930, false);
         expect(results.length).toBe(3);
     })

     test('Csak a film címekkel, mint string lista tér vissza a szűrés', () => {
        const results = bookSorter(bookCollection, 1960, false);
        expect(results.length).toBe(2);
        expect(results[0]).toBe('Harry Potter and the Sorcerers Stone');
        expect(results[1]).toBe('Love in the Time of Cholera');
     })
})
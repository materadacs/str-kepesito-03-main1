describe('Könyvlista felépítése', () => {
    const bookCollection = [
        { title: 'Don Quixote', isRead: true, author: 'Miguel de Cervantes' },
        { title: 'Lord of the Rings', isRead: false, author: 'J.R.R. Tolkien' },
        { title: 'Harry Potter and the Sorcerers Stone', isRead: true, author: ' J.K. Rowling' },
        { title: 'And Then There Were None', isRead: true, author: 'Agatha Christie' },
        { title: 'Alices Adventures in Wonderland', isRead: false, author: 'Lewis Carroll' },
        { title: 'The Lion, the Witch, and the Wardrobe', isRead: true, author: 'C.S. Lewis' },
        { title: 'Love in the Time of Cholera', isRead: true, author: 'Gabriel García Márquez' },
    ]

    beforeEach(() => {
        const htmlTemplate =
            `<section>
            <p>Könyvespolc</p>
            <div>
                <ul id="container"></ul>
            </div>
        </section>`;
        document.body.innerHTML = htmlTemplate;
    });

    test('Az összes könyv kilistázása csak eygszer zajlik le.', () => {
        const { getMyBookList } = require('../dom');
        const childresOfList = getMyBookList(bookCollection);

        const liElemList = document.getElementsByTagName('li');
        expect(liElemList.length).toBe(7);
    });

    test('A hozzáadott szövegek vastag betűvel megjelennek.', () => {
        const { getMyBookList } = require('../dom');
        getMyBookList(bookCollection);

        const liElementsList = document.getElementsByTagName('li');
        expect(liElementsList[0].innerHTML).toBe('<strong>Ezt a könyvet már olvastad:</strong> Don Quixote')
        expect(liElementsList[2].innerHTML).toBe('<strong>Ezt a könyvet már olvastad:</strong> Harry Potter and the Sorcerers Stone')
        expect(liElementsList[3].innerHTML).toBe('<strong>Ezt a könyvet már olvastad:</strong> And Then There Were None')
        expect(liElementsList[5].innerHTML).toBe('<strong>Ezt a könyvet már olvastad:</strong> The Lion, the Witch, and the Wardrobe')
        expect(liElementsList[6].innerHTML).toBe('<strong>Ezt a könyvet már olvastad:</strong> Love in the Time of Cholera')
    });

    test('Az olvasatlan könyvek mellett nem lesz vastagbetűs kísérőszöveg.', () => {
        const { getMyBookList } = require('../dom');
        getMyBookList(bookCollection);
        const liElementsList = document.getElementsByTagName('li');

        expect(liElementsList[1].innerHTML).toBe('Lord of the Rings')
        expect(liElementsList[4].innerHTML).toBe('Alices Adventures in Wonderland')
    });

    test('A changeConfigStyle metódus megfelelően manipuálja a stílus jegyeket.', () => {
        const { changeConfigStyle } = require('../dom');
        changeConfigStyle();

        const sectionElement = document.querySelector('section');
        const divElement = document.querySelector('div');
        const pElement = document.querySelector('p');

        expect(sectionElement.style.border).toBe('3px solid red');
        expect(divElement.style.display).toBe('flex');
        expect(divElement.style.justifyContent).toBe('center');
        expect(pElement.style.textAlign).toBe('center');
        expect(pElement.style.color).toBe('red');
    });

    test('Ha meghívjuk a listBook függvényt, megjelennek a stílus jegyek is', () => {
        const { getMyBookList } = require('../dom');
        getMyBookList(bookCollection);

        const sectionElement = document.querySelector('section');
        const divElement = document.querySelector('div');
        const pElement = document.querySelector('p');

        expect(sectionElement.style.border).toBe('3px solid red');

        expect(divElement.style.display).toBe('flex');
        expect(divElement.style.justifyContent).toBe('center');

        expect(pElement.style.textAlign).toBe('center');
        expect(pElement.style.color).toBe('red');
    });

})
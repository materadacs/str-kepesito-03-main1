const bookCollection = [
    { title: 'Don Quixote', isRead: true, author: 'Miguel de Cervantes' },
    { title: 'Lord of the Rings', isRead: false, author: 'J.R.R. Tolkien' },
    { title: 'Harry Potter and the Sorcerers Stone', isRead: true, author: ' J.K. Rowling' },
    { title: 'And Then There Were None', isRead: true, author: 'Agatha Christie' },
    { title: 'Alices Adventures in Wonderland', isRead: false, author: 'Lewis Carroll' },
    { title: 'The Lion, the Witch, and the Wardrobe', isRead: true, author: 'C.S. Lewis' },
    { title: 'Love in the Time of Cholera', isRead: true, author: 'Gabriel García Márquez' },
]

function getMyBookList(bookCollection) {

    let readBooks = []
    readBooks.push(bookCollection.filter(item => item.isRead == true).map(item => item.title))
    let unReadBooks = []
    unReadBooks.push(bookCollection.filter(item => item.isRead == false).map(item => item.title))
    document.getElementById("container").innerHTML = `<li>${unReadBooks[0][0]}</li><li>${unReadBooks[0][1]}</li><li><strong>Ezt a könyvet már olvastad: ${readBooks[0][0]}</strong></li><li><strong>Ezt a könyvet már olvastad: ${readBooks[0][1]}</strong></li><li><strong>Ezt a könyvet már olvastad: ${readBooks[0][2]}</strong></li><li><strong>Ezt a könyvet már olvastad: ${readBooks[0][3]}</strong></li><li><strong>Ezt a könyvet már olvastad: ${readBooks[0][4]}</strong></li>`;

    return console.log(readBooks)
}
getMyBookList(bookCollection)

function changeConfigStyle() {
    document.querySelectorAll('section').forEach(e => {
        e.style.border = '3px solid red'
    });
    document.querySelectorAll('div').forEach(e => {
        e.style.display = 'flex'
        e.style.justifyContent = 'center'
    });
    document.querySelectorAll('p').forEach(e => {
        e.style.textAlign = 'center'
        e.style.color = 'red'
    })
}

changeConfigStyle()

export { getMyBookList, changeConfigStyle };
let list = document.querySelector('#list')
let panel = document.querySelector('#show-panel')
let userInfo;

document.addEventListener("DOMContentLoaded", function() {
    getBooks()
    getInfo()
})

function getBooks() {
    fetch('http://localhost:3000/books')
      .then(res => res.json())
      .then(books => placeBook(books))
  }

  function getInfo(){
      fetch('http://localhost:3000/users' + '/' + 1)
      .then(res => res.json())
      .then(user => setInfo(user))
  }

  function setInfo(user){
      userInfo = user
  }


function placeBook(books){
    books.forEach(book => {
        let li = document.createElement('li')
        li.innerText = book.title
        list.append(li)
        li.addEventListener('click', function(){
            while(panel.hasChildNodes()){
                panel.removeChild(panel.lastChild)
            }
            bookContent(book)
        })
    })
}


function bookContent(book){
    let h2 = document.createElement('h2')
    h2.innerText = book.title
    let img = document.createElement('img')
    img.setAttribute('src', book.img_url)
    let p = document.createElement('p')
    p.innerText = book.description
    let btn = document.createElement('button')
    btn.innerText = "Read Book"
    btn.addEventListener('click', function(e){
        e.preventDefault
        createLike(book)
        console.log(book.users)
    })

    panel.append(h2)
    panel.append(img)
    panel.append(p)
    panel.append(btn)
}


function createLike(book){
    let bookUsers = book.users;
    bookUsers.push(userInfo);
    fetch('http://localhost:3000/books' + '/' + `${book.id}`,{
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            users: bookUsers
    })
})
let newUsrList = document.createElement('ul')
for (var key in bookUsers){
    if(key == 'username'){
        var li = document.createElement('li')
        li.innerText = bookUsers[key]
        newUsrList.append(li)
    }
}
panel.append(newUsrList)
}

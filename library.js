let submit_btn = document.getElementById("submit_btn");

// Defining the Book Class
class Book {
  constructor(title, author, genre) {
    this.title = title;
    this.author = author;
    this.genre = genre;
  }

  // Function Definition for Displaying Book on the Table
  display() {
    let myhtml = `
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>${this.title}</td>
            <td>${this.author}</td>
            <td>${this.genre}</td>
          </tr>
          
        </tbody>
        `;
    let mytable = document.getElementById("mytable");
    mytable.innerHTML += myhtml;
  }
}

submit_btn.addEventListener("click", function (e) {
  let _title = document.getElementById("title").value;
  let _author = document.getElementById("author").value;
  let _programming = document.getElementById("programming");
  let _horror = document.getElementById("horror");
  let _fiction = document.getElementById("fiction");
  let _genre;

  if (_programming.checked) {
    _genre = _programming.value;
  } else if (_horror.checked) {
    _genre = _horror.value;
  } else if (_fiction.checked) {
    _genre = _fiction.value;
  }
  let mybook = new Book(_title, _author, _genre);

  // console.log(mybook);

  document.getElementById("title").value = "";
  document.getElementById("author").value = "";

  let mybooks = localStorage.getItem("books");
  if (mybooks == null) {
    booksObj = [];
  } else {
    booksObj = JSON.parse(mybooks);
  }
  booksObj.push(mybook);
  localStorage.setItem("books", JSON.stringify(booksObj));
  showAll();
  e.preventDefault();
});

showAll();

function deleteBook(index) {
  let mybooks = localStorage.getItem("books");
  let booksObj;

  if (mybooks == null) {
    booksObj = [];
  } else {
    booksObj = JSON.parse(mybooks);
  }
  booksObj.splice(index, 1);
  localStorage.setItem("books", JSON.stringify(booksObj));
  showAll();
}

function bindDeleteButtonListeners() {
  let delbtn = document.getElementsByClassName("delete_button");

  Array.from(delbtn).forEach(function (btn) {
    btn.addEventListener("click", function () {
      let del_index = parseInt(btn.getAttribute("data_index"));
      deleteBook(del_index);
    });
  });
}

function showAll() {
  // ...
  let mybooks = localStorage.getItem("books");
  let booksObj;

  if (mybooks == null) {
    booksObj = [];
  } else {
    booksObj = JSON.parse(mybooks);
  }

  let html = "";

  booksObj.forEach(function (book, index) {
    html += `
      <tr>
        <th scope="row">${index + 1}</th>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.genre}</td> 
        <td><button type="button" class="delete_button btn btn-primary" data_index = ${index} >Delete</button> </td>
      </tr>
    `;
  });

  // Update the HTML table with the generated HTML string
  document.getElementById("mytable").innerHTML = html;

  // Bind delete button listeners again after updating the table
  bindDeleteButtonListeners();
}

showAll(); // Bind delete button listeners on initial page load

function show_filtered() {
  let search_input = document.getElementById("search_input");
  let search_query = search_input.value.toLowerCase().trim();
  let mybooks = localStorage.getItem("books");
  let booksObj;

  if (mybooks == null) {
    booksObj = [];
  } else {
    booksObj = JSON.parse(mybooks);
  }

  let html = "";

  if (search_query === "") {
    booksObj.forEach(function (book, index) {
      html += `
        <tr>
          <th scope="row">${index + 1}</th>
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.genre}</td> 
          <td><button type="button" class="delete_button btn btn-primary" data_index="${index}">Delete</button></td>
        </tr>
      `;
    });
  } else {
    booksObj.forEach(function (book, index) {
      if (
        book.title.toLowerCase().includes(search_query) ||
        book.author.toLowerCase().includes(search_query) ||
        book.genre.toLowerCase().includes(search_query)
      ) {
        html += `
          <tr>
            <th scope="row">${index + 1}</th>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.genre}</td> 
            <td><button type="button" class="delete_button btn btn-primary" data_index="${index}">Delete</button></td>
          </tr>
        `;
      }
    });
  }

  document.getElementById("mytable").innerHTML = html;
  bindDeleteButtonListeners();
}

let search_btn = document.getElementById("search_btn");
search_btn.addEventListener("click", function (e) {
  show_filtered();
  e.preventDefault();
});

// ...

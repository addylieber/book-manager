import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import bookData from './book-data';

@Component({ 
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public bookList;

  constructor(private dialog: MatDialog,
              private snackBar: MatSnackBar) {
    this.bookList = AppComponent.getBookList();
    if (this.bookList.length === 0 && window.location.search === '?load') {
      this.bookList = AppComponent.loadBooksFromApp();
    }
  }

  addBook() {
    // open a dialog for adding a new book
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '300px'
    });
    
    // when that dialog is closed
    dialogRef.afterClosed().subscribe(book => {
      // if a new book is entered
      if (book) {
         // add that book to my list of books
        this.bookList.push(book);
        // save my list of books
        AppComponent.saveBookList(this.bookList);
         //display a message to the user that their book was added
        this.snackBar.open(`Added ${book.name}!`, undefined, {
          duration: 5000,
          verticalPosition:"top"
        });
      }
    });
  }

  editBook(book) {
    //open a dialog for editing books 
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '300px',
      data: Object.assign({}, book)
    });

    //when the dialog is closed
    dialogRef.afterClosed().subscribe(updatedBook => {
      //if a book is updated
      if (updatedBook) {
        //make that update to the book
        Object.assign(book,updatedBook);
       //save my list of books 
        AppComponent.saveBookList(this.bookList);
        //display a message to the user that thier book was updated 
        this.snackBar.open(`Updated ${book.name}!`, undefined, {
          duration: 5000,
          verticalPosition:"top"
        });
      }
    }); 
  }

  deleteBook(index) {
    //remove book from list
    let book = this.bookList.splice(index,1)[0];
    //save my updated book list
    AppComponent.saveBookList(this.bookList);
    //display a message to user that their book was deleted
    this.snackBar.open(`Deleted ${book.name}`, undefined, {
          duration: 5000,
          verticalPosition:"top"
        });
  }

  getTotalPages() {
    // start total at zero
    let total = 0;
    // for each book
    this.bookList.forEach(book => {
      //  if book has pages
      if (book.pages){
        // add the books pages to the total
        total = total + book.pages;
      }
    });
    //give total
    return total;
  }

  // get book list from local storage inside the browser
  static getBookList() {
    let bookListString = localStorage.getItem('bookList');
    return bookListString ? JSON.parse(bookListString) : [];
  }

  // save book list in local storage inside the browser
  static saveBookList(bookList) {
    localStorage.setItem('bookList', JSON.stringify(bookList));
  }

  static loadBooksFromApp() {
    AppComponent.saveBookList(bookData);
    return bookData;
  }
  
}

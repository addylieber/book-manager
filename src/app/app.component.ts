import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';

@Component({ 
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public bookList;

  constructor(private dialog: MatDialog,
              private snackBar: MatSnackBar) {
    this.bookList = AppComponent.getFoodList();
  }

  addFood() {
    // open a dialog for adding a new food
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
        AppComponent.saveFoodList(this.bookList);
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
        AppComponent.saveFoodList(this.bookList);
//display a message to the user that thier book was updated 
        this.snackBar.open(`Updated ${book.name}!`, undefined, {
          duration: 5000,
          verticalPosition:"top"
        });
      }
    }); 
  }

  deleteFood(index) {
//remove book from list
    let book = this.bookList.splice(index,1)[0];
//save my updated book list
    AppComponent.saveFoodList(this.bookList);
//display a message to user that their book was added
    this.snackBar.open(`Deleted ${book.name}`, undefined, {
          duration: 5000,
          verticalPosition:"top"
        });
  }

  getTotalCalories() {
  // start total at zero
    let total = 0;
  // for each book
    this.bookList.forEach(book => {
  //  if book has pages
      if (book.calories){
  // add the total to the new or updated books calories
        total = total + book.pages;
      }
    });
    //give total
    return total;
  }

  // get book list from local storage inside the browser
  static getFoodList() {
    let foodListString = localStorage.getItem('foodList');
    return foodListString ? JSON.parse(foodListString) : [];
  }

  // save book list in local storage inside the browser
  static saveFoodList(foodList) {
    localStorage.setItem('foodList', JSON.stringify(foodList));
  }

  // addFood() {
   // this.foodList.push({
  //     name: "spaghetti",
  //     foodGroup: "grain"
  //   });
  // }
}

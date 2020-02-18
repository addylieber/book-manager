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
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(book => {
      if (book) {
        this.bookList.push(book);
        AppComponent.saveFoodList(this.bookList);
        this.snackBar.open(`Added ${book.name}!`, undefined, {
          duration: 5000,
          verticalPosition:"top"
        });
      }
    });
  }

  editFood(book) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '300px',
      data: Object.assign({}, book)
    });

    dialogRef.afterClosed().subscribe(updatedBook => {
      if (updatedBook) {
        Object.assign(book,updatedBook);
        AppComponent.saveFoodList(this.bookList);
        this.snackBar.open(`Updated ${book.name}!`, undefined, {
          duration: 5000,
          verticalPosition:"top"
        });
      }
    }); 
  }

  deleteFood(index) {
    let book = this.bookList.splice(index,1)[0];
    AppComponent.saveFoodList(this.bookList);
    this.snackBar.open(`Deleted ${book.name}`, undefined, {
          duration: 5000,
          verticalPosition:"top"
        });
  }

  getTotalCalories() {
    let total = 0;
    this.bookList.forEach(book => {
      if (book.calories){
        total = total + book.calories;
      }
    });
    return total;
  }

  static getFoodList() {
    let foodListString = localStorage.getItem('foodList');
    return foodListString ? JSON.parse(foodListString) : [];
  }

  static saveFoodList(foodList) {
    localStorage.setItem('foodList', JSON.stringify(foodList));
  }

  // addFood() {
  //   this.foodList.push({
  //     name: "spaghetti",
  //     foodGroup: "grain"
  //   });
  // }
}

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
  public foodList;

  constructor(private dialog: MatDialog,
              private snackBar: MatSnackBar) {
    this.foodList = AppComponent.getFoodList();
  }

  addFood() {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(food => {
      if (food) {
        this.foodList.push(food);
        AppComponent.saveFoodList(this.foodList);
        this.snackBar.open(`Added ${food.name}!`, undefined, {
          duration: 5000,
          verticalPosition:"top"
        });
      }
    });
  }

  editFood(food) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '300px',
      data: Object.assign({}, food)
    });

    dialogRef.afterClosed().subscribe(updatedFood => {
      if (updatedFood) {
        Object.assign(food,updatedFood);
        AppComponent.saveFoodList(this.foodList);
        this.snackBar.open(`Updated ${food.name}!`, undefined, {
          duration: 5000,
          verticalPosition:"top"
        });
      }
    }); 
  }

  deleteFood(index) {
    let food = this.foodList.splice(index,1)[0];
    AppComponent.saveFoodList(this.foodList);
    this.snackBar.open(`Deleted ${food.name}`, undefined, {
          duration: 5000,
          verticalPosition:"top"
        });
  }

  getTotalCalories() {
    let total = 0;
    this.foodList.forEach(food => {
      if (food.calories){
        total = total + food.calories;
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

import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {

  public title: string;

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public food) {
      this.title = this.food ? "Edit Your Food" : "Add Your New Food";
      this.food = this.food || {};
    }

  ngOnInit(): void {
  }

  onCancel(): void {
    this.dialogRef.close();
  
  }
  onOk(): void {
    this.dialogRef.close(this.food);
  }
}

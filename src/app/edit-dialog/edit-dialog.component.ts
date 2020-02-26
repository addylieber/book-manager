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
    @Inject(MAT_DIALOG_DATA) 
    public book) {
      this.title = this.book ? "Edit Your Book" : "Add Your New Book";
      this.book = this.book || {};
    }

  ngOnInit(): void {
  }

  onCancel(): void {
    this.dialogRef.close();
  
  }
  onOk(): void {
    this.dialogRef.close(this.book);
  }
}

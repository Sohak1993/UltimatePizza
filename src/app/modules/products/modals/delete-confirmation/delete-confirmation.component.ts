import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.scss']
})
export class DeleteConfirmationComponent {

  constructor(
    public dialogRef : MatDialogRef<DeleteConfirmationComponent>
    ){}

  onCancel(){
    this.dialogRef.close({ data: false })
  }

  onValidate(){
    this.dialogRef.close({ data: true })
  }
  
}

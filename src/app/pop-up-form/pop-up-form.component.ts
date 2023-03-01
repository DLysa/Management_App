import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-pop-up-form',
  templateUrl: './pop-up-form.component.html',
  styleUrls: ['./pop-up-form.component.css']
})
export class PopUpFormComponent implements OnInit {

  form: FormGroup;
  title: string ;
  description: string;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PopUpFormComponent>,
    @Inject(MAT_DIALOG_DATA) data:any) {

    this.description = data.description;
  }

  ngOnInit(): void {

    this.form = this.fb.group({
      title: [this.title,[]],
      description: [this.description, []],

    });
  }
  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

}

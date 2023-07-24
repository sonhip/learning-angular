import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PeopleService } from '../serices/people.service';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
})
export class PersonComponent implements OnInit {
  education: string[] = [
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate',
  ];
  form!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _peopleService: PeopleService,
    private _dialogRef: MatDialogRef<PersonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.form = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      company: '',
    });
  }

  ngOnInit(): void {
    this.form.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.form.valid) {
      if (this.data) {
        this._peopleService
          .updatePerson(this.data.id, this.form.value)
          .subscribe({
            next: (data) => {
              this._coreService.openSnackBar(
                'person updated successfully!',
                'done'
              );
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._peopleService.addPerson(this.form.value).subscribe({
          next: (data) => {
            this._coreService.openSnackBar(
              'person added successfully!',
              'done'
            );
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}

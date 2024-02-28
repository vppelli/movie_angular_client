// src/app/user-registration-form/user-registration-form.component.ts

import { Component, OnInit, Input } from '@angular/core';
// This import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// This import brings in the API calls
import { UserRegistrationService } from '../fetch-api-data.service';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

/**
* This component is for the User registration form where user signup and create a account.
* @module UserRegistrationFormComponent - Gives access to signup form.
*/
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {
  /**
  * Inputs User data from the Forms input field { Username, Password, Email, Birthday}
  * @type {object} - holds 4 objects
  * @property {input} - input property for the form
  */
  @Input() userDetails = { Username: '', Password: '', Email: '', Birthday: '' };

  /**
  * This constructer contains Api Data, DialogRef, Snackbar
  * @param {MatDialogRef} dialogRef - Reference to a dialog opened via the MatDialog service.
  * @param {UserRegistrationService} fetchApiData - Fetches API Data from '../fetch-api-data.service'.
  * @param {MatSnackBar} snackBar - Angular Material's MatSnackBar service for displaying a message on a bar.
  */
  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  /**
  * This is the function responsible for sending the form inputs to the backend
  * @module UserRegistrationService - holds the API Data
  * @returns {MatSnackBar} - snackbar message saying "Account Created" if Successful.
  */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userDetails).subscribe(() => {
      this.dialogRef.close(); // This will close the modal on success!
      this.snackBar.open('Account Created', 'Return to Login page', {
        duration: 2000
      });
    }, (result) => {
      // console.log(result);
      this.snackBar.open(result, 'Error: Failed to Signup', {
        duration: 2000
      });
    });
  }

}

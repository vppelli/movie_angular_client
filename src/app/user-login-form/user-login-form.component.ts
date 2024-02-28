// src/app/user-login-form/user-login-form.component.ts

import { Component, OnInit, Input } from '@angular/core';
// This import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// This import brings in the API calls
import { UserRegistrationService } from '../fetch-api-data.service';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
// This import is used to navigate among views
import { Router } from '@angular/router';

/**
* This component is for the User login form where user can login and enter the app.
* @module UserLoginFormComponent - Gives access to login form.
*/
@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {
  /**
  * Inputs User data from the Forms input field { Username, Password}
  * @type {object} - holds 2 objects
  * @property {input} - input property for the form
  */
  @Input() userData = { Username: '', Password: '' };
  
  /**
  * This constructer contains Api Data, DialogRef, Snackbar, Router
  * @param {MatDialogRef} dialogRef - Reference to a dialog opened via the MatDialog service.
  * @param {UserRegistrationService} fetchApiData - Fetches API Data from '../fetch-api-data.service'.
  * @param {MatSnackBar} snackBar - Angular Material's MatSnackBar service for displaying a message on a bar.
  * @param {Router} router - Provides navigation among views and URL manipulation capabilities.
  */
  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}
  ngOnInit(): void {
  }

  /**
  * This is the function responsible for sending the form inputs to the backend
  * @module UserRegistrationService - holds the API Data
  * @returns {MatSnackBar} - snackbar message saying "Account Logged In" if Successful.
  */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
      localStorage.setItem('user', JSON.stringify(result.user));
      localStorage.setItem('token', result.token);
      this.dialogRef.close(); // This will close the modal on success!
      this.snackBar.open('Account Logged In', 'Successful', {
        duration: 2000
      });
      this.router.navigate(['movies']); // Navigates to movies page on success!
    }, (result) => {
      // console.log(result);
      this.snackBar.open(result, 'Error: Failed to Login', {
        duration: 2000
      });
    });
  }

}

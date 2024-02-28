// src/app/welcome-page/welcome-page.component.ts

import { Component, OnInit } from '@angular/core';
// This imports the Components needed
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
// This imports the Angular Material's MatDialog service
import { MatDialog } from '@angular/material/dialog';

/**
* This component is for the welcome page where user start on the app.
* @module WelcomePageComponent - Gives access to user login and signup dialog.
*/
@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  /**
  * This constructer contains MatDialog
  * @param {MatDialog} dialog - Angular Material's MatDialog service for opening dialogs.
  */
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  /**
  * This component opens the Signup dialog where user can signup.
  * @returns {UserRegistrationFormComponent} - The components dialog
  */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
    });
  }
  
  /**
  * This component opens the Login dialog where user can login.
  * @returns {UserLoginFormComponent} - The components dialog
  */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
    });
  }
}
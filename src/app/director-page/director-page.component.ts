// src/app/director-page/director-page.component.ts

import { Component, OnInit } from '@angular/core';
// This import brings in the API calls
import { UserRegistrationService } from '../fetch-api-data.service';
// This imports the Angular Material's MatDialog service
import { MatDialog } from '@angular/material/dialog';
// This imports the Components needed
import { DirectorCardComponent } from '../director-card/director-card.component';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
// This import is used to navigate among views
import { Router } from '@angular/router';

/**
* This component is for the Users Profile.
* @module DirectorPageComponent - Gives access to all director information.
*/
@Component({
  selector: 'app-director-page',
  templateUrl: './director-page.component.html',
  styleUrl: './director-page.component.scss'
})
export class DirectorPageComponent implements OnInit {

  directors: any = [];

  /**
  * This constructer contains Api Data.
  * @param {UserRegistrationService} fetchApiData - Fetches API Data from '../fetch-api-data.service'.
  * @param {MatSnackBar} snackBar - Angular Material's MatSnackBar service for displaying a message on a bar.
  * @param {Router} router - Provides navigation among views and URL manipulation capabilities.
  * @param {MatDialog} dialog - Angular Material's MatDialog service for opening dialogs.
  */
  constructor(public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router
    ) { }

  ngOnInit(): void {
    this.getDirectors();
  }

  /**
  * This is the function responsible for getting the director list from the backend.
  * @module UserRegistrationService - holds the API Data
  * @returns {any} - List of directors from the API.
  */
  getDirectors(): void {
    this.fetchApiData.getAllDirectors().subscribe((response: any) => {
      this.directors = response;
      return this.directors;
    });
  }

  /**
  * This component opens the Profile page.
  * @returns {UserProfileComponent} - The components page
  */
  openProfile(): void {
    this.router.navigate(['profile']); // Navigates to profile page on success!
    this.snackBar.open('Profile Page', 'OK', {
      duration: 2000
    });
  }
  /**
  * This component opens the Genre page.
  * @returns {GenrePageComponent} - The components page
  */
  openGenres(): void {
    this.router.navigate(['genres']); // Navigates to genre page on success!
    this.snackBar.open('Genres Page', 'OK', {
      duration: 2000
    });
  }
  /**
  * This component opens the Movie page.
  * @returns {MovieCardComponent} - The components page
  */
  openMovies(): void {
    this.router.navigate(['movies']); // Navigates to movies page on success!
    this.snackBar.open('Directors Page', 'OK', {
      duration: 2000
    });
  }

  /**
  * This component Logs you out.
  * @returns {WelcomePageComponent} - The components page
  */
  logOut(): void {
    this.router.navigate(['welcome']); // Navigates to welcome page on success!
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.snackBar.open('Logged out', 'OK', {
      duration: 2000
    });
  }
}

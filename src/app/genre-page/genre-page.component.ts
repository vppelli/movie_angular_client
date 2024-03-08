// src/app/genre-page/genre-page.component.ts

import { Component, OnInit } from '@angular/core';
// This import brings in the API calls
import { UserRegistrationService } from '../fetch-api-data.service';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
// This import is used to navigate among views
import { Router } from '@angular/router';

/**
* This component is for the Users Profile.
* @module GenrePageComponent - Gives access to all genre information.
*/
@Component({
  selector: 'app-genre-page',
  templateUrl: './genre-page.component.html',
  styleUrl: './genre-page.component.scss'
})
export class GenrePageComponent implements OnInit {

  genres: any = [];

  /**
  * This constructer contains Api Data.
  * @param {UserRegistrationService} fetchApiData - Fetches API Data from '../fetch-api-data.service'.
  * @param {MatSnackBar} snackBar - Angular Material's MatSnackBar service for displaying a message on a bar.
  * @param {Router} router - Provides navigation among views and URL manipulation capabilities.
  */
  constructor(public fetchApiData: UserRegistrationService,
    public snackBar: MatSnackBar,
    public router: Router
    ) { }

  ngOnInit(): void {
    this.getGenres();
  }

  /**
  * This is the function responsible for getting the genre list from the backend.
  * @module UserRegistrationService - holds the API Data
  * @returns {any} - List of genres from the API.
  */
  getGenres(): void {
    this.fetchApiData.getAllGenres().subscribe((response: any) => {
      this.genres = response;
      return this.genres;
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
    * This component opens the Movie page.
    * @returns {MovieCardComponent} - The components page
    */
    openMovies(): void {
      this.router.navigate(['movies']); // Navigates to movie page on success!
      this.snackBar.open('Movies Page', 'OK', {
        duration: 2000
      });
    }
    /**
    * This component opens the Director page.
    * @returns {DirectorPageComponent} - The components page
    */
    openDirectors(): void {
      this.router.navigate(['directors']); // Navigates to director page on success!
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
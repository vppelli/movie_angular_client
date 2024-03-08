// src/app/movie-card/movie-card.component.ts

import { Component, OnInit } from '@angular/core';
// This import brings in the API calls
import { UserRegistrationService } from '../fetch-api-data.service'
// This imports the Angular Material's MatDialog service
import { MatDialog } from '@angular/material/dialog';
// This import will display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
// This imports the Components needed
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { DescriptionCardComponent } from '../description-card/description-card.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { GenrePageComponent } from '../genre-page/genre-page.component';
import { DirectorPageComponent } from '../director-page/director-page.component';
// This import is used to navigate among views
import { Router } from '@angular/router';
import { WelcomePageComponent } from '../welcome-page/welcome-page.component';

/**
* This component is for the Movie page form where user can view movies on the app.
* @module MovieCardComponent - Gives access to movie list.
*/
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {

  user: any = {};
  movies: any[] = [];
  FavoriteMovies: any[] = [];

  /**
  * This constructer contains Api Data, DialogRef, Snackbar, Router
  * @param {MatDialog} dialog - Angular Material's MatDialog service for opening dialogs.
  * @param {UserRegistrationService} fetchApiData - Fetches API Data from '../fetch-api-data.service'.
  * @param {MatSnackBar} snackBar - Angular Material's MatSnackBar service for displaying a message on a bar.
  * @param {Router} router - Provides navigation among views and URL manipulation capabilities.
  */
  constructor(public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavorite();
  }

  /**
  * This is the function responsible for getting movie list from the backend.
  * @module UserRegistrationService - holds the API Data
  * @returns {any} - List of movies from the API
  */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((response: any) => {
      this.movies = response;
      return this.movies;
    });
  }

  /**
  * This is the function responsible for getting User favorite list from the backend.
  * @module UserRegistrationService - holds the API Data
  * @returns {any} - List of Favorite movies from the API
  */
  getFavorite(): void {
    this.user = this.fetchApiData.getFavorites();
    this.FavoriteMovies = this.user.FavoriteMovies;
  }

  /**
  * This is the function responsible for adding User favorite to the backend.
  * @module UserRegistrationService - holds the API Data
  * @param {any} title  - Movie ID.
  * @returns {MatSnackBar} - snackbar message saying "Movie was added to favorites" if Successful.
  */
  addFavorites(title: any): void {
    if (this.isFavorite(title)) {
      this.deleteFavorites(title);
      console.log(title);
    } else {
      this.fetchApiData.addFavorites(title).subscribe((response) => {
        this.snackBar.open('Movie was added to favorites', 'OK', {
          duration: 2000,
        });
        localStorage.setItem('user', JSON.stringify(response));
        this.getFavorite();
      });
      console.log('Error', title);
    }
  }

  /**
  * This is the function responsible for deleting User favorite from the backend.
  * @module UserRegistrationService - holds the API Data
  * @param {any} title  - Movie ID.
  * @returns {MatSnackBar} - snackbar message saying "Movie was removed from favorites" if Successful.
  */
  deleteFavorites(title: any): void {
    this.fetchApiData.deleteFavorites(title).subscribe((response) => {
      this.snackBar.open('Movie was removed from favorites', 'OK', {
        duration: 2000,
      });
      localStorage.setItem('user', JSON.stringify(response));
      this.getFavorite();
    });
  }

  /**
   * This is the function responsible for checking if the movie is a favorite movie.
   * @param {any} movie  - Movie object to check.
   * @returns {boolean} - Boolean indicating whether the movie is a favorite.
   */
  isFavorite(movie: any): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.FavoriteMovies.indexOf(movie) >= 0;
  }

  /**
  * This component opens the Genre dialog.
  * @param {any} Genres - Information about the Genre
  * @returns {GenreCardComponent} - The components dialog
  */
  openGenreDialog(Genres: any[]): void {
    this.dialog.open(GenreCardComponent, {
      data: Genres,
      width: '580px'
    });
  }
  /**
  * This component opens the Director dialog.
  * @param {any} Director - Information about the Director
  * @returns {DirectorCardComponent} - The components dialog
  */
  openDirectorDialog(Director: any[]): void {
    this.dialog.open(DirectorCardComponent, {
      data: Director,
      width: '580px'
    });
  }
  /**
  * This component opens the Description of the movies dialog.
  * @param {string} Description - Information about the Movie
  * @returns {DescriptionCardComponent} - The components dialog
  */
  openDescriptionDialog(Description: string): void {
    this.dialog.open(DescriptionCardComponent, {
      data: {
        Description: Description
      },
      width: '580px'
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
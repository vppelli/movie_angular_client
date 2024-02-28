// src/app/movie-card/movie-card.component.ts

import { Component, OnInit, Input } from '@angular/core';
// This import brings in the API calls
import { UserRegistrationService } from '../fetch-api-data.service';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
// This import is used to navigate among views
import { Router } from '@angular/router';

/**
* This component is for the Users Profile.
* @module UserProfileComponent - Gives access to users profile information.
*/
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  /**
  * Inputs User data from the Forms input field { Username, Password, Email, Birthday, FavoriteMovies}
  * @type {object} - holds {Username, Password, Email, Birthday, FavoriteMovies}
  * @property {input} - input property for the form
  */
  @Input() userDetails: any = { Username: '', Password: '', Email: '', Birthday: '', FavoriteMovies: [] };

  user: any = {};
  movies: any[] = [];
  FavoriteMovies: any[] = [];

  /**
  * This constructer contains Api Data, Router, Snackbar
  * @param {UserRegistrationService} fetchApiData - Fetches API Data from '../fetch-api-data.service'.
  * @param {MatSnackBar} snackBar - Angular Material's MatSnackBar service for displaying a message on a bar.
  * @param {Router} router - Provides navigation among views and URL manipulation capabilities.
  */
  constructor(public fetchApiData: UserRegistrationService,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getFavorite();
  }

  /**
  * This is the function responsible for Getting User data from storage.
  * @returns {object} - all information about the user
  */
  getUser(): void {
    this.user = this.fetchApiData.getUser();
    this.userDetails.Username = this.user.Username;
    this.userDetails.Email = this.user.Email;
    this.userDetails.Birthday = this.user.Birthday;
    this.userDetails.Password = this.user.Password;
    this.fetchApiData.getAllMovies().subscribe((response) => {
      this.FavoriteMovies = response.filter((movie: any) => this.user.FavoriteMovies.includes(movie._id));
    });
  }

  /**
  * This is the function responsible for sending the User data to the backend.
  * @module UserRegistrationService - holds the API Data
  * @returns {MatSnackBar} - snackbar message saying "Information Updated" if Successful.
  */
  updateUser(): void {
    this.fetchApiData.updateUser(this.userDetails).subscribe((result) => {
      localStorage.setItem('user', JSON.stringify(result));
      this.snackBar.open('Information Updated', 'Sucessful', {
        duration: 2000
      });
    }, (error) => {
      console.error('Error updating user:', error);
      this.snackBar.open('Failed to update', 'OK', {
        duration: 2000
      });
    });
  }

  /**
  * This is the function responsible for sending the user data delete request to the backend.
  * @module UserRegistrationService - holds the API Data
  * @returns {MatSnackBar} - snackbar message saying "Account Deleted" if Successful, and clears localStorage.
  */
  deleteUser(): void {
    this.router.navigate(['welcome']).then(() => {
      localStorage.clear();
      this.snackBar.open('Account Deleted', 'OK', {
        duration: 2000
      });
    })
    this.fetchApiData.deleteUser().subscribe((result) => {
      console.log(result);
    });
  }

  /**
  * This is the function responsible for getting movie list from the backend.
  * @module UserRegistrationService - holds the API Data
  * @returns {any} - List of movies from the API
  */
  getMovie(): void {
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
    this.userDetails.FavoriteMovies = this.user.FavoriteMovies;
    this.FavoriteMovies = this.user.FavoriteMovies;
  }

  /**
  * This is the function responsible for deleting User favorite from the backend.
  * @module UserRegistrationService - holds the API Data
  * @returns {MatSnackBar} - snackbar message saying "Movie was removed from favorites" if Successful.
  */
  deleteFavorites(title: any): void {
    this.user = this.fetchApiData.getUser();
    this.userDetails.Username = this.user.Username;
    this.fetchApiData.deleteFavorites(title).subscribe((result) => {
      localStorage.setItem('user', JSON.stringify(result));
      this.getFavorite();
      this.getUser();
      this.snackBar.open('Movie was removed from favorites', 'OK', {
        duration: 2000,
      });
    });
  }
}


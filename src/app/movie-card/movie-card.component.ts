// src/app/movie-card/movie-card.component.ts

import { Component, OnInit } from '@angular/core';
// This import brings in the API calls
import { UserRegistrationService } from '../fetch-api-data.service'
// This imports the Angular Material's MatDialog service
import { MatDialog } from '@angular/material/dialog';
// This imports the Components needed
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { DescriptionCardComponent } from '../description-card/description-card.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';

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
  genres: any = [];
  directors: any = [];
  FavoriteMovies: any[] = [];

  /**
  * This constructer contains Api Data, DialogRef, Snackbar, Router
  * @param {MatDialog} dialog - Angular Material's MatDialog service for opening dialogs.
  * @param {UserRegistrationService} fetchApiData - Fetches API Data from '../fetch-api-data.service'.
  */
  constructor(public fetchApiData: UserRegistrationService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavorite();
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

  // addFavorite(): void {

  // }
  // deleteFavorite(): void {

  // }

  /**
  * This component opens the Genre dialog.
  * @param {string} Name - Name of the Genre
  * @param {string} About - Information about the Genre
  * @returns {GenreCardComponent} - The components dialog
  */
  openGenreDialog(Name: string, About: string): void {
    this.dialog.open(GenreCardComponent, {
      data: {
        Name: Name,
        About: About
      },
      width: '580px'
    });
  }
  /**
  * This component opens the Director dialog.
  * @param {string} Name - Name of the Director
  * @param {string} Bio - Information about the Director
  * @param {number} Born - Birthday Date
  * @param {string} Dead - Provides information if Dead
  * @returns {DirectorCardComponent} - The components dialog
  */
  openDirectorDialog(Name: string, Bio: string, Born: number, Dead: string): void {
    this.dialog.open(DirectorCardComponent, {
      data: {
        Name: Name,
        Bio: Bio,
        Born: Born,
        Dead: Dead
      },
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
  * This component opens the Profile dialog.
  * @returns {UserProfileComponent} - The components dialog
  */
  openProfile(): void {
    this.dialog.open(UserProfileComponent, {
      width: '1280px'
    });
  }
}
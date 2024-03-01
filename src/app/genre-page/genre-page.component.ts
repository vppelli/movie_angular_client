// src/app/genre-page/genre-page.component.ts

import { Component, OnInit } from '@angular/core';
// This import brings in the API calls
import { UserRegistrationService } from '../fetch-api-data.service';

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
  */
  constructor(public fetchApiData: UserRegistrationService) { }

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
}
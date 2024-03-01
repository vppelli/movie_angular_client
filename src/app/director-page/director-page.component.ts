// src/app/director-page/director-page.component.ts

import { Component, OnInit } from '@angular/core';
// This import brings in the API calls
import { UserRegistrationService } from '../fetch-api-data.service';
// This imports the Angular Material's MatDialog service
import { MatDialog } from '@angular/material/dialog';
// This imports the Components needed
import { DirectorCardComponent } from '../director-card/director-card.component';

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
  */
  constructor(public fetchApiData: UserRegistrationService,
    public dialog: MatDialog) { }

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
      width: '1280px'
    });
  }
}

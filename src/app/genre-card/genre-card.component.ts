// src/app/genre-card/genre-card.component.ts

import { Component, OnInit, Inject } from '@angular/core';
// This imports Injection token that can be used to access the data that was passed into a dialog.
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
* This component is for the Genre card where user can view information about the genre on the app.
* @module GenreCardComponent - Provides information about the genre.
*/
@Component({
  selector: 'app-genre-card',
  templateUrl: './genre-card.component.html',
  styleUrl: './genre-card.component.scss'
})
export class GenreCardComponent implements OnInit {

  name: any = {};

  /**
  * This constructer contains data from the dialog data passed through.
  * @param data - Provides name and information about the genre.
  */
  constructor(
    @Inject(MAT_DIALOG_DATA)

    public data: {
      Name: string,
      About: string
    }
  ) { }

  ngOnInit(): void {
    
  }

  // Stringify(): void {
  //   this.name = JSON.stringify(this.data.Name);
  // }
}

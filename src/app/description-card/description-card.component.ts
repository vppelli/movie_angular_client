// src/app/description-card/description-card.component.ts

import { Component, OnInit, Inject } from '@angular/core';
// Injection token that can be used to access the data that was passed in to a dialog.
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
* This component is for the Description card where user can view information about the movie description on the app.
* @module DescriptionCardComponent - Provides information about the movie description.
*/
@Component({
  selector: 'app-description-card',
  templateUrl: './description-card.component.html',
  styleUrl: './description-card.component.scss'
})
export class DescriptionCardComponent implements OnInit{
  /**
  * This constructer contains data from the dialog data passed through.
  * @param data - Provides information about the movies description.
  */
  constructor(
    @Inject(MAT_DIALOG_DATA)

    public data: {
      Description: string
    }
  ) { }

  ngOnInit(): void {

  }
}


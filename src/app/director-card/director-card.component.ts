// src/app/director-card/director-card.component.ts

import { Component, OnInit, Inject } from '@angular/core';
// Injection token that can be used to access the data that was passed in to a dialog.
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
* This component is for the Director card where user can view information about the director on the app.
* @module DirectorCardComponent - Provides information about the director.
*/
@Component({
  selector: 'app-director-card',
  templateUrl: './director-card.component.html',
  styleUrl: './director-card.component.scss'
})
export class DirectorCardComponent implements OnInit {
  /**
  * This constructer contains data from the dialog data passed through.
  * @param data - Provides name and information about the director.
  */
  constructor(
    @Inject(MAT_DIALOG_DATA)

    public data: {
      Name: string,
      Bio: string,
      Born: number,
      Dead: string
    }[]
  ) { }

  ngOnInit(): void {

  }
}


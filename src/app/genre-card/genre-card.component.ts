import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-genre-card',
  templateUrl: './genre-card.component.html',
  styleUrl: './genre-card.component.scss'
})
export class GenreCardComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)

    public data: {
      Name: string,
      About: string
    }
  ) { }

  ngOnInit(): void {
    
  }
}

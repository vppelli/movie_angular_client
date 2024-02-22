import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director-card',
  templateUrl: './director-card.component.html',
  styleUrl: './director-card.component.scss'
})
export class DirectorCardComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)

    public data: {
      Name: string,
      Bio: string,
      Born: number,
      Dead: string
    }
  ) { }

  ngOnInit(): void {

  }
}


// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service'
import { MatDialog } from '@angular/material/dialog';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { DescriptionCardComponent } from '../description-card/description-card.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';

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

  constructor(public fetchApiData: UserRegistrationService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavorite();
  }

  getGenres(): void {
    this.fetchApiData.getAllGenres().subscribe((response: any) => {
      this.genres = response;
      return this.genres;
    });
  }

  getDirectors(): void {
    this.fetchApiData.getAllDirectors().subscribe((response: any) => {
      this.directors = response;
      return this.directors;
    });
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((response: any) => {
      this.movies = response;
      return this.movies;
    });
  }

  getFavorite(): void {
    this.user = this.fetchApiData.getFavorites();
    this.FavoriteMovies = this.user.FavoriteMovies;
  }

  // addFavorite(): void {

  // }
  // deleteFavorite(): void {

  // }

  openGenreDialog(Name: string, About: string): void {
    this.dialog.open(GenreCardComponent, {
      data: {
        Name: Name,
        About: About
      },
      width: '580px'
    });
  }
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
  openDescriptionDialog(Description: string): void {
    this.dialog.open(DescriptionCardComponent, {
      data: {
        Description: Description
      },
      width: '580px'
    });
  }
  openProfile(): void {
    this.dialog.open(UserProfileComponent, {
      width: '1280px'
    });
  }
}
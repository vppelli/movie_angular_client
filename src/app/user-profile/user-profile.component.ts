// src/app/movie-card/movie-card.component.ts
import { Component, OnInit, Input } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  @Input() userDetails: any = { Username: '', Password: '', Email: '', Birthday: '', FavoriteMovies: [] };

  user: any = {};
  movies: any[] = [];
  FavoriteMovies: any[] = [];

  constructor(public fetchApiData: UserRegistrationService,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getFavorite();
  }

  // Gets User information
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

  // Updates User information
  updateUser(): void {
    this.fetchApiData.updateUser(this.userDetails).subscribe((result) => {
      localStorage.setItem('user', JSON.stringify(result));
      this.snackBar.open('Information Updated', 'OK', {
        duration: 2000
      });
    }, (error) => {
      console.error('Error updating user:', error);
      this.snackBar.open('Failed to update', 'OK', {
        duration: 2000
      });
    });
  }

  // Deletes User information
  deleteUser(): void {
    this.router.navigate(['welcome']).then(() => {
      localStorage.clear();
      this.snackBar.open('Account Deleted.', 'OK', {
        duration: 2000
      });
    })
    this.fetchApiData.deleteUser().subscribe((result) => {
      console.log(result);
    });
  }

  // Get all movies and updates the movies property
  getMovie(): void {
    this.fetchApiData.getAllMovies().subscribe((response: any) => {
      this.movies = response;
      return this.movies;
    });
  }

  getFavorite(): void {
    this.user = this.fetchApiData.getFavorites();
    this.userDetails.FavoriteMovies = this.user.FavoriteMovies;
    this.FavoriteMovies = this.user.FavoriteMovies;
  }

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


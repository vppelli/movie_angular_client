// src/app/fetch-api-data.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://movie-mikes-7b54f5710543.herokuapp.com/';

/**
* This component is for fetching the API endpoints.
* @module UserRegistrationService - Gets access to API Endpoints.
*/
@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  /** This will provide HttpClient to the entire class, making it available via this.http
  * @param {HttpClient} http - Injects the HttpClient module to the http params
  */
  constructor(private http: HttpClient) {
  }

  /**
  * Making the api call for the user registration endpoint
  * @param {any} userDetails - Holds detials of the created user
  * @returns {Observable<any>} - Observable for the API response.
  */
  public userRegistration(userDetails: any): Observable<any> {
    // console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }
  /**
  * Making the api call for the user login endpoint
  * @param {any} userDetails - Holds detials of the user
  * @returns {Observable<any>} - Observable for the API response and token.
  */
  public userLogin(userDetails: any): Observable<any> {
    // console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
  * Making the api call for the Movies list endpoint
  * @returns {Observable<any>} - Observable for the API response of all the movies
  */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  /**
  * Making the api call for a movie endpoint
  * @param {string} title - Provides title of movie
  * @returns {Observable<any>} - Observable for the API response of the movie requested
  */
  getOneMovies(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/' + title, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
  * Making the api call for the Directors list endpoint
  * @returns {Observable<any>} - Observable for the API response of all directors
  */
  getAllDirectors(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'directors', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  /**
  * Making the api call for a Director endpoint
  * @param {string} name - Provides name of director
  * @returns {Observable<any>} - Observable for the API response of a director requested
  */
  getOneDirector(name: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'directors/' + name, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
  * Making the api call for the Genres List endpoint
  * @returns {Observable<any>} - Observable for the API response of all genres
  */
  getAllGenres(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'genres', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  /**
  * Making the api call for a genre endpoint
  * @param {string} name - Provides name of genre
  * @returns {Observable<any>} - Observable for the API response of a genre requested
  */
  getOneGenre(name: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'genres/' + name, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
  * Making the call for user information endpoint
  * @constant user - Provides user information from localStorage
  * @returns {Observable<any>} - Observable for the response of user
  */
  getUser(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user;
  }
  /**
  * Making the api call to update user information endpoint
  * @param {any} userDetails - Provides updated user information
  * @returns {Observable<any>} - Observable for the API response of updated user
  */
  updateUser(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + 'users/' + userDetails.Username + userDetails, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  /**
  * Making the api call to delete user information endpoint
  * @constant user - Provides user Username from localStorage
  * @returns {Observable<any>} - Observable for the API response of deleted user
  */
  deleteUser(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + user.Username, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
  * Making the api call for the user favorites endpoint
  * @constant user - Provides user Username from localStorage
  * @returns {Observable<any>} - Observable for the API response of the users favorite movies
  */
  getFavorites(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/' + user.Username, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  /**
  * Making the api call to add user favorite endpoint
  * @constant user - Provides user Username from localStorage
  * @param {any} title - Provides the movie title ID
  * @returns {Observable<any>} - Observable for the API response of added user favorite
  */
  addFavorites(title: any): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http.post(apiUrl + 'users/' + user.Username + '/movies/' + title, {}, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  /**
  * Making the api call to delete user favorite endpoint
  * @constant user - Provides user Username from localStorage
  * @param {any} title - Provides the movie title ID
  * @returns {Observable<any>} - Observable for the API response of deleted user favorite
  */
  deleteFavorites(title: string): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + user.Username + '/movies/' + title, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
  * Extract non-typed response data from the API response.
  * @param {any} res - API response.
  * @returns {any} - Extracted response data.
  * @private
  */
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  /**
  * Handle HTTP errors and log them.
  * @param {HttpErrorResponse} error - HTTP error response.
  * @returns {any} - Error details.
  * @private
  */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
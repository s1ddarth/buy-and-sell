import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Listing } from './types';
import { Observable, from } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

const httpOptionsWithAuthToken = (token: string) => ({
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    AuthToken: token,
  }),
});

@Injectable({
  providedIn: 'root',
})
export class ListingsService {
  private auth = getAuth(); // Initialize the auth instance

  // Observable to track authentication state
  authState$ = new Observable<User | null>((observer) => {
    onAuthStateChanged(
      this.auth,
      (user) => observer.next(user),
      (error) => observer.error(error)
    );
  });

  constructor(private http: HttpClient) {}

  getListings(): Observable<Listing[]> {
    return this.http.get<Listing[]>('/api/listings');
  }

  getListingByID(id: string): Observable<Listing> {
    return this.http.get<Listing>(`/api/listings/${id}`);
  }

  addViewToListing(id: string): Observable<Listing> {
    return this.http.post<Listing>(
      `/api/listings/${id}/add-view`,
      {},
      httpOptions
    );
  }

  getListingsForUser(): Observable<Listing[]> {
    return new Observable<Listing[]>((observer) => {
      this.authState$.subscribe((user) => {
        if (user) {
          user.getIdToken().then((token: string) => {
            // Specify token as string
            this.http
              .get<Listing[]>(
                `/api/users/${user.uid}/listings`, // Access uid from User type
                httpOptionsWithAuthToken(token)
              )
              .subscribe({
                next: (listings) => observer.next(listings),
                error: (err) => observer.error(err),
              });
          });
        } else {
          observer.next([]);
        }
      });
    });
  }

  deleteListing(id: string): Observable<any> {
    return this.http.delete(`/api/listings/${id}`);
  }

  createListing(
    name: string,
    description: string,
    price: number
  ): Observable<Listing> {
    return new Observable<Listing>((observer) => {
      this.authState$.subscribe((user) => {
        if (user) {
          user.getIdToken().then((token: string) => {
            // Specify token as string
            this.http
              .post<Listing>(
                '/api/listings',
                { name, description, price },
                httpOptionsWithAuthToken(token)
              )
              .subscribe((listing) => observer.next(listing));
          });
        }
      });
    });
  }

  editListing(
    id: string,
    name: string,
    description: string,
    price: number
  ): Observable<Listing> {
    return this.http.post<Listing>(
      `/api/listings/${id}`,
      { name, description, price },
      httpOptions
    );
  }
}

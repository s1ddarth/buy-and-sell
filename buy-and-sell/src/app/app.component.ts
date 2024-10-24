import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth'; // Keep using Firebase modular API
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListingsPageComponent } from './listings-page/listings-page.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { Observable } from 'rxjs';
import { Auth, authState } from '@angular/fire/auth'; // Use the modern AngularFire module

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ListingsPageComponent, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'buy-and-sell';
  user$: Observable<any>; // Observable for the authenticated user

  constructor(public auth: Auth) {
    this.user$ = authState(this.auth); // Tracks the authentication state
  }

  async signInClicked(): Promise<void> {
    const auth = getAuth(); // Using the modular API for auth
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider); // Sign in with Google
      console.log('User signed in successfully');
    } catch (error) {
      console.error('Error signing in:', error);
    }
  }

  async signOutClicked(): Promise<void> {
    const auth = getAuth(); // Using the modular API for auth
    try {
      await signOut(auth); // Sign out
      console.log('User signed out successfully');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }
}

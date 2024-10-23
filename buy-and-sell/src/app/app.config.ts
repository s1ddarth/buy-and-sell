import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideFirebaseApp(() =>
      initializeApp({
        apiKey: 'AIzaSyBLum_hdb1Tfd8l1SxROAFvzPYOh18ji1w',
        authDomain: 'buy-and-sell-1eb22.firebaseapp.com',
        projectId: 'buy-and-sell-1eb22',
        storageBucket: 'buy-and-sell-1eb22.appspot.com',
        messagingSenderId: '610372229779',
        appId: '1:610372229779:web:32d5fe2a3bfe2b5b570b66',
        measurementId: 'G-LNSPHWJPV9',
      })
    ),
    provideAuth(() => getAuth()),
  ],
};

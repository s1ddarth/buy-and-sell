import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { fakeMyListings } from '../fake-data';
import { Listing } from '../types';

@Component({
  selector: 'app-my-listings-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './my-listings-page.component.html',
  styleUrl: './my-listings-page.component.css'
})
export class MyListingsPageComponent {
  listings: Listing[] | undefined;

  constructor() {}
  ngOnInit(): void {
    this.listings = fakeMyListings;
  }

  onDeleteClicked(listingId: string): void {
    // TODO: Implement with backend
    alert(`Listing ${listingId} deleted`);
  }
}

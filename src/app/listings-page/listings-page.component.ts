import { Component, OnInit } from '@angular/core';
import { Listing } from '../types';
import { fakeListings } from '../fake-data';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listings-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './listings-page.component.html',
  styleUrl: './listings-page.component.css',
})
export class ListingsPageComponent implements OnInit {
  listings: Listing[] = [];

  ngOnInit(): void {
    this.listings = fakeListings;
  }
}

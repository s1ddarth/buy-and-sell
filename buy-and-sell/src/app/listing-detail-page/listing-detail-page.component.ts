import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ListingsService } from '../listings.service';
import { Listing } from '../types';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-listing-detail-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './listing-detail-page.component.html',
  styleUrl: './listing-detail-page.component.css',
})
export class ListingDetailPageComponent {
  isLoading: boolean = true;
  listing: Listing | undefined;

  constructor(
    private route: ActivatedRoute,
    private listingsService: ListingsService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') || '';

    // Validate the ID
    if (!id) {
      console.error('No ID found in route parameters.');
      this.isLoading = false;
      return; // Exit if there's no ID
    }

    this.listingsService.getListingByID(id).subscribe({
      next: (data: Listing) => {
        console.log('API response:', data); // Log the response
        this.listing = data;
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching listing:', error);
        this.isLoading = false;
      },
    });
    this.listingsService.addViewToListing(id)
      .subscribe(() => console.log('Views updated!'));
  }
}

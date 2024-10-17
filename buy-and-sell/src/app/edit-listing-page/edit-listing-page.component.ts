import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListingDataFormComponent } from '../listing-data-form/listing-data-form.component';
import { ActivatedRoute, Router } from '@angular/router';

import { Listing } from '../types';
import { ListingsService } from '../listings.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-listing-page',
  standalone: true,
  imports: [ListingDataFormComponent, CommonModule],
  templateUrl: './edit-listing-page.component.html',
  styleUrl: './edit-listing-page.component.css',
})
export class EditListingPageComponent {
  listing: Listing | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private listingService: ListingsService
  ) {}
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    // Validate the ID
    if (!id) {
      console.error('No ID found in route parameters.');
      return; // Exit if there's no ID
    }

    this.listingService.getListingByID(id).subscribe({
      next: (data: Listing) => {
        console.log('API response:', data); // Log the response
        this.listing = data;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching listing:', error);
      },
    });
  }
  onSubmit({
    name,
    description,
    price,
  }: {
    name: string;
    description: string;
    price: number;
  }): void {
    if (this.listing) {
      this.listingService
        .editListing(this.listing.id, name, description, price)
        .subscribe(() => {
          alert(`Changes saved.`);
          this.router.navigateByUrl('/my-listings');
        });
    } else console.error('Listing does not exist');
  }
}

import { Component } from '@angular/core';
import { ListingDataFormComponent } from '../listing-data-form/listing-data-form.component';
import { ActivatedRoute, Router } from '@angular/router';

import { fakeMyListings } from '../fake-data';
import { Listing } from '../types';

@Component({
  selector: 'app-edit-listing-page',
  standalone: true,
  imports: [ListingDataFormComponent],
  templateUrl: './edit-listing-page.component.html',
  styleUrl: './edit-listing-page.component.css',
})
export class EditListingPageComponent {
  listing: Listing | undefined;

  constructor(private route: ActivatedRoute, private router: Router) {}
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.listing = fakeMyListings.find((listing) => listing.id === id);
  }
  onSubmit(): void {
    alert(`Saving changes...`);
    this.router.navigateByUrl('/my-listings');
  }
}

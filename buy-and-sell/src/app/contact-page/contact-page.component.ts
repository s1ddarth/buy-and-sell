import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Listing } from '../types';
import { ListingsService } from '../listings.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.css',
})
export class ContactPageComponent {
  email: string = '';
  message: string = '';
  listing: Listing | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private listingService: ListingsService
  ) {}
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      console.error('No ID found in route parameters.');
      return; // Exit if there's no ID
    }
    this.listingService.getListingByID(id).subscribe({
      next: (data: Listing) => {
        // console.log('API response:', data); // Log the response
        this.listing = data;
        this.message = `Hi, I'm interested in your ${this.listing?.name.toLowerCase()}`;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching listing:', error);
      },
    });
  }

  sendMessage(): void {
    alert('Message sent!');
    this.router.navigateByUrl('/listings');
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ListingDataFormComponent } from '../listing-data-form/listing-data-form.component';
import { ListingsService } from '../listings.service';

@Component({
  selector: 'app-new-listings-page',
  standalone: true,
  imports: [FormsModule, ListingDataFormComponent],
  templateUrl: './new-listings-page.component.html',
  styleUrl: './new-listings-page.component.css',
})
export class NewListingsPageComponent {
  constructor(
    private router: Router,
    private listingService: ListingsService
  ) {}
  ngOnInit(): void {}

  onSubmit({ name, description, price }: { name: string; description: string; price: number }): void {
    this.listingService
      .createListing(name, description, price)
      .subscribe(() => {
        alert(`New listing created`);
        this.router.navigateByUrl('/my-listings');
      });
  }
  
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ListingDataFormComponent } from "../listing-data-form/listing-data-form.component";

@Component({
  selector: 'app-new-listings-page',
  standalone: true,
  imports: [
    FormsModule,
    ListingDataFormComponent
],
  templateUrl: './new-listings-page.component.html',
  styleUrl: './new-listings-page.component.css',
})
export class NewListingsPageComponent {

  constructor(private router: Router) {}
  ngOnInit(): void {}

  onSubmit(): void {
    // TODO: Implement backend
    alert(`New listing created`);
    this.router.navigateByUrl('/my-listings');
  }
}

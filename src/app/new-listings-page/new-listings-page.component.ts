import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-listings-page',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './new-listings-page.component.html',
  styleUrl: './new-listings-page.component.css',
})
export class NewListingsPageComponent {
  name: string = '';
  description: string = '';
  price: string = '';

  constructor(private router: Router) {}
  ngOnInit(): void {}

  onSubmit(): void {
    // TODO: Implement backend
    alert(`New listing created`);
    this.router.navigateByUrl('/my-listings');
  }
}

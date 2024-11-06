import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  providers: [],
  template: `
    <div class="main">
      <h1 class="text-xl mt-4 sm:text-5xl font-semibold text-center">About</h1>
      <p class="text-xl text-center mt-8 leading-relaxed">
        This is a practice project. This website is made using Angular 17 and
        .NET 4.0. This application simulates a food delivery app like
        Swiggy/Zomato. This application has a User, Restaurent Owner, Admin and
        Delivery Executive Roles. User can order food items from different
        restaurents. Restaurant owners can accept orders, update availability,
        price, description of items and create multiple outlets in different
        regions. Admins can assign delivery executive for prepared orders, add,
        update, delete regions
      </p>
    </div>
  `,
  styles: `
  .main {
  margin: 3rem 3rem;
  padding: 3rem 3rem;
}
  `,
})
export class AboutComponent {}

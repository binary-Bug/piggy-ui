import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, DropdownModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  isProfileToggled = false;
  router: Router = inject(Router);
  toggleProfileBar(): void {
    this.isProfileToggled = !this.isProfileToggled;
  }

  logout(): void {
    localStorage.clear();
    this.router.navigateByUrl('');
  }

  cities: any[] | undefined;

  selectedCity: any;

  ngOnInit() {
    this.cities = [
      {
        name: 'Australia',
        code: 'AU',
      },
      {
        name: 'Canada',
        code: 'CA',
      },
      {
        name: 'United States',
        code: 'US',
      },
    ];
  }
}

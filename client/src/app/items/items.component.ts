import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
  imports: [CommonModule]
})
export class ItemsComponent implements OnInit {
  items: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('/api/items').subscribe({
      next: data => {
        this.items = data;
        console.log(this.items);
      },
      error: error => {
        console.error('Error fetching items:', error);
      }
    });
  }
}
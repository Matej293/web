import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface DecodedToken {
  username: string;
  profile: string;
  role: string;
  email: string;
}

@Component({
  standalone: true,
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports: [CommonModule]
})
export class ProfileComponent implements OnInit {
  user: DecodedToken = { username: '', profile: '', role: '', email: '' };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<{ token: string }>('/api/login').subscribe({
      next: data => {
        const decodedToken = this.decodeJWT(data.token) as DecodedToken;
        this.user = decodedToken;
        console.log(this.user);
      },
      error: error => {
        console.error('Error fetching token:', error);
      }
    }
    );
  }

  private decodeJWT(token: string): any {
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);
    return JSON.parse(decodedPayload);
  }
}
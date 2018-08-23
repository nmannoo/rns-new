import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AdminNavigation } from '../../classes/navigation';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {
  public nav: any = AdminNavigation;
  public currentUser: string;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
    this.currentUser = auth.currentUser;
  }

  ngOnInit() {
  }

  logOut() {
    this.auth.logout().subscribe(
      (data) => {
        this.router.navigate(['/login']);
      },
      (err) => {
        alert(err.message);
      }
    );
  }

}

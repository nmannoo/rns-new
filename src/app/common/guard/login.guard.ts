import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  private state = new BehaviorSubject<boolean>(true);

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    this.auth.user.subscribe(data => {
      if (data) {
        this.state.next(false);
        this.router.navigate(['/admin']);
      } else {
        this.state.next(true);
      }
    });
    return this.state.value;
  }
}

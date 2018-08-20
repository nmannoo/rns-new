import { Injectable } from '@angular/core';
import { Router, NavigationStart, NavigationCancel, NavigationError, NavigationEnd, ActivatedRoute } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  startLoading(el: any) {
    el.open();
    el.determinate = false;
    el.progress = 0;
    const step1 = setTimeout(() => {
      el.determinate = true;
      el.progress = 0;
    }, 2000);
    const step2 = setTimeout(() => {
      el.determinate = true;
      el.progress = 1;
      clearTimeout(step1);
      el.close();
    }, 3000);
    const step3 = setTimeout(() => {
      clearTimeout(step2);
    }, 4000);
  }
}

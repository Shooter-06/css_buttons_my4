import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private headerText = new BehaviorSubject<string>('');

  currentAction = this.headerText.asObservable();

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  changeHeaderText(action: string) {
    this.headerText.next(action);
  }

  isRoute(route: string): Observable<boolean> {
    return this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      filter(route => route.outlet === 'primary'),
      map(route => route.snapshot.url.join('/') === route)
    );
  }

  getCurrentId(): Observable<number> {
    return this.activatedRoute.params.pipe(
      map(params => params['id'])
    );
  }
}


<div class="header-item" *ngIf="(headerService.isRoute('/admin/sites/create') | async)">
    <a [routerLink]="['/admin/sites/create', (headerService.getCurrentId() | async)]" routerLinkActive="active" class="header-link">Add site</a>
</div>

<div class="header-item" *ngIf="(headerService.isRoute('/admin/site/edit/') | async)">
    <a [routerLink]="['/admin/site/edit/', (headerService.getCurrentId() | async)]" routerLinkActive="active" class="header-link">Edit site</a>
</div>

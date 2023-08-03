import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { HeaderService } from '../services/header.service';
import { PortalSiteService } from '../services/portal-site.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-your-component',
  templateUrl: './your-component.component.html',
  styleUrls: ['./your-component.component.css']
})
export class YourComponent implements OnInit {
  action: string;
  siteId: string;
  portalSite$: Observable<any>; 

  constructor(private route: ActivatedRoute, private headerService: HeaderService, private portalSiteService: PortalSiteService) { }

  ngOnInit() {
    this.route.params
      .pipe(
          map(params => params['id'])
      )
      .subscribe(id => {
        this.siteId = id;
        this.portalSite$ = this.portalSiteService.get(this.siteId);
      });

    this.headerService.currentAction.subscribe((action) => this.action = action);
  }

  isRoute(route: string): boolean {
    return this.route.snapshot.firstChild?.url[0]?.path === route;
  }
}


<div class="header-item">
  <a routerLink="/admin" routerLinkActive="active" class="header-link">Site</a>
</div>

<div class="header-item" *ngIf="isRoute('sites/create')">
  <a [routerLink]="['/admin/sites/create', siteId]" routerLinkActive="active" class="header-link">Add site</a>
</div>

<div class="header-item" *ngIf="isRoute('sites/edit')">
  <a [routerLink]="['/admin/sites/edit', siteId]" routerLinkActive="active" class="header-link">Edit site</a>
</div>

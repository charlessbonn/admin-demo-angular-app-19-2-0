import { Component, inject, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgbDropdownModule, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { filter, Subscription } from 'rxjs';
import { routeNames } from '../../app.routes';
import { User } from '../../core/interfaces/user';
import { ProfileStore } from '../../stores/profile.store';
import { getCookie } from '../../utils/cookie';
import { Status } from '../../utils/enums';
import { AppLogoComponent } from "../app-logo/app-logo.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [AppLogoComponent, CommonModule, NgbDropdownModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  // Language
  private translate = inject(TranslateService);
  changeLanguage(lang: string) {
    this.translate.use(lang); // dynamically switch
  }

  get currentLanguage(): string {
    return this.translate.currentLang;
  }

  // Track Navigation
  offcanvasService = inject(NgbOffcanvas);
  router = inject(Router);
  isLoginPage = false;
  nonUserRoutes = [
    "/",
    "/logout",
    "/forgot-password",
  ];
  userLink = `/${routeNames.user.path}`;
  productLink = `/${routeNames.product.path}`;

  constructor() {
    this.translate.use('en');
    this.trackNavigation();
  }

  private trackNavigation() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe((event) => {
        const navEndEvent = event as NavigationEnd; // ✅ Explicit type assertion
        if (this.nonUserRoutes.includes(navEndEvent.urlAfterRedirects)) {
          this.isLoginPage = true;
        } else {
          this.isLoginPage = false;
        }
      });
  }

  // Drawer Component
  @ViewChild('drawer') drawer: any;

  openDrawer() {
    this.offcanvasService.open(this.drawer, { position: 'start' }); // 'start' = left side
  }

  navigateAndClose(offcanvas: any, path: string) {
    this.router.navigate([path]);
    offcanvas.dismiss();
  }

  // Dropdown
  onAccount() {
    //
  }

  onLogout() {
    this.router.navigate([routeNames.logout.path]);
  }

  // Profile
  profileStore = inject(ProfileStore);
  profile = this.profileStore.profile$;
  status = this.profileStore.status$;
  profileSub = Subscription.EMPTY;
  statusSub = Subscription.EMPTY;
  profileData: User = {};

  ngOnInit() {
    this.profileSub = this.profile.subscribe((data) => {
      this.profileData = data;
    });
    this.statusSub = this.status.subscribe((data) => {
      const hasToken = getCookie('user-session');
      if (data === Status.Initial && hasToken) {
        this.profileStore.getProfile();
      }
    });
    this.translate.onLangChange.subscribe((event) => {
      console.log('Language changed to:', event.lang);
    });
  }

  ngOnDestroy() {
    this.profileSub.unsubscribe(); // Prevent memory leaks
    this.statusSub.unsubscribe(); // Prevent memory leaks
  }
}

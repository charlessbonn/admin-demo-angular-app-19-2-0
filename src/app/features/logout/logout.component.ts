import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { routeNames } from '../../app.routes';
import { UserService } from '../../core/services/user.service';
import { ProfileStore } from '../../stores/profile.store';
import { AppLogoComponent } from "../../layout/app-logo/app-logo.component";

@Component({
  selector: 'app-logout',
  imports: [AppLogoComponent],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  router = inject(Router);
  userServices = inject(UserService);
  profileStore = inject(ProfileStore);

  async ngOnInit() {
    const result = await this.userServices.logout();

    if (result) {
      this.profileStore.clearProfile();
      this.router.navigate([routeNames.login.path]);
    }
  }
}

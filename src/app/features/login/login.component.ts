import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { routeNames } from '../../app.routes';
import { ProfileStore } from '../../stores/profile.store';
import { UserService } from '../../core/services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AppLogoComponent } from '../../layout/app-logo/app-logo.component';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterModule, CommonModule, TranslateModule, AppLogoComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  router = inject(Router);
  userServices = inject(UserService);
  profileStore = inject(ProfileStore);

  loading = false;
  email = "";
  password = "";
  forgotPasswordLink = `/${routeNames.forgotPassword.path}`;

  ngOnInit() {
    // 
  }

  async onSubmit() {
    this.loading = true;
    const result = await this.userServices.login(
      this.email,
      this.password
    );

    this.loading = false;

    if (result.success) {
      this.router.navigate([routeNames.user.path]);
      this.profileStore.getProfile();
    }
  }
}

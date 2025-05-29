import { Component } from '@angular/core';
import { routeNames } from '../../app.routes';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  email = "";
  loginLink = `${routeNames.login.path}`;

  async onSubmit() {
    //
  }
}

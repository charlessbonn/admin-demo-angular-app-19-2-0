import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Users, User } from '../interfaces/user';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  http: HttpClient = inject(HttpClient);
  cookieService: CookieService = inject(CookieService);

  url = environment.API_URL;
  defaultUsersData: Users = {};

  async login(email: string, password: string): Promise<any> {
    try {
      const res = this.http.post<any>(
        `${this.url}/api/user/login`,
        {
          email: email,
          password: password
        },
        {
          withCredentials: true
        }
      );
      const result = await firstValueFrom(res);
      this.cookieService.set('user-session', 'true', 1, '/', '', true, "Strict");
      return { success: true, data: "You have been logged in successfully." };
    } catch (error) {
      console.log("Login error", error);
      return { success: false, error };
    }
  }

  async logout(): Promise<any> {
    try {
      const res = this.http.post<any>(
        `${this.url}/api/user/logout`,
        {},
        {
          withCredentials: true
        }
      );
      const result = await firstValueFrom(res);
      this.cookieService.set('user-session', '', 0, '/', '', true, "Strict");
      return { success: true, data: "You have been logged out successfully." };
    } catch (error) {
      console.log("Login error", error);
      return { success: false, error };
    }
  }

  async getUser(): Promise<User> {
    try {
      const res = this.http.get<any>(
        `${this.url}/api/user/profile`,
        {
          withCredentials: true
        }
      );
      const result = await firstValueFrom(res);
      return result.data;
    } catch (error) {
      console.log("Get user error", error);
      return {};
    }
  }

  async getAllUser(): Promise<Users> {
    try {
      const res = this.http.get<Users>(
        `${this.url}/api/user`,
        {
          withCredentials: true
        }
      );
      const result = await firstValueFrom(res);
      return result;
    } catch (error) {
      console.log("Get users error", error);
      return this.defaultUsersData;
    }
  }
}

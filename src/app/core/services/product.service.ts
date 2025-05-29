import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { Product } from '../interfaces/product';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  http: HttpClient = inject(HttpClient);
  cookieService: CookieService = inject(CookieService);

  url = environment.API_URL;
  defaultProductData: Product = {};

  async getAllProducts(): Promise<Product[]> {
    try {
      const res = this.http.get<Product[]>(
        `${this.url}/api/product`,
        {
          withCredentials: true
        }
      );
      const result = await firstValueFrom(res);
      return result;
    } catch (error) {
      console.log("Get users error", error);
      return [this.defaultProductData];
    }
  }
}

import { inject, Injectable } from "@angular/core";
import { Product } from "../core/interfaces/product";
import { BehaviorSubject } from "rxjs";
import { ProductService } from "../core/services/product.service";

@Injectable({ providedIn: 'root' })
export class ProductStore {
    private productService = inject(ProductService);
    private productSubject = new BehaviorSubject<Product[]>([]);
    products$ = this.productSubject.asObservable();

    private searchResultSubject = new BehaviorSubject<Product[]>([]);
    searchResult$ = this.searchResultSubject.asObservable();

    private loadingSubject = new BehaviorSubject<boolean>(false);
    loading$ = this.loadingSubject.asObservable();

    async getAllProducts() {
        this.loadingSubject.next(true);
        const result: Product[] = await this.productService.getAllProducts();
        this.productSubject.next(result ?? []);
        this.searchResultSubject.next(result ?? []);
        this.loadingSubject.next(false);
    }

    async searchProduct(keyword: string) {
        this.loadingSubject.next(true);
        const result: Product[] = await this.productService.getAllProducts();
        this.searchResultSubject.next(result ?? []);
        this.loadingSubject.next(false);
    }

    clearSearches() {
        this.searchResultSubject.next([]);
    }

    getProductSnapshot() {
        return this.productSubject.getValue();
    }

    getSearchResultSnapshot() {
        return this.searchResultSubject.getValue();
    }

    getLoadingSnapshot() {
        return this.loadingSubject.getValue();
    }
}

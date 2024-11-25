import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot } from "@angular/router";
import { Product } from "../models/product.model";
import { Observable } from "rxjs";
import { ProductsService } from "../services/products/products.service";
import { LoadingService } from "../services/loading.service";

@Injectable({
    providedIn: 'root'
})
export class ProductsListResolver implements Resolve<Product[]>{
    constructor(private prdSer: ProductsService, private loading: LoadingService){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product[]> {
       return this.prdSer.getAllProducts();
    }
    
}
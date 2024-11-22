import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot } from "@angular/router";
import { Product } from "../models/product.model";
import { Observable } from "rxjs";
import { ProductsService } from "../services/products/products.service";

@Injectable({
    providedIn: 'root'
})

export class ProductDetailsResolver implements Resolve<Product>{
    constructor(private prdSer: ProductsService){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> {
        return this.prdSer.getProduct(route.params['id'])
    }
}
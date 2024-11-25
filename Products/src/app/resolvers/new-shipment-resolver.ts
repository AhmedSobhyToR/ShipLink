import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot } from "@angular/router";
import { ShipmentsService } from "../services/shipments/shipments.service";
import { map, Observable } from "rxjs";


@Injectable({
    providedIn:'root'
})

export class NewShipmentResolver implements Resolve<number>{

         
    constructor(private shipmentsService: ShipmentsService){
    }


    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<number> {
       return this.shipmentsService.getShipmentsList().pipe(map((data)=> data.length+1))
    }
    
}
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot } from "@angular/router";
import { ShipmentsList } from "../models/shipment.model";
import { Observable } from "rxjs";
import { ShipmentsService } from "../services/shipments/shipments.service";


@Injectable({
    providedIn: 'root'
})
export class ShipmentsListResolver implements Resolve<ShipmentsList[]>{
    constructor(private shipmentsService: ShipmentsService){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ShipmentsList[]> {
        return this.shipmentsService.getShipmentsList()
    }
    
}
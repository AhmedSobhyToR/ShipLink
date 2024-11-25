import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot } from "@angular/router";
import { ShipmentDetails } from "../models/shipment.model";
import { ShipmentsService } from "../services/shipments/shipments.service";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class ShipmentDetailsResolver implements Resolve<ShipmentDetails>{
    constructor(private shipmentsService: ShipmentsService){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ShipmentDetails> {
        return this.shipmentsService.getShipmentDetail(route.params['id'])
    }

}
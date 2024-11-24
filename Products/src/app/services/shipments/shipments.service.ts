import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Carrier, ShipmentDetails, ShipmentsList } from '../../models/shipment.model';

@Injectable({
  providedIn: 'root'
})
export class ShipmentsService {

  backendUrl: string = environment.backendUrl;
  constructor(private httpClient: HttpClient) { }

  getShipmentsList(): Observable<ShipmentsList[]>{
    return this.httpClient.get<ShipmentsList[]>(`${this.backendUrl}/shipments`)
  }

  getShipmentDetail(id: string | number): Observable<ShipmentDetails>{
    return this.httpClient.get<ShipmentDetails>(`${this.backendUrl}/shipments/${id}`)
  }

  getCarriers(): Observable<Carrier[]>{
    return this.httpClient.get<Carrier[]>(`${this.backendUrl}/carrier`)
  }

  createNewShipment(shipment: ShipmentDetails): Observable<ShipmentDetails>{
    return this.httpClient.post<ShipmentDetails>(`${this.backendUrl}/shipments`,JSON.stringify(shipment))
  }
}

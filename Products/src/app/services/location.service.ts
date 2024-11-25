import { Injectable } from '@angular/core';
import { from, map, Observable, switchMap } from 'rxjs';
import { addressDto } from '../models/shipment.model';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor() {}

  getAddress(): Observable<addressDto> {
    return new Observable<GeolocationPosition>((observer) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          observer.next(position);
          observer.complete();
        },
        (error) => observer.error(error)
      );
    }).pipe(
      switchMap((position) => {
        const { latitude, longitude } = position.coords;
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
        return from(fetch(url).then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch address information.');
          }
          return response.json();
        }));
      }),
      map((data) => {
        const address = data.address || {};
        return {
          street: address.road || 'N/A',
          city: address.city || address.town || address.village || 'N/A',
          state: address.state || 'N/A',
          postalCode: address.postcode || 'N/A',
          country: address.country || 'N/A',
        } as addressDto;
      })
    );
  }
}

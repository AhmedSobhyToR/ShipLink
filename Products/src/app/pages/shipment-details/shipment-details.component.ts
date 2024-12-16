import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../services/loading.service';
import { PageHeaderComponent } from "../../components/page-header/page-header.component";
import { TranslateModule } from '@ngx-translate/core';
import { ShipmentsService } from '../../services/shipments/shipments.service';
import { ActivatedRoute } from '@angular/router';
import { addressDto, ShipmentDetails } from '../../models/shipment.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shipment-details',
  standalone: true,
  imports: [PageHeaderComponent,
     TranslateModule,
    CommonModule],
  templateUrl: './shipment-details.component.html',
  styleUrl: './shipment-details.component.css'
})
export class ShipmentDetailsComponent implements OnInit{

  shipmentDetails!: ShipmentDetails;

  constructor(private loading: LoadingService,
    private activatedRoute: ActivatedRoute
  ){
 
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe({
      next: (data) => {
        this.shipmentDetails = data['shipmentDetails'];
        console.log(this.shipmentDetails)
        
        this.loading.endLoading();
      }
    })
  }


  getDetailedLocation(location: addressDto){
    return location.street + ', ' + location.state + ', ' + location.city
  }

  getDateTime(date : string){
    let [d,t] = date.split('T');
    t = t.replace('Z', '');
    return [d,t]
  }

 
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MoreIconComponent } from "../../components/more-icon/more-icon.component";
import { ShipmentFilter, ShipmentsList } from '../../models/shipment.model';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from '../../services/loading.service';
import { ProductFilter } from '../../models/product.model';
import { SHIPMENTS_LIST_COLUMNS } from '../../enums/shipments-enums';
import { Column } from '../../models/column.model';
import { CommonModule } from '@angular/common';
import { ExcelService } from '../../services/excel.service';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { ShipmentsListFilterComponent } from "../../components/shipments-list-filter/shipments-list-filter.component";

@Component({
  selector: 'app-shipments-list',
  standalone: true,
  imports: [PageHeaderComponent, TranslateModule, CommonModule, MoreIconComponent, ShipmentsListFilterComponent],
  templateUrl: './shipments-list.component.html',
  styleUrl: './shipments-list.component.css'
})
export class ShipmentsListComponent implements OnInit, OnDestroy {
  shipmentsList!: ShipmentsList[];
  filteredShipmentsList!: ShipmentsList[];
  numberOfItems!: number;
  isFiltered: boolean = true;
  showFilter: boolean = false;

  shipmentsListColumns: Column[] = SHIPMENTS_LIST_COLUMNS;

  constructor(private activatedRoute: ActivatedRoute,
    private loading : LoadingService,
    private excelService: ExcelService,
    private translateService: TranslateService
  ){}
  ngOnDestroy(): void {
    console.log("hey");
    this.loading.endLoading();
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe({
      next:(data) => {
       this.shipmentsList = data['shipmentsList'];
       this.filteredShipmentsList = this.shipmentsList;
       console.log(this.filteredShipmentsList);
       this.numberOfItems = this.shipmentsList.length
        this.loading.endLoading();
      }
    })

  }

  toggleFilter(){
    this.showFilter = !this.showFilter;
  }

  exportToExcel(){
    this.excelService.exportToExcel(this.filteredShipmentsList,this.shipmentsListColumns,"shipments-list")
  }

  onFilter(filter: ShipmentFilter){
    this.filteredShipmentsList = this.shipmentsList;
    this.toggleFilter();
    if(filter.shipmentId)
      this.filteredShipmentsList = this.filteredShipmentsList.filter((row)=> row.id == filter.shipmentId);
    if(filter.shipmentStatus)
      this.filteredShipmentsList = this.filteredShipmentsList.filter((row)=> row.status == filter.shipmentStatus);
    if(filter.shipmentCarrier)
      this.filteredShipmentsList = this.filteredShipmentsList.filter((row)=> row.carrier.name == filter.shipmentCarrier);
    if(filter.shipmentDateFrom)
      this.filteredShipmentsList = this.filteredShipmentsList.filter((row)=> row.shippedDate >= filter.shipmentDateFrom);
    if(filter.shipmentDateTo)
      this.filteredShipmentsList = this.filteredShipmentsList.filter((row)=> row.shippedDate <= filter.shipmentDateTo); 
  }

  get getLang(){
    return this.translateService.currentLang
  }
}

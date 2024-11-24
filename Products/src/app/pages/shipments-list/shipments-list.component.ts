import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ProductsListFilterComponent } from "../../components/products-list-filter/products-list-filter.component";
import { MoreIconComponent } from "../../components/more-icon/more-icon.component";
import { ShipmentsList } from '../../models/shipment.model';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from '../../services/loading.service';
import { ProductFilter } from '../../models/product.model';
import { SHIPMENTS_LIST_COLUMNS } from '../../enums/shipments-enums';
import { Column } from '../../models/column.model';
import { CommonModule } from '@angular/common';
import { ExcelService } from '../../services/excel.service';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';

@Component({
  selector: 'app-shipments-list',
  standalone: true,
  imports: [PageHeaderComponent, TranslateModule, CommonModule,ProductsListFilterComponent, MoreIconComponent],
  templateUrl: './shipments-list.component.html',
  styleUrl: './shipments-list.component.css'
})
export class ShipmentsListComponent implements OnInit {
  shipmentsList!: ShipmentsList[];
  filteredShipmentsList!: ShipmentsList[];
  numberOfItems!: number;
  isFiltered: boolean = true;
  showFilter: boolean = false;

  shipmentsListColumns: Column[] = SHIPMENTS_LIST_COLUMNS;

  constructor(private activatedRoute: ActivatedRoute,
    private loading : LoadingService,
    private excelService: ExcelService
  ){}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe({
      next:(data) => {
       this.shipmentsList = data['shipmentsList'];
       this.filteredShipmentsList = this.shipmentsList;
       this.numberOfItems = this.shipmentsList.length
        this.loading.endLoading();
      }
    })
  }


  toggleFilter(){

  }

  exportToExcel(){
    this.excelService.exportToExcel(this.filteredShipmentsList,this.shipmentsListColumns,"shipments-list")
  }

  onFilter(filter: ProductFilter){

  }
}

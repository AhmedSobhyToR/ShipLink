import { CommonModule, NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ProductFilter, SelectedItem } from '../../models/product.model';
import { CategoriesService } from '../../services/categories/categories.service';
import { Category } from '../../models/category.model';
import { DropdownListComponent } from "../dropdown-list/dropdown-list.component";
import { ShipmentsService } from '../../services/shipments/shipments.service';
import { ShipmentsStatus, ShipmentStatus } from '../../enums/shipments-enums';
import { ShipmentFilter } from '../../models/shipment.model';

@Component({
  selector: 'app-shipments-list-filter',
  standalone: true,
  imports: [TranslateModule, ReactiveFormsModule, CommonModule, NgClass, DropdownListComponent],
  templateUrl: './shipments-list-filter.component.html',
  styleUrl: './shipments-list-filter.component.css'
})
export class ShipmentsListFilterComponent implements OnInit {

  shipmentsListFilterForm!: FormGroup;
  carriersList!: SelectedItem[];
  shipmentsStatus!:SelectedItem[];
  @Output() doFilter =  new EventEmitter<ShipmentFilter>();
  // @Output() isFiltered =  new EventEmitter<boolean>();

  constructor(private cd: ChangeDetectorRef,
    private translate: TranslateService,
    private shipmentService: ShipmentsService
  ){}

  ngOnInit() {
    this.shipmentsListFilterForm = this.intializeFilterForm();
    this.loadCarrier();
    this.loadShipmentStatus();

  }

  intializeFilterForm(){
    return new FormGroup({
      shipmentId: new FormControl(null),
      shipmentCarrier: new FormControl(null),
      shipmentStatus: new FormControl(null),
      shipmentDateFrom: new FormControl(null),
      shipmentDateTo: new FormControl(null),
    })
  }

  loadCarrier(){
    this.shipmentService.getCarriers().subscribe({
      next: (data) => this.carriersList = data.map(row =>({
        value: row.name,
        label: row.name
      } as SelectedItem))
    })
  }
  loadShipmentStatus(){
    this.shipmentsStatus = ShipmentsStatus.map((row)=>
    ({
      value: row.textEn,
      label: row.textAr
    }as SelectedItem)
    )
  }
  
  resetFilter(){
    this.shipmentsListFilterForm = this.intializeFilterForm();
    this.doFilter.emit(this.shipmentsListFilterForm.value);
    this.cd.detectChanges();
  }

  filterList(){
    this.shipmentsListFilterForm.patchValue({
      shipmentCarrier: this.shipmentCarrier?.value,
      shipmentStatus: this.shipmentStatus?.value

    })
    console.log(this.shipmentsListFilterForm.value);
    this.doFilter.emit(this.shipmentsListFilterForm.value);
    this.cd.detectChanges();

  }

  get getLang(){
    return this.translate.currentLang
  }

  get shipmentId(){
    return this.shipmentsListFilterForm.get('shipmentId')?.value
  }

  get shipmentCarrier(){
    return this.shipmentsListFilterForm.get('shipmentCarrier')?.value
  }

  get shipmentStatus(){
    return this.shipmentsListFilterForm.get('shipmentStatus')?.value
  }

  get shipmentDateFrom(){
    return this.shipmentsListFilterForm.get('shipmentDateFrom')?.value
  }

  get shipmentDateTo(){
    return this.shipmentsListFilterForm.get('shipmentDateTo')?.value
  }
}

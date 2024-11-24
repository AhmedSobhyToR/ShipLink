import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoadingService } from '../../services/loading.service';
import { TranslateModule } from '@ngx-translate/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoriesService } from '../../services/categories/categories.service';
import { ShipmentsService } from '../../services/shipments/shipments.service';
import { Carrier, ShipmentDetails } from '../../models/shipment.model';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products/products.service';
import { CommonModule } from '@angular/common';
import { ShipmentStatus } from '../../enums/shipments-enums';

@Component({
  selector: 'app-new-shipment',
  standalone: true,
  imports: [TranslateModule,
     ReactiveFormsModule,
    CommonModule],
  templateUrl: './new-shipment.component.html',
  styleUrl: './new-shipment.component.css'
})
export class NewShipmentComponent implements OnInit{
  newShipmentForm!: FormGroup;
  carriers!: Carrier[];
  products!: Product[];
  formErrors!: string[];
  newShipmentId!: number;
  newShipment!: ShipmentDetails;
  constructor(private loading: LoadingService,
    private shipmentsService: ShipmentsService,
    private productsService: ProductsService,
    private cd : ChangeDetectorRef
  ){
    this.loading.endLoading();
  }

  ngOnInit(): void {
    this.newShipmentForm = this.intializeNewProductForm();
    this.loadCarriers();
    this.loadProducts();

  }

  intializeNewProductForm(){
    return new FormGroup({
      id: new FormControl("2"),
      sender: new FormControl(null, [Validators.required]),
      receiver: new FormControl(null, [Validators.required]),
      carrier: new FormControl(null, [Validators.required]),
      origin: new FormGroup({
        street: new FormControl(null, [Validators.required]),
        city: new FormControl(null, [Validators.required]),
        country: new FormControl(null, [Validators.required]),
      }),
      destination: new FormGroup({
        street: new FormControl(null, [Validators.required]),
        city: new FormControl(null, [Validators.required]),
        country: new FormControl(null, [Validators.required]),
      }),
      product : new FormArray([this.createProductGroup()])

    })
  }

  createProductGroup(){
    return new FormGroup({
      name : new FormControl(null, [Validators.required]),
      quantity : new FormControl(null, [Validators.required]),
      notes : new FormControl(null),
    })
  }

  get productFormArray(){
    return this.newShipmentForm.get('product') as FormArray;
  }

  onRemoveProduct(idx: number){
    console.log(idx);
    this.productFormArray.removeAt(idx)
    this.cd.detectChanges();
  }

  onAddProduct(){
    this.productFormArray.push(this.createProductGroup())
    this.cd.detectChanges();

  }



  loadCarriers(){
    this.shipmentsService.getCarriers().subscribe({
      next: (data) =>  this.carriers = [{} as Carrier,...data]
    })
  }
  loadProducts(){
    this.productsService.getAllProducts().subscribe({
      next:(data) => this.products = [{} as Product, ...data] 
    })


  }


  onAddShipment(){
  const date = new Date();
  const shippedDate= date.toISOString()
  const estimatedDate = this.addDays(shippedDate,5);
   this.newShipment = {
    ...this.newShipmentForm.value,
    "status" : ShipmentStatus.Pending,
    "shippedDate" : shippedDate,
    "estimatedDeliveryDate" :estimatedDate
   }
   this.shipmentsService.createNewShipment(this.newShipment).subscribe();
  }

  addDays(date: string, days: number): string {
    const result = new Date(date);
    result.setDate(result.getDate() + days); 
    return result.toISOString();
  }

  handleFormErrors() {
    this.formErrors = [];

    if (this.name?.errors?.['required'] && this.name?.touched && this.name?.dirty) {
      this.formErrors.push('Name is required');
    }

  }

  get name() {
    return this.newShipmentForm.get('name')!
  }
}

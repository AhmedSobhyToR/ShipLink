import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoadingService } from '../../services/loading.service';
import { TranslateModule } from '@ngx-translate/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoriesService } from '../../services/categories/categories.service';
import { ShipmentsService } from '../../services/shipments/shipments.service';
import { addressDto, Carrier, personDto, ShipmentDetails } from '../../models/shipment.model';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products/products.service';
import { CommonModule } from '@angular/common';
import { ShipmentStatus } from '../../enums/shipments-enums';
import { LocationService } from '../../services/location.service';
import { ActivatedRoute } from '@angular/router';
import { debounceTime } from 'rxjs';

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
  originLocation: addressDto = {} as addressDto
  location: { street: string; state: string; city: string } | null = null;
  constructor(private loading: LoadingService,
    private shipmentsService: ShipmentsService,
    private productsService: ProductsService,
    private locationService: LocationService,
    private cd : ChangeDetectorRef,
    private activatedRoute: ActivatedRoute
  ){
    this.loading.endLoading();
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe({
      next:(data) => {this.newShipmentId = data['shipmentId']
        this.newShipmentForm = this.intializeNewProductForm();
        this.getLocation();
        this.loadCarriers();
        this.loadProducts();
      }
    })

  }

  intializeNewProductForm(){
    return new FormGroup({
      id: new FormControl(`s${this.newShipmentId}`),
      sender: new FormGroup({
       name: new FormControl(null, [Validators.required]),
       phone: new FormControl(null, [Validators.required])
      }),
      receiver: new FormGroup({
        name: new FormControl(null, [Validators.required]),
        phone: new FormControl(null, [Validators.required])
      }
      ),
      carrier: new FormGroup({
        name: new FormControl (null, [Validators.required])
      }),
      origin: new FormGroup({
        street: new FormControl(null, [Validators.required]),
        state: new FormControl(null, [Validators.required]),
        city: new FormControl(null, [Validators.required]),
      }),
      destination: new FormGroup({
        street: new FormControl(null, [Validators.required]),
        state: new FormControl(null, [Validators.required]),
        city: new FormControl(null, [Validators.required]),
      }),
      products : new FormArray([this.createProductGroup()])

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
    return this.newShipmentForm.get('products') as FormArray;
  }

  onRemoveProduct(idx: number){
    console.log(idx);
    this.productFormArray.at(idx).setValue({
      name : null,
      quantity : null,
      notes : null,
    })
    this.productFormArray.removeAt(idx)
  }

  onAddProduct(){
    this.productFormArray.push(this.createProductGroup())
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

  getLocation(){
    this.locationService.getAddress().subscribe({
      next: (data) => {
        this.originLocation = data
        this.origin?.patchValue({
          street: this.originLocation.street,
          state: this.originLocation.state,
          city: this.originLocation.city
        })

      }
    })
     

  }

  get generateTrackingNumber(){
    return (Math.random() + 1).toString(36).substring(8)
}


  onAddShipment(){
  const date = new Date();
  const shippedDate= date.toISOString()
  const estimatedDate = this.addDays(shippedDate,5);
   this.newShipment = {
    ...this.newShipmentForm.value,
    "trackingNumber": this.generateTrackingNumber + shippedDate,
    "status" : ShipmentStatus.Pending,
    "shippedDate" : shippedDate,
    "estimatedDeliveryDate" :estimatedDate,
   }

   console.log(this.newShipment);
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

  get origin(){
    return this.newShipmentForm.get('origin')
  }

}

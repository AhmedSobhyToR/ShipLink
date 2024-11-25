import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CategoriesService } from '../../services/categories/categories.service';
import { debounceTime, map } from 'rxjs';
import { ProductsService } from '../../services/products/products.service';
import { Product } from '../../models/product.model';
import { Category } from '../../models/category.model';
import { LoadingService } from '../../services/loading.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [TranslateModule, ReactiveFormsModule, FormsModule, NgIf],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export class NewProductComponent implements OnInit {
  newProductForm!: FormGroup;
  productsCategories!:Category[];
  formErrors!: string[];
  newPrdId!: string;

  isDiscount: boolean = false;
  isDimensions: boolean = false;

  constructor(private categorySer: CategoriesService,
    private productsSer: ProductsService,
    private loading: LoadingService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){
    this.loading.endLoading();
  }

  ngOnInit(){
    this.getProductId();
    this.newProductForm = this.intializeNewProductForm();
    this.loadProductsCategories();
    this.newProductForm.valueChanges.pipe(debounceTime(200)).subscribe(()=> this.handleFormErrors())

  }

  intializeNewProductForm(){
    return new FormGroup({
      id: new FormControl(this.newPrdId),
      name: new FormControl(null, [Validators.required]),
      categoryName: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required, Validators.pattern('[1-9][0-9]*')]),
      description: new FormControl(null),
      stock: new FormControl(null, [Validators.required]),
      brand: new FormControl(null, [Validators.required]),
      model: new FormControl(null, [Validators.required]),
      warranty: new FormControl(null, [Validators.required]),
      addedDate: new FormControl(null, [Validators.required]),
      discount: new FormGroup({
        amount: new FormControl (null, [Validators.required]),
        validUntil: new FormControl (null, [Validators.required]),
      }),

      dimensions: new FormGroup({
        height: new FormControl (null, [Validators.required]),
        width: new FormControl (null, [Validators.required]),
        weight: new FormControl (null, [Validators.required]),
      }),
      color: new FormArray([])
    })
  }

  loadProductsCategories(){
    this.categorySer.loadCategories().subscribe({
      next: (data) => this.productsCategories = data
    })
  }

  onAddProduct(){
    if(!this.newProductForm.valid){
      this.handleFormErrors();
      return
    }
    this.productsSer.addProduct(this.newProductForm.value).subscribe({
      complete: (()=>this.router.navigate(['/products-list']))
    })
    this.newProductForm = this.intializeNewProductForm();
  }


   handleFormErrors() {
    this.formErrors = [];

    if (this.name?.errors?.['required'] && this.name?.touched && this.name?.dirty) {
      this.formErrors.push('Name is required');
    }

    if (this.categoryId?.errors?.['required'] && this.categoryId?.touched && this.categoryId?.dirty) {
      this.formErrors.push('Category is required');
    }

    if (this.price?.errors?.['required'] && this.price?.touched && this.price?.dirty) {
      this.formErrors.push('Price is required');
    }
    if (this.price?.errors?.['pattern'] && this.price?.touched && this.price?.dirty) {
      this.formErrors.push('Please enter valid numbers only!');
    }

    if (this.stock?.errors?.['required'] && this.stock?.touched && this.stock?.dirty) {
      this.formErrors.push('Stock is required');
    }
  }

   get name() {
    return this.newProductForm.get('name')!
  }
  
  get categoryId() {
    return this.newProductForm.get('categoryId')!
  }
  
  get price() {
    return this.newProductForm.get('price')!
  }
  
  get description() {
    return this.newProductForm.get('description')!
  }
  
  get stock() {
    return this.newProductForm.get('stock')!
  }

  get discount(){
    return this.newProductForm.get('discount')
  }

  get dimensions(){
    return this.newProductForm.get('dimensions')
  }
  

    getProductId(){
    this.activatedRoute.data.subscribe({
      next: (data) => this.newPrdId = `p${data['productsList'].length+1}`
    })
  }

  onAddDiscount(){
    this.isDiscount =  !this.isDiscount;
    if(!this.isDiscount){
      this.discount?.setValue({
        amount: null,
        validUntil: null
      })
    }
  }

  onAddDimensions(){
    this.isDimensions = !this.isDimensions;
    if(!this.isDimensions){
      this.dimensions?.setValue({
        height: null,
        width: null,
        weight: null
      })
    }
  }

}

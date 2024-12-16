import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CategoriesService } from '../../services/categories/categories.service';
import { debounceTime, map } from 'rxjs';
import { ProductsService } from '../../services/products/products.service';
import { Product, ProductDetails, SelectedItem } from '../../models/product.model';
import { Category } from '../../models/category.model';
import { LoadingService } from '../../services/loading.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { DropdownListComponent } from "../../components/dropdown-list/dropdown-list.component";

@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [TranslateModule, ReactiveFormsModule, FormsModule, NgIf, DropdownListComponent],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export class NewProductComponent implements OnInit {
  newProductForm!: FormGroup;
  newProduct !: ProductDetails;
  productsCategories!:SelectedItem[];
  formErrors!: string[];
  newPrdId!: string;
  imagePreview!:string;

  isDiscount: boolean = false;
  isDimensions: boolean = false;

  @ViewChild('ImageInput') ImageInput!: ElementRef<HTMLInputElement>;

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
      category: new FormControl(null, [Validators.required]),
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
      image: new FormControl(null, [Validators.required]),
      color: new FormArray([]),
    })
  }

  loadProductsCategories(){
    this.categorySer.loadCategories().subscribe({
      next: (data) => {this.productsCategories = data.map((row)=>
        ({
          value: row.id,
          label: row.name
        } as SelectedItem)
      )
    }
    })
  }

  handleAddingProductData(){
    const date = new Date();
    const currentDate = date.toISOString().split('T')[0];
    console.log(currentDate);
    this.newProduct = this.newProductForm.value;
    this.newProduct = {...this.newProduct,
      addedDate: currentDate,
      color: ["Black"],
      imageUrl: this.imagePreview,
      review: [],
      category: {
      id:this.category.value.value,
      name: this.category.value.label
      } as Category
    }
    
  }

  triggerAddingImage(){
    this.ImageInput.nativeElement.click();
  }

  onAddImage(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const productImage = reader.result as string;
        this.imagePreview = productImage;
      };
      reader.readAsDataURL(file);
    }
}

  
    
  

  onAddProduct(){
    // if(!this.newProductForm.valid){
    //   this.handleFormErrors();
    //   return
    // }
    this.handleAddingProductData();
    this.productsSer.addProduct(this.newProduct).subscribe({
      complete: (()=>this.router.navigate(['/products/products-list']))
    })
    this.newProductForm = this.intializeNewProductForm();
  }


   handleFormErrors() {
    this.formErrors = [];

    if (this.name?.errors?.['required'] && this.name?.touched && this.name?.dirty) {
      this.formErrors.push('Name is required');
    }

    if (this.category?.errors?.['required'] && this.category?.touched && this.category?.dirty) {
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

  get id(){
    return this.newProductForm.get('id');
  }

   get name() {
    return this.newProductForm.get('name')!
  }
  
  get category() {
    return this.newProductForm.get('category')!
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

  get image(){
    return this.newProductForm.get('image')!
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

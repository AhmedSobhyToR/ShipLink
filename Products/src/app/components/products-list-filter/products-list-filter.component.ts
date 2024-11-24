import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ProductFilter } from '../../models/product.model';
import { CategoriesService } from '../../services/categories/categories.service';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-products-list-filter',
  standalone: true,
  imports: [TranslateModule, ReactiveFormsModule, CommonModule],
  templateUrl: './products-list-filter.component.html',
  styleUrl: './products-list-filter.component.css'
})
export class ProductsListFilterComponent implements OnInit {

  productsListFilterForm!: FormGroup;
  categoryList!: string[];
  @Output() doFilter =  new EventEmitter<ProductFilter>();
  // @Output() isFiltered =  new EventEmitter<boolean>();


  constructor(private cd: ChangeDetectorRef,
    private categorySer: CategoriesService
  ){}

  ngOnInit() {
    this.productsListFilterForm = this.intializeFilterForm();
    this.loadCategories();
  }

  intializeFilterForm(){
    return new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null),
      categoryName: new FormControl(null),
      minPrice: new FormControl(null),
      maxPrice: new FormControl(null),
    })
  }

  loadCategories(){
    this.categorySer.loadCategories().subscribe({
      next: (data) => this.categoryList = data.map(data => data.name)
    })
  }
  resetFilter(){
    this.productsListFilterForm = this.intializeFilterForm();
    this.doFilter.emit(this.productsListFilterForm.value);
    this.cd.detectChanges();
  }

  filterList(){
    this.doFilter.emit(this.productsListFilterForm.value);
    this.cd.detectChanges();

  }

  get id(){
    return this.productsListFilterForm.get('id')?.value
  }

  get name(){
    return this.productsListFilterForm.get('name')?.value
  }

  get categoryName(){
    return this.productsListFilterForm.get('categoryName')?.value
  }

  get minPrice(){
    return this.productsListFilterForm.get('minPrice')?.value
  }

  get maxPrice(){
    return this.productsListFilterForm.get('maxPrice')?.value
  }
}

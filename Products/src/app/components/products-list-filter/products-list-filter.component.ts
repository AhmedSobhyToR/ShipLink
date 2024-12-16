import { CommonModule, NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ProductFilter, SelectedItem } from '../../models/product.model';
import { CategoriesService } from '../../services/categories/categories.service';
import { Category } from '../../models/category.model';
import { DropdownListComponent } from "../dropdown-list/dropdown-list.component";

@Component({
  selector: 'app-products-list-filter',
  standalone: true,
  imports: [TranslateModule, ReactiveFormsModule, CommonModule, NgClass, DropdownListComponent],
  templateUrl: './products-list-filter.component.html',
  styleUrl: './products-list-filter.component.css'
})
export class ProductsListFilterComponent implements OnInit {

  productsListFilterForm!: FormGroup;
  categoryList!: SelectedItem[];
  @Output() doFilter =  new EventEmitter<ProductFilter>();
  @ViewChild("popOver") popOver!: ElementRef;
  // @Output() isFiltered =  new EventEmitter<boolean>();


  constructor(private cd: ChangeDetectorRef,
    private categorySer: CategoriesService,
    private translate: TranslateService
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
      next: (data) => this.categoryList = data.map(row =>({
        value: row.id,
        label: row.name
      } as SelectedItem))
    })
  }
  
  resetFilter(){
    this.productsListFilterForm = this.intializeFilterForm();
    this.doFilter.emit(this.productsListFilterForm.value);
    this.popOver.nativeElement.className = "hidden"
    this.cd.detectChanges();
  }

  filterList(){
    this.productsListFilterForm.patchValue({
      categoryName: this.categoryName?.label
    })
    this.doFilter.emit(this.productsListFilterForm.value);
    this.popOver.nativeElement.className = "hidden"
    this.cd.detectChanges();


  }

  get getLang(){
    return this.translate.currentLang
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

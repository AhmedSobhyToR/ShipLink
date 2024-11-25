import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MoreIconComponent } from '../../components/more-icon/more-icon.component';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { TablePaginatorComponent } from '../../components/table-paginator/table-paginator.component';
import { ProductsListFilterComponent } from '../../components/products-list-filter/products-list-filter.component';
import { LoadingService } from '../../services/loading.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ExcelService } from '../../services/excel.service';
import { Column } from '../../models/column.model';
import { Product, ProductFilter } from '../../models/product.model';
import { PRODUCT_LIST_COLUMN } from '../../enums/product-enums';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [TranslateModule,
    CommonModule,
     MoreIconComponent,
      PageHeaderComponent, TablePaginatorComponent, 
      ProductsListFilterComponent],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent implements OnInit{

  prdList:Product[] = [];
  filteredPrdList: Product[] = [];
  productListColumns!: Column[];
  numberOfPages!:number;
  numberOfItems!: number;
  isFiltered: boolean = true;
  showFilter: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
    private loading: LoadingService,
    private router: Router,
    private excelSer: ExcelService,
    private translate: TranslateService
  ){
  }
  ngOnInit(): void {
    this.productListColumns = PRODUCT_LIST_COLUMN
     this.activatedRoute.data.subscribe({
      next: (data) => {
        this.prdList = data['productsList']
        this.filteredPrdList = this.prdList
        // this.numberOfPages = data['productsList'].pages
        this.numberOfItems = this.filteredPrdList.length
        this.loading.endLoading();
      }
    })
  }
  
  onProductChange(products: Product[]){
    this.prdList = products;
    this.filteredPrdList = this.prdList;
  }

  onNewProduct(){
    this.router.navigate(['/new-product'])
  }
  toggleFilter(){
    this.showFilter = !this.showFilter;
  }


  onFilter(filter: ProductFilter){
    this.filteredPrdList = this.prdList;

    this.toggleFilter();
    if(this.isFiltered){
      if(filter.id)
        this.filteredPrdList = this.filteredPrdList.filter((row)=> row.id == filter.id)
      if(filter.name)
        this.filteredPrdList = this.filteredPrdList.filter((row)=> row.name == filter.name)
      if(filter.categoryName)
        this.filteredPrdList = this.filteredPrdList.filter((row)=> row.category.name == filter.categoryName)
      if(filter.minPrice)
        this.filteredPrdList = this.filteredPrdList.filter((row)=> row.price >= filter.minPrice)
      if(filter.maxPrice)
        this.filteredPrdList = this.filteredPrdList.filter((row)=> row.price <= filter.maxPrice)
    }
    this.numberOfItems = this.filteredPrdList.length
  }

  exportToExcel(){
    this.excelSer.exportToExcel(this.filteredPrdList as Product[],
       this.productListColumns as Column[],'products-list')
  }

  get getLang(){
    return this.translate.currentLang
  }
}



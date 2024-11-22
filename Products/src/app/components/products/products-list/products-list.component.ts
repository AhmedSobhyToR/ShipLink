import { AfterViewInit, Component, OnInit } from '@angular/core';
import { PRODUCT_LIST_COLUMN } from '../../../enums/product-enums';
import { Column } from '../../../models/column.model';
import { TranslateModule } from '@ngx-translate/core';
import { Product, ProductFilter } from '../../../models/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../../services/products/products.service';
import { MoreIconComponent } from "../../more-icon/more-icon.component";
import { LoadingService } from '../../../services/loading.service';
import { LoadingComponent } from "../../loading/loading.component";
import { PageHeaderComponent } from "../../page-header/page-header/page-header.component";
import { TablePaginatorComponent } from "../../table-paginator/table-paginator.component";
import { ProductsListFilterComponent } from "../../products-list-filter/products-list-filter.component";
import { CommonModule } from '@angular/common';
import { ExcelService } from '../../../services/excel.service';
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
    private excelSer: ExcelService
  ){
  }
  ngOnInit(): void {
    this.productListColumns = PRODUCT_LIST_COLUMN
     this.activatedRoute.data.subscribe({
      next: (data) => {
        this.prdList = data['productsList'].data
        this.filteredPrdList = this.prdList
        this.numberOfPages = data['productsList'].pages
        this.numberOfItems = data['productsList'].items
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
      if(filter.categoryId)
        this.filteredPrdList = this.filteredPrdList.filter((row)=> row.categoryId == filter.categoryId)
      if(filter.minPrice)
        this.filteredPrdList = this.filteredPrdList.filter((row)=> row.price >= filter.minPrice)
      if(filter.maxPrice)
        this.filteredPrdList = this.filteredPrdList.filter((row)=> row.price <= filter.maxPrice)
    }
  }

  exportToExcel(){
    this.excelSer.exportToExcel(this.filteredPrdList as Product[],
       this.productListColumns as Column[],'products-list')
  }

}



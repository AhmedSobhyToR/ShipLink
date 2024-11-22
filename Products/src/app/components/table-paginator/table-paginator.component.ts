import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Sizes } from '../../enums/product-enums';
import { TranslateModule } from '@ngx-translate/core';
import { ProductsService } from '../../services/products/products.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-table-paginator',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './table-paginator.component.html',
  styleUrl: './table-paginator.component.css'
})
export class TablePaginatorComponent implements OnInit{
  @Input({required:true})numberOfPages!: number;
  sizes: number[]= Sizes;
  pages: number[] = [];
  isPageExpanded: boolean = false;
  isSizeExpanded: boolean = false;
  currentSize:number = 10;
  @Output() onProductChange = new EventEmitter<Product[]>();

  constructor(private productsSer: ProductsService){}
  ngOnInit(){
    this.getNumberOfPagesArray();
  }
  onPageExpand(){
    this.isPageExpanded = !this.isPageExpanded;
  }

  onSizeExpand(){
    this.isSizeExpanded = !this.isSizeExpanded;
  }

  onPageChange(page: number){
    this.productsSer.getProducts(page,this.currentSize).subscribe({
      next: (data) => this.onProductChange.emit(data.data)
    })
    this.isPageExpanded = !this.isPageExpanded;
    this.isSizeExpanded = false;

  }

  onPageSizeChange(size: number){
    this.currentSize = size;
    this.productsSer.getProducts(1,size).subscribe({
      next: (data) => {
        this.numberOfPages = data.pages
        this.getNumberOfPagesArray()
        this.onProductChange.emit(data.data)
      }
    })
    this.isSizeExpanded = !this.isSizeExpanded;
    this.isPageExpanded = false;

  }

  getNumberOfPagesArray(){
    this.pages = [];
    for(let i =1 ; i<= this.numberOfPages; i++){
      this.pages = [...this.pages, i]
    }
  }
}


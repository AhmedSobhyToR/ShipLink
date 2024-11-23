import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, ProductDetails } from '../../../models/product.model';
import { LoadingComponent } from "../../loading/loading.component";
import { LoadingService } from '../../../services/loading.service';
import { CategoriesService } from '../../../services/categories/categories.service';
import { PageHeaderComponent } from "../../page-header/page-header/page-header.component";

@Component({
  selector: 'app-products-details',
  standalone: true,
  imports: [ PageHeaderComponent],
  templateUrl: './products-details.component.html',
  styleUrl: './products-details.component.css'
})
export class ProductsDetailsComponent implements OnInit {
  prdDetails!: ProductDetails;
  categoryName!: string;
  constructor(private activatedRoute: ActivatedRoute,
    private loadingSer: LoadingService,
    private categorySer: CategoriesService
  ){}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe({
      next: (data) => {
        this.prdDetails = data['productDetails']
        this.loadingSer.endLoading();
      }
    })
    this.getCategory();
  }

    getCategory(){
    return this.categorySer.loadCategory(this.prdDetails.categoryId).subscribe({
      next: (data) => this.categoryName = data.name
    })
  }

  getStarsArray(rating: number){
    return Array(rating).fill(0)
  }
}

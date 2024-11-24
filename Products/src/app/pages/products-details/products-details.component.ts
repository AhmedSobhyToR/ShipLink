import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../../services/categories/categories.service';
import { LoadingService } from '../../services/loading.service';
import { ProductDetails } from '../../models/product.model';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-products-details',
  standalone: true,
  imports: [ PageHeaderComponent, TranslateModule],
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
    return this.categorySer.loadCategory(this.prdDetails.category.id).subscribe({
      next: (data) => this.categoryName = data.name
    })
  }

  getStarsArray(rating: number){
    return Array(rating).fill(0)
  }
}

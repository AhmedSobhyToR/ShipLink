import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../models/product.model';
import { LoadingComponent } from "../../loading/loading.component";
import { LoadingService } from '../../../services/loading.service';

@Component({
  selector: 'app-products-details',
  standalone: true,
  imports: [LoadingComponent],
  templateUrl: './products-details.component.html',
  styleUrl: './products-details.component.css'
})
export class ProductsDetailsComponent implements OnInit {
  prdDetails!: Product[]
  constructor(private activatedRoute: ActivatedRoute,
    private loadingSer: LoadingService
  ){}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe({
      next: (data) => {
        this.prdDetails = data['productDetails']
        this.loadingSer.endLoading();
      }
    })
  }


}

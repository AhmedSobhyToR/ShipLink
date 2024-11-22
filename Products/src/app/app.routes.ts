import { Routes } from '@angular/router';
import { ProductsListComponent } from './components/products/products-list/products-list.component';
import { ProductsDetailsComponent } from './components/products/products-details/products-details.component';
import { ProductsListResolver } from './resolvers/products-list-resolver';
import { ProductDetailsResolver } from './resolvers/product-details-resolver';
import { NewProductComponent } from './pages/new-product/new-product.component';

export const routes: Routes = [
    // Products
    
     // Products List
     {path: 'products-list', component: ProductsListComponent,
         resolve:{productsList: ProductsListResolver}},
     // Product Details
     {path: 'product-details/:id', component: ProductsDetailsComponent,
         resolve: {productDetails: ProductDetailsResolver}},
     // New Product
     {path: 'new-product', component: NewProductComponent,
        resolve:{productsList: ProductsListResolver}
     },

    //  Shipment

];

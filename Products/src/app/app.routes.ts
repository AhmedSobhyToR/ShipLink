import { Routes } from '@angular/router';

import { ProductsListResolver } from './resolvers/products-list-resolver';
import { ProductDetailsResolver } from './resolvers/product-details-resolver';
import { NewProductComponent } from './pages/new-product/new-product.component';
import { ShipmentsListComponent } from './pages/shipments-list/shipments-list.component';
import { ShipmentDetailsComponent } from './pages/shipment-details/shipment-details.component';
import { NewShipmentComponent } from './pages/new-shipment/new-shipment.component';
import { ShipmentsListResolver } from './resolvers/shipments-list-resolver';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { ProductsDetailsComponent } from './pages/products-details/products-details.component';
import { ShipmentDetailsResolver } from './resolvers/shipment-details-resolver';
import { NewShipmentResolver } from './resolvers/new-shipment-resolver';

export const routes: Routes = [
    // Products
    
     // Products List
     {path: 'products/products-list', component: ProductsListComponent,
         resolve:{productsList: ProductsListResolver}},
     // Product Details
     {path: 'products/product-details/:id', component: ProductsDetailsComponent,
         resolve: {productDetails: ProductDetailsResolver}},
     // New Product
     {path: 'products/new-product', component: NewProductComponent,
        resolve:{productsList: ProductsListResolver}
     },
   //  Shipment List
     {path: 'shipments/shipments-list', component: ShipmentsListComponent,
        resolve:{shipmentsList: ShipmentsListResolver}
     },
    // Shipment Details
    {path: 'shipments/shipment-details/:id', component: ShipmentDetailsComponent,
      resolve: {shipmentDetails: ShipmentDetailsResolver}
    },

      // New Shipment Request
      {path: 'shipments/new-shipment', component: NewShipmentComponent,
        resolve:{shipmentId: NewShipmentResolver}
      },

];

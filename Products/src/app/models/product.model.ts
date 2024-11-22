export interface Product{
    id: number;
    name: string;
    categoryId: number;
    price: number;
    description: string;
    stock: number;
    [key: string]: any; 
}

export interface ProductDetails{
    
}

export interface ProductFilter{
    id: number;
    name: string;
    categoryId: number;
    minPrice: number;
    maxPrice: number;

}
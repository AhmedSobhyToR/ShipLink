import { Category } from "./category.model";

export interface Product{
    id: number;
    name: string;
    category: Category;
    price: number;
    description: string;
    stock: number;
    [key: string]: any; 
}

export interface ProductDetails{
    id: number;
    name: string;
    category: Category;
    price: number;
    description: string;
    stock: number;
    // QRCode: string;
    imageUrl: string;
    brand: string;
    model: string;
    warranty: string;
    addedDate: string;
    discount: DiscountDto;
    dimensions: DimensionsDto;
    review: ProductReview[];
    color: string[];
    [key: string]: any; 
}

export interface ProductFilter{
    id: number;
    name: string;
    categoryName: string;
    minPrice: number;
    maxPrice: number;
}

export interface DiscountDto{
    amount: number;
    validUntil: string;
}

export interface DimensionsDto{
        height: number,
        width: number,
        weight: number
}

export interface ProductReview{
    reviewId: string,
    user: string,
    comment: string,
    rating: number
}
export interface ProductFilterParams {
  category?: string;
  brand?: string;
  color?: string;
  size?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  sortBy?: 'price' | 'createdAt' | 'rating';
  orderBy?: 'asc' | 'desc';
}

export interface ProductQueryParams {
  filters: ProductFilterParams;
  page: number;
  limit: number;
}

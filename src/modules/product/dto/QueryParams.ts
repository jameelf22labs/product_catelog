export default interface ProductQueryParams {
  category?: string;
  brand?: string;
  color?: string;
  size?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  sortBy?: string;
  orderBy?: string;
  page: number;
  limit: number;
}

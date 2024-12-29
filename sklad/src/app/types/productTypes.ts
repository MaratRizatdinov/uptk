export type ProductTypeWithoutId = {
  product_name: string;
  product_category: string;
  product_marking: string;
  product_diameter: number;
  product_length: number;
  unit_of_measure: string;
  weight_per_meter: number;
};

export type ProductType = {
  product_id: number;
  product_name: string;
  product_category: string;
  product_marking: string;
  product_diameter: number;
  product_length: number;
  unit_of_measure: string;
  weight_per_meter: number;
};

export type ProductItem = {
  item_id: string;
  product_id: number | undefined;
  product_fuse: number | undefined;
  product_code: number | undefined;
  warehouse_id: number | undefined;
  weight: number | undefined;
};

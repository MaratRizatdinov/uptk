export type ProductType = {
    id: string;
    name: string;
    fuse: string;
    code: string;
    weight: string;
  };

  export type ArrivalDocumentType = {
    doc_id: string;
    date: string;
    internalNum: string;
    supplier: string;
    products: ProductType[];
  };


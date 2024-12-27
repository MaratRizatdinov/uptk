export type initDocsType = {
  init_doc_id: number;
  init_date: Date;
  init_doc_alias: "Init" | "Arrival" | "Shipment" | "Movement";
  init_internal_num: number | null;
};
export type initDocsTypeWithoutId = {
  init_date: Date;
  init_doc_alias: "Init" | "Arrival" | "Shipment" | "Movement";
  init_internal_num: number | null;
};

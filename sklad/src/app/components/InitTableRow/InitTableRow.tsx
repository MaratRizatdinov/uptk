import {  ProductType } from "@/app/types/arrivalTypes";
import { nanoid } from "nanoid";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

type ProductItem = {
  row_id: string;  
  product_id: number | null;
  product_fuse: number | null;
  product_code: number | null;
  warehouse_id: number | null;
  weight: number | null;
};

type InitDoc = {
  init_date: string;
  init_doc_alias: "Init";
  init_internal_num: number | null;
  items: ProductItem[];
};

type Iprops = {
  index: number;
  data: InitDoc;
  setData: Dispatch<SetStateAction<InitDoc>>;
};

type ProductKeys = keyof ProductItem;

export default function InitTableRow({
  index,
  data,
  setData,
}: Iprops) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>, key: ProductKeys) => {
    const clone = structuredClone(data);
    const row = clone.items[index];
    row[key] = e.target.value      
    setData(clone);
  };

  return (
    <div className="tableRow" style={{ display: "flex" }}>
      <div className="rowCount">{index + 1}</div>

      <input
        type="text"
        value={data.items[index].product_id}
        placeholder="Название"
        onChange={(event) => handleChange(event, "name")}
      />
      <input
        type="text"
        value={arrivalData.products[index].fuse}
        placeholder="Плавка"
        onChange={(event) => handleChange(event, "fuse")}
      />
      <input
        type="text"
        value={arrivalData.products[index].code}
        placeholder="Код"
        onChange={(event) => handleChange(event, "code")}
      />
      <input
        type="number"
        value={arrivalData.products[index].weight}
        placeholder="Вес"
        onChange={(event) => handleChange(event, "weight")}
      />
      <button
        onClick={(event) => {
          event.preventDefault();
          const clone = structuredClone(arrivalData);
          clone.products.splice(index, 1);
          setArrivalData(clone);
        }}
      >
        Delete
      </button>
      <button
        onClick={(event) => {
          event.preventDefault();
          const clone = structuredClone(arrivalData);
          const newRow = { ...clone.products[index], id: nanoid() };
          clone.products.push(newRow);
          setArrivalData(clone);
        }}
      >
        Copy
      </button>
    </div>
  );
}

"use client";

import { useState } from "react";
// import { format } from "date-fns";
// import { nanoid } from "nanoid";
// import { ArrivalDocumentType, ProductType } from "@/app/types/arrivalTypes";
// import ArrivalTableRow from "@/app/components/ArrivalTableRow/ArrivalTableRow";

type ProductItem = {
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

export default function CreateInitDoc() {
  const initDoc: InitDoc = {
    init_date: "",
    init_doc_alias: "Init",
    init_internal_num: null,
    items: [],
  };
  //   const initialArrivalDocument: ArrivalDocumentType = {
  //     doc_id: nanoid(),
  //     date: "",
  //     internalNum: "",
  //     supplier: "",
  //     products: [],
  //   };
  const emptyItem: ProductItem = {
    product_id: null,
    product_fuse: null,
    product_code: null,
    warehouse_id: null,
    weight: null
  };

  const [data, setData] = useState(initDoc);

    const handleAddRow = () => {
      const clone = structuredClone(data);
      clone.items.push(emptyItem);
      setData(clone);
    };
    const totalWeight = data.items.reduce(
      (acc, elem) => acc + Number(elem.weight),
      0
    );

  return (
    <div className="container">
      <form action="#">
        <h3>Ввод начальных остатков</h3>
        <input
          type="date"
          name="date "
          value={data.init_date}
          placeholder="Введите дату"
          onChange={(event) => {
            const clone = structuredClone(data);
            setData({ ...clone, init_date: event.target.value });
          }}
        />
        <br />
        <input
          type="text"
          placeholder="Введите Вн.№ документа"
          onChange={(event) => {
            const clone = structuredClone(data);
            setData({
              ...clone,
              init_internal_num: Number(event.target.value),
            });
          }}
        />
        <br />        
        <div className="documentTotalWeight">{totalWeight}</div>
        <div className="formTable">
          <div className="tableTitle"></div>
          <div className="tableContent">
            {/* {data.items.map((item, index) => (
              <ArrivalTableRow
                key={product.id}
                index={index}
                arrivalData={arrivalData}
                setArrivalData={setArrivalData}
              />
            ))} */}
          </div>
        </div>
      </form>
      <button onClick={handleAddRow}>Добавить строку</button>
      <button onClick={() => console.log(data)}>
        Показать что в документе
      </button>
    </div>
  );
}

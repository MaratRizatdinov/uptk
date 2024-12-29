"use client";

import { useState } from "react";
import { nanoid } from "nanoid";
import ItemsTable from "@/app/components/Tables/ItemsTable/ItemsTable";
import { ProductItem } from "@/app/types/productTypes";
import { InitDoc } from "@/app/types/InitDocsType";

export default function CreateInitDoc() {
  const initDoc: InitDoc = {
    init_date: "",
    init_doc_alias: "Init",
    init_internal_num: null,
    items: [],
  };

  const emptyItem: ProductItem = {
    item_id: nanoid(),
    product_id: undefined,
    product_fuse: undefined,
    product_code: undefined,
    warehouse_id: undefined,
    weight: undefined,
  };

  const [data, setData] = useState(initDoc);

  const handleAddRow = () => {
    const clone = structuredClone(data);
    clone.items.push(emptyItem);
    setData(clone);
  };
  const totalWeight = data.items.reduce(
    (acc, elem) => acc + (Number(elem.weight) || 0),
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
        <div className="documentTotalWeight">
          Итого по документу: {totalWeight}
        </div>
        <div className="formTable">
          <div className="tableTitle"></div>
          <div className="tableContent">
            <ItemsTable data={data} setData={setData} />
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

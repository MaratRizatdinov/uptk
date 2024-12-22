"use client";

import { useState } from "react";
import ArrivalTableRow from "../components/ArrivalTableRow/ArrivalTableRow";
import { ArrivalDocumentType, ProductType } from "../types/arrivalTypes";
import { nanoid } from "nanoid";

export default function ArrivalPage() {
  const initialArrivalDocument: ArrivalDocumentType = {
    doc_id: nanoid(),
    date: "",
    internalNum: "",
    supplier: "",
    products: [],
  };
  const emptyProduct: ProductType = {
    id: nanoid(),
    name: "",
    fuse: "",
    code: "",
    weight: "",
  };

  const [arrivalData, setArrivalData] = useState(initialArrivalDocument);

  const handleAddRow = () => {
    const clone = structuredClone(arrivalData);
    clone.products.push(emptyProduct);
    setArrivalData(clone);
  };
  const totalWeight = arrivalData.products.reduce(
    (acc, elem) => acc + Number(elem.weight),
    0
  );

  return (
    <div className="container">
      <form action="#">
        <h3>Приход товара</h3>
        <input
          type="date"
          name="date "
          value={arrivalData.date}
          placeholder="Введите дату"
          onChange={(event) => {
            const clone = structuredClone(arrivalData);
            setArrivalData({ ...clone, date: event.target.value });
          }}
        />
        <br />
        <input
          type="text"
          placeholder="Введите Вн.№ документа"
          onChange={(event) => {
            const clone = structuredClone(arrivalData);
            setArrivalData({ ...clone, internalNum: event.target.value });
          }}
        />
        <br />
        <input
          type="text"
          placeholder="Поставщик"
          onChange={(event) => {
            const clone = structuredClone(arrivalData);
            setArrivalData({ ...clone, supplier: event.target.value });
          }}
        />
        <br />
        <div className="documentTotalWeight">{totalWeight}</div>
        <div className="formTable">
          <div className="tableTitle"></div>
          <div className="tableContent">
            {arrivalData.products.map((product, index) => (
              <ArrivalTableRow
                key={product.id}
                index={index}
                arrivalData={arrivalData}
                setArrivalData={setArrivalData}
              />
            ))}
          </div>
        </div>
      </form>
      <button onClick={handleAddRow}>Добавить строку</button>
      <button onClick={() => console.log(arrivalData)}>
        Показать что в документе
      </button>
    </div>
  );
}

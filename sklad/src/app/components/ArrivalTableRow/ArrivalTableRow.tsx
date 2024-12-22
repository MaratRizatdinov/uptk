/* eslint-disable @typescript-eslint/no-unused-expressions */
import { ArrivalDocumentType, ProductType } from "@/app/types/arrivalTypes";
import { nanoid } from "nanoid";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

type Iprops = {
  index: number;
  arrivalData: ArrivalDocumentType;
  setArrivalData: Dispatch<SetStateAction<ArrivalDocumentType>>;
};

type ProductKeys = keyof ProductType;

export default function ArrivalTableRow({
  index,
  arrivalData,
  setArrivalData,
}: Iprops) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>, key: ProductKeys) => {
    const clone = structuredClone(arrivalData);
    const row = clone.products[index];
    row[key] = e.target.value      
    setArrivalData(clone);
  };

  return (
    <div className="tableRow" style={{ display: "flex" }}>
      <div className="rowCount">{index + 1}</div>

      <input
        type="text"
        value={arrivalData.products[index].name}
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

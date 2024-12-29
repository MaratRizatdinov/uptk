"use client";
import { InitDoc } from "@/app/types/InitDocsType";
import styles from "../Tables.module.css";
import { Dispatch, SetStateAction } from "react";

import { TableRow } from "./TableRow/TableRow";

type Iprops = {
  data: InitDoc;
  setData: Dispatch<SetStateAction<InitDoc>>;
};
export default function ItemsTable({ data, setData }: Iprops) {
  if (!setData) return;

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>№ п/п</th>  
          <th>Наименование</th>
          <th>Плавка</th>
          <th>Код</th>
          <th>Склад</th>
          <th>Вес</th>
          <th>Delete</th>
          <th>Copy</th>
        </tr>
      </thead>
      <tbody>
        {data ? (
          data.items.map((product, index) => (
            <TableRow
              key={product.item_id}
              product={product}
              data={data}
              setData={setData}
              index={index}
            />
          ))
        ) : (
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

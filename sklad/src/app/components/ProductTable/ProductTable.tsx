"use client";
import { ProductType } from "@/app/types/productTypes";
import styles from "./ProductTable.module.css";
import { useRouter } from "next/navigation";

type Iprops = {
  products: ProductType[];
};

export default function ProductTable({ products }: Iprops) {
  const router = useRouter();
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Наименование</th>
          <th>Категория</th>
          <th>Марка</th>
          <th>Диаметр</th>
          <th>Длина</th>
          <th>ЕИ</th>
          <th>Вес 1 шт</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr
            key={product.product_id}
            onClick={() =>
              router.push(`/basic_data/products/${product.product_id}`)
            }
          >
            <td>{product.product_name}</td>
            <td>{product.product_category}</td>
            <td>{product.product_marking}</td>
            <td>{product.product_diameter}</td>
            <td>{product.product_length}</td>
            <td>{product.unit_of_measure}</td>
            <td>{product.weight_per_meter}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

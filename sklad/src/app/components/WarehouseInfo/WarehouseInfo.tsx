"use client";
import { deleteWarehouse, updateWarehouse } from "@/app/api/warehousesApi";
import { WarehouseType } from "@/app/types/warehouseTypes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MouseEvent, useState } from "react";

type Iprops = {
  warehouse: WarehouseType;
};

export default function WarehouseInfo({ warehouse }: Iprops) {
  const router = useRouter();
  const { warehouse_id, warehouse_name } = warehouse;
  const [name, setName] = useState(warehouse_name);

  if (!warehouse_id) {
    return <h1>Данные отсутствуют</h1>;
  }

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const body = { warehouse_id, warehouse_name: name };
    const data = await updateWarehouse(body);
    if (data) {
      router.push("/basic_data/warehouses");
    }
  };
  const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const data = await deleteWarehouse({ id: warehouse_id });
    if (data) {
      router.push("/basic_data/warehouses");
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        style={{
          width: "400px",
          height: "600px",
          display: "flex",
          flexDirection: "column",
          gap: "25px",
        }}
      >
        <h1>Данные склада </h1>
        <label> Код склада</label>
        <input type="text" value={warehouse_id} disabled />

        <label> Наименование склада</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={(e) => handleSubmit(e)}>Отправить</button>
        <button onClick={(e) => handleDelete(e)}>Удалить</button>
        <br />
        <Link href={"/basic_data/warehouses"}>Назад</Link>
      </form>
    </div>
  );
}

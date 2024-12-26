import { getWarehouses } from "@/app/api/warehousesApi";
import { WarehouseType } from "@/app/types/warehouseTypes";
import Link from "next/link";

export default async function WarehousesPage() {
  const warehouses: WarehouseType[] = await getWarehouses();

  return (
    <div
      style={{
        height: "100vh",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          height: "400px",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1 style={{ marginBottom: "30px" }}>Склады</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "30px",
          }}
        >
          {warehouses.map((warehouse) => (
            <Link
              key={warehouse.warehouse_id}
              style={{ cursor: "pointer" }}
              href={`/basic_data/warehouses/${warehouse.warehouse_id}`}
            >
              {warehouse.warehouse_name}
            </Link>
          ))}
        </div>
        <br />
        <br />
        <Link href={"/basic_data/warehouses/create"}>Добавить склад</Link>
        <br />
        <br />
        <Link href={"/basic_data"}>Назад</Link>
      </div>
    </div>
  );
}

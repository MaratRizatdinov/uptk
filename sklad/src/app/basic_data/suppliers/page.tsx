import { getSuppliers } from "@/app/api/suppliersApi";
import { SupplierType } from "@/app/types/supplierTypes";
import Link from "next/link";

export default async function SuppliersPage() {
  const suppliers: SupplierType[] = await getSuppliers();

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
        <h1 style={{ marginBottom: "30px" }}>Поставщики</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "30px",
          }}
        >
          {suppliers.map((supplier) => (
            <Link
              key={supplier.supplier_id}
              style={{ cursor: "pointer" }}
              href={`/basic_data/suppliers/${supplier.supplier_id}`}
            >
              {supplier.supplier_name}
            </Link>
          ))}
        </div>
        <br />
        <br />
        <Link href={"/basic_data/suppliers/create"}>Добавить поставщика</Link>
        <br />
        <br />
        <Link href={"/basic_data"}>Назад</Link>
      </div>
    </div>
  );
}

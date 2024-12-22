"use client";
import { deleteSupplier, updateSupplier } from "@/app/api/suppliersApi";
import { SupplierType } from "@/app/types/supplierTypes";
import { useRouter } from "next/navigation";
import { MouseEvent, useState } from "react";

type Iprops = {
  supplier: SupplierType;
};

export default function SupplierInfo({ supplier }: Iprops) {
  const router = useRouter();
  const { supplier_id, supplier_name } = supplier;
  const [name, setName] = useState(supplier_name);

  if (!supplier_id) {
    return <h1>Данные отсутствуют</h1>;
  }

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const body = { supplier_id, supplier_name: name };
    const data = await updateSupplier(body);
    if (data) {
      router.push("/basic_data/suppliers");
    }
  };
  const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const data = await deleteSupplier({ id: supplier_id });
    if (data) {
      router.push("/basic_data/suppliers");
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
        <h1>Данные поставщика </h1>
        <label> Код поставщика</label>
        <input type="text" value={supplier_id} disabled />

        <label> Наименование поставщика</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={(e) => handleSubmit(e)}>Отправить</button>
        <button onClick={(e) => handleDelete(e)}>Удалить</button>
      </form>
    </div>
  );
}

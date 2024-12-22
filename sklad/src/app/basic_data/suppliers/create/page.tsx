"use client";
import { createSupplier } from "@/app/api/suppliersApi";
import { useRouter } from "next/navigation";
import { MouseEvent, useState } from "react";

export default function Page() {
  const router = useRouter();
  const [name, setName] = useState("");

  const handleCreate = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const data = await createSupplier({ name });
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
        <h1>Создание поставщика </h1>

        <label> Наименование поставщика</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={(e) => handleCreate(e)}>Добавить</button>
      </form>
    </div>
  );
}

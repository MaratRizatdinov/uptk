import { SupplierType } from "../types/supplierTypes";

const url = "http://localhost:3008/api/supplier";

export async function getSuppliers() {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Ошибка при получении данных");
  }
  return res.json();
}

export async function getOneSupplier({ id }: { id: string }) {
  const res = await fetch(url + `/${id}`);

  if (!res.ok) {
    throw new Error("Ошибка при получении данных");
  }
  return res.json();
}
export async function updateSupplier(body: SupplierType) {
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error("Ошибка при получении данных");
  }
  return res.json();
}
export async function deleteSupplier({ id }: { id: number }) {
  const res = await fetch(url + `/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Ошибка при получении данных");
  }
  return res.json();
}

export async function createSupplier({ name }: { name: string }) {
  const res = await fetch(url, {
    method: "POST",    
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ supplier_name: name }),
  });
  if (!res.ok) {
    throw new Error("Ошибка при получении данных");
  }
  return res.json();
}

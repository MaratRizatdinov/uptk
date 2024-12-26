import { WarehouseType } from "../types/warehouseTypes";

const url = "http://localhost:3008/api/warehouse";

export async function getWarehouses() {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Ошибка при получении данных");
  }
  return res.json();
}

export async function getOneWarehouse({ id }: { id: string }) {
  const res = await fetch(url + `/${id}`);

  if (!res.ok) {
    throw new Error("Ошибка при получении данных");
  }
  return res.json();
}
export async function updateWarehouse(body: WarehouseType) {
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

export async function deleteWarehouse({ id }: { id: number }) {
  const res = await fetch(url + `/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Ошибка при получении данных");
  }
  return res.json();
}

export async function createWarehouse({ name }: { name: string }) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ warehouse_name: name }),
  });
  if (!res.ok) {
    throw new Error("Ошибка при получении данных");
  }
  return res.json();
}

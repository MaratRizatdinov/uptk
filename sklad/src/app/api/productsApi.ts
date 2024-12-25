import { ProductType, ProductTypeWithoutId } from "../types/productTypes";

const url = "http://localhost:3008/api/product";

export async function getProducts() {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Ошибка при получении данных");
  }
  return res.json();
}
export async function getOneProduct({ id }: { id: string }) {
  const res = await fetch(url + `/${id}`);

  if (!res.ok) {
    throw new Error("Ошибка при получении данных");
  }
  return res.json();
}
export async function updateProduct(body: ProductType) {
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
export async function createProduct(body: ProductTypeWithoutId) {
  const res = await fetch(url, {
    method: "POST",
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

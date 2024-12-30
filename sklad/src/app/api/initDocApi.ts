import { CustomerType } from "../types/customerType";
import { InitDoc } from "../types/InitDocsType";

const url = "http://localhost:3008/api/init_doc";

export async function getInitDocsAll() {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Ошибка при получении данных");
  }
  return res.json();
}

// export async function getOneCustomer({ id }: { id: string }) {
//   const res = await fetch(url + `/${id}`);

//   if (!res.ok) {
//     throw new Error("Ошибка при получении данных");
//   }
//   return res.json();
// }
// export async function updateCustomer(body: CustomerType) {
//   const res = await fetch(url, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(body),
//   });

//   if (!res.ok) {
//     throw new Error("Ошибка при получении данных");
//   }
//   return res.json();
// }

// export async function deleteCustomer({ id }: { id: number }) {
//   const res = await fetch(url + `/${id}`, {
//     method: "DELETE",
//   });

//   if (!res.ok) {
//     throw new Error("Ошибка при получении данных");
//   }
//   return res.json();
// }

export async function createInitDoc(body: InitDoc) {
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

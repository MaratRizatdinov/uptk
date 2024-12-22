"use client";
import { deleteCustomer, updateCustomer } from "@/app/api/customersApi";
import { CustomerType } from "@/app/types/customerType";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MouseEvent, useState } from "react";

type Iprops = {
  customer: CustomerType;
};

export default function CustomerInfo({ customer }: Iprops) {
  const router = useRouter();
  const { customer_id, customer_name } = customer;
  const [name, setName] = useState(customer_name);

  if (!customer_id) {
    return <h1>Данные отсутствуют</h1>;
  }

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const body = { customer_id, customer_name: name };
    const data = await updateCustomer(body);
    if (data) {
      router.push("/basic_data/customers");
    }
  };
  const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const data = await deleteCustomer({ id: customer_id });
    if (data) {
      router.push("/basic_data/customers");
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
        <h1>Данные покупателя </h1>
        <label> Код покупателя</label>
        <input type="text" value={customer_id} disabled />

        <label> Наименование покупателя</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={(e) => handleSubmit(e)}>Отправить</button>
        <button onClick={(e) => handleDelete(e)}>Удалить</button>
        <br/>
        <Link href={'/basic_data/customers'}>Назад</Link>
      </form>
    </div>
  );
}

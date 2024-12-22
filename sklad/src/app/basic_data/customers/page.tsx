import { getCustomers } from "@/app/api/customersApi";
import { CustomerType } from "@/app/types/customerType";
import Link from "next/link";

export default async function CustomersPage() {
  const customers: CustomerType[] = await getCustomers();

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
        <h1 style={{ marginBottom: "30px" }}>Покупатели</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "30px",
          }}
        >
          {customers.map((customer) => (
            <Link
              key={customer.customer_id}
              style={{ cursor: "pointer" }}
              href={`/basic_data/customers/${customer.customer_id}`}
            >
              {customer.customer_name}
            </Link>
          ))}
        </div>
        <br />
        <br />
        <Link href={"/basic_data/customers/create"}>Добавить покупателя</Link>
        <br />
        <br />
        <Link href={"/basic_data"}>Назад</Link>
      </div>
    </div>
  );
}

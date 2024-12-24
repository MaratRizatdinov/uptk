import { getProducts } from "@/app/api/productsApi";
import ProductTable from "@/app/components/ProductTable/ProductTable";
import { ProductType } from "@/app/types/productTypes";
import Link from "next/link";

export default async function ProductsPage() {
  const products: ProductType[] = await getProducts();

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
        <h1 style={{ marginBottom: "30px" }}>Товары</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "30px",
          }}
        >
          <ProductTable products={products} />
        </div>
        <br />
        <br />
        {/* <Link href={"/basic_data/customers/create"}>Добавить покупателя</Link> */}
        <br />
        <br />
        <Link href={"/basic_data"}>Назад</Link>
      </div>
    </div>
  );
}

/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { updateProduct } from "@/app/api/productsApi";
import { ProductType } from "@/app/types/productTypes";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

type Iprops = {
  product: ProductType;
};

export default function ProductInfo({ product }: Iprops) {
  const router = useRouter();

  if (!product.product_id) {
    return <h1>Данные отсутствуют</h1>;
  }

  const { register, handleSubmit } = useForm<ProductType>();

  const onSubmit: SubmitHandler<ProductType> = async (data) => {    
    const response = await updateProduct(data);
    if (response) {
      router.push("/basic_data/products");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="">Код продукта</label>
      <input
        defaultValue={product.product_id}
        {...register("product_id")}
        disabled
      />{" "}
      <br />
      <label htmlFor="">Наименование продукта</label>
      <input
        defaultValue={product.product_name}
        {...register("product_name")}
      />
      <br />
      <label htmlFor="">Категория продукта</label>
      <input
        defaultValue={product.product_category}
        {...register("product_category")}
      />
      <br />
      <label htmlFor="">Марка продукта</label>
      <input
        defaultValue={product.product_marking}
        {...register("product_marking")}
      />
      <br />
      <label htmlFor="">Диаметр</label>
      <input
        defaultValue={product.product_diameter}
        {...register("product_diameter")}
      />
      <br />
      <label htmlFor="">Длина</label>
      <input
        defaultValue={product.product_length}
        {...register("product_length")}
      />
      <br />
      <label htmlFor="">Единица измерения</label>
      <input
        defaultValue={product.unit_of_measure}
        {...register("unit_of_measure")}
      />
      <br />
      <label htmlFor="">Вес 1 штуки</label>
      <input
        defaultValue={product.weight_per_meter}
        {...register("weight_per_meter")}
      />
      <br />
      <input type="submit" />
    </form>
  );
}

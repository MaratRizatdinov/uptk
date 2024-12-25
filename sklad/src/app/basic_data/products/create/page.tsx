/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { createProduct } from "@/app/api/productsApi";
import { ProductTypeWithoutId } from "@/app/types/productTypes";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

export default function Page() {
  const router = useRouter();

  const { register, handleSubmit } = useForm<ProductTypeWithoutId>();

  const onSubmit: SubmitHandler<ProductTypeWithoutId> = async (data) => {
    const response = await createProduct(data);
    if (response) {
      router.push("/basic_data/products");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="">Наименование продукта</label>
      <input {...register("product_name")} />
      <br />
      <label htmlFor="">Категория продукта</label>
      <input {...register("product_category")} />
      <br />
      <label htmlFor="">Марка продукта</label>
      <input {...register("product_marking")} />
      <br />
      <label htmlFor="">Диаметр</label>
      <input {...register("product_diameter")} />
      <br />
      <label htmlFor="">Длина</label>
      <input {...register("product_length")} />
      <br />
      <label htmlFor="">Единица измерения</label>
      <input {...register("unit_of_measure")} />
      <br />
      <label htmlFor="">Вес 1 штуки</label>
      <input {...register("weight_per_meter")} />
      <br />
      <input type="submit" />
    </form>
  );
}

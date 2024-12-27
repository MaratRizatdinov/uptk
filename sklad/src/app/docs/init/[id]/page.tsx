import { getOneProduct } from "@/app/api/productsApi";
import ProductInfo from "@/app/components/ProductInfo/ProductInfo";

type Iprops = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Iprops) {
  try {
    const id = (await params).id;
    const product = await getOneProduct({ id });
    
    return <ProductInfo product={product} />;
  } catch(err) {
    console.log(err)
    return <h1>Данные отсутствую</h1>;
  }
}

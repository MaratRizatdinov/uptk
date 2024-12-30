import { getOneDocument } from "@/app/api/initDocApi";
import { getOneProduct } from "@/app/api/productsApi";
import ProductInfo from "@/app/components/ProductInfo/ProductInfo";

type Iprops = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Iprops) {
  try {
    const id = (await params).id;
    const document = await getOneDocument({ id });
    console.log(document);
    return <h1>Одиночный документ</h1>;
  } catch (err) {
    console.log(err);
    return <h1>Данные отсутствую</h1>;
  }
}

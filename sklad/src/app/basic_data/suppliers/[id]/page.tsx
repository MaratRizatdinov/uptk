import SupplierInfo from "@/app/components/SupplierInfo/SupplierInfo";
import { getOneSupplier } from "@/app/api/suppliersApi";

type Iprops = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Iprops) {
  try {
    const id = (await params).id;
    const supplier = await getOneSupplier({ id });
    return <SupplierInfo supplier={supplier} />;
  } catch {
    return <h1>Данные отсутствуют</h1>;
  }
}

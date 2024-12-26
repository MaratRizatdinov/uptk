import { getOneWarehouse } from "@/app/api/warehousesApi";
import WarehouseInfo from "@/app/components/WarehouseInfo/WarehouseInfo";

type Iprops = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Iprops) {
  try {
    const id = (await params).id;
    const warehouse = await getOneWarehouse({ id });
    return <WarehouseInfo warehouse={warehouse} />;
  } catch {
    return <h1>Данные отсутствуют</h1>;
  }
}

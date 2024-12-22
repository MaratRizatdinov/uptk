import { getOneCustomer } from "@/app/api/customersApi";
import CustomerInfo from "@/app/components/CustomerInfo/CustomerInfo";

type Iprops = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Iprops) {
  try {
    const id = (await params).id;
    const customer = await getOneCustomer({ id });
    return <CustomerInfo customer={customer} />;
  } catch {
    return <h1>Данные отсутствуют</h1>;
  }
}

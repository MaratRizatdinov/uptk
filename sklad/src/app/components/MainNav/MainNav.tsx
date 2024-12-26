import Link from "next/link";
import styles from "./MainNav.module.css";

type Iprops = {
  page: "main" | "basic" | "docs";
};

export default async function MainNav({ page }: Iprops) {
  const mainList = [
    { title: "Документы", to: "/docs" },
    { title: "Отчеты", to: "/arrival" },
    { title: "Справочники", to: "/basic_data" },
  ];
  const basicList = [
    { title: "Поставщики", to: "/basic_data/suppliers" },
    { title: "Покупатели", to: "/basic_data/customers" },
    { title: "Продукция", to: "/basic_data/products" },
    { title: "Склады", to: "/basic_data/warehouses" },
    { title: "На главную", to: "/" },
  ];
  const docsList = [
    { title: "Нач. остатки", to: "/arrival" },
    { title: "Приход", to: "/arrival" },
    { title: "Отгрузка", to: "/arrival" },
    { title: "Перемещения", to: "/arrival" },
    { title: "На главную", to: "/" },
  ];

  const renderList =
    page === "main" ? mainList : page === "basic" ? basicList : docsList;

  return (
    <div className={styles.container}>
      <div className={styles.stage}>
        {renderList.map((item) => (
          <div key={item.title}>
            <p>
              <Link href={item.to}>{item.title}</Link>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

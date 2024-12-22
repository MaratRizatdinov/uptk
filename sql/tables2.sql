-- СОЗДАЕМ ТАБЛИЦУ СКЛАДОВ
DROP  TABLE  IF EXISTS warehouse CASCADE;
CREATE TABLE warehouse
(
	warehouse_id serial PRIMARY KEY,
	warehouse_name varchar(64) NOT NULL,
	coordinate_X smallint NOT NULL,
	coordinate_Y smallint NOT NULL
);

INSERT INTO warehouse (warehouse_name, coordinate_X, coordinate_Y)
VALUES 
('Основной склад',0,0),
('Разбивка',0,1),
('Кассета 1',1,1),
('Кассета 2',1,2),
('Кассета 3',1,3),
('Кассета 4',1,4),
('Кассета 5',2,1),
('Кассета 6',2,2),
('Кассета 7',2,3),
('Кассета 8',2,4);

-- СОЗДАЕМ ТАБЛИЦУ С ТИПАМИ ПРОДУКЦИИ

DROP TABLE IF EXISTS product CASCADE;
CREATE TABLE product
(
	product_id serial PRIMARY KEY,
	product_name varchar(64) NOT NULL,
	product_category varchar(32) NOT NULL,
	product_steel varchar(32) NOT NULL,
	product_diameter int NOT NULL,
	product_length int NOT NULL,	
	unit_of_measure varchar(4) NOT NULL,
	weight_per_meter float
);

INSERT INTO product 
(
product_name,
product_category,
product_steel,
product_diameter,
product_length,
unit_of_measure,
weight_per_meter
)
VALUES 
('Armatura A240 d6 l-6000','Armatura','A240', 6, 6000, 'kg', 0.217),
('Armatura A240 d8 l-6000','Armatura','A240', 8, 6000, 'kg', 0.320),
('Armatura A240 d10 l-11700','Armatura','A240', 10, 11700, 'kg', 1.320),
('Armatura A240 d12 l-11700','Armatura','A240', 12, 11700, 'kg', 1.520),
('Armatura A240 d14 l-11700','Armatura','A240', 14, 11700, 'kg', 1.720),
('Armatura A240 d16 l-11700','Armatura','A240', 16, 11700, 'kg', 1.720);



--СОЗДАЕМ ТАБЛИЦУ ДЛЯ ХРАНЕНИЯ ЭКЗКМПЛЯРОВ ПРОДУКЦИИ

DROP TABLE IF EXISTS product_item CASCADE;
CREATE TABLE product_item
(
	item_id serial PRIMARY KEY,
	fk_product_id integer REFERENCES product(product_id),
	fuse varchar(16),
	code varchar(16)	
);

INSERT INTO product_item (fk_product_id, fuse, code)
VALUES
(6,'2412448','120'),
(6,'2412448','121'),
(6,'2412448','122'),
(6,'2412448','123'),
(6,'2412448','124'),
(5,'3412448','220'),
(5,'3412448','221'),
(5,'3412449','222'),
(5,'3412449','223'),
(5,'3412449','224');

--СОЗДАЕМ ТАБЛИЦУ ПОСТАВЩИКОВ

DROP TABLE IF EXISTS supplier CASCADE;
CREATE TABLE supplier
(
	supplier_id serial PRIMARY KEY,
	supplier_name varchar(64)		
);

INSERT INTO supplier (supplier_name)
VALUES
('ТЭМПО'),
('Урал-Сталь'),
('НЛМК');

--СОЗДАЕМ ТАБЛИЦУ ПОКУПАТЕЛЕЙ

DROP TABLE IF EXISTS customer CASCADE;
CREATE TABLE customer
(
	customer_id serial PRIMARY KEY,
	customer_name varchar(64)		
);

INSERT INTO customer (customer_name)
VALUES
('ГЛОБАЛ-ПЛЮС'),
('СУВАР-СТРОЙ'),
('ЖИЛСЕРВИС');

--СОЗДАЕМ ТАБЛИЦУ ТИПОВ ДОКУМЕНТОВ

DROP TABLE IF EXISTS doc_type CASCADE;
CREATE TABLE doc_type
(
	doc_type_id serial PRIMARY KEY,
	doc_type_name varchar(32)		
);

INSERT INTO doc_type (doc_type_name)
VALUES
('Начальный остаток'),
('Приход'),
('Перемещение'),
('Отгрузка');

--СОЗДАЕМ ТАБЛИЦУ РЕГИСТРАЦИИ ДОКУМЕНТОВ
DROP TABLE IF EXISTS logbook CASCADE;
CREATE TABLE  logbook
(
	doc_date timestamp NOT NULL,
	fk_doc_type integer REFERENCES doc_type NOT NULL,
	doc_number integer NOT NULL,
	fk_supplier_id integer  REFERENCES supplier(supplier_id),
	fk_customer_id integer  REFERENCES customer(customer_id),	
	fk_item_id integer REFERENCES  product_item(item_id) NOT NULL,
	fk_warehouse_id integer REFERENCES  warehouse(warehouse_id) NOT NULL,
	weight integer NOT NULL
);

INSERT INTO logbook 
VALUES
('2024-12-18',1,1,null, null,1,1,3500),
('2024-12-19',3,1,null, null,1,1,-3500),
('2024-12-19',3,1,null, null,1,2,3500),
('2024-12-19',4,1,null,1 ,1,2,-2800)
;

select * from logbook;

-- SELECT 
-- product_name AS "Наименование", (fuse||'/'||code) AS  code, warehouse_name, weight
-- FROM product_item
-- INNER JOIN product ON product_item.fk_product_id =product.product_id
-- INNER JOIN warehouse ON product_item.fk_warehouse_id =warehouse.warehouse_id;

-- SELECT product_name , SUM(weight)
-- FROM product_item
-- INNER JOIN product ON product_item.fk_product_id =product.product_id
-- GROUP BY product_name;

-- SELECT warehouse_name, product_name , SUM(weight)
-- FROM product_item
-- INNER JOIN product ON product_item.fk_product_id =product.product_id
-- INNER JOIN warehouse ON product_item.fk_warehouse_id =warehouse.warehouse_id
-- GROUP BY warehouse_name, product_name;

SELECT 
	doc_date as "Дата документа",
	(doc_type_name ||' № '||doc_number) as "Документ",
	product.product_name as "Наименование продукции",
	(product_item.fuse || ' / '|| product_item.code) as "Идентификатор",
	warehouse_name as "Склад",
	weight 	as "Вес",
	customer_name as "Покупатель"
	
FROM logbook
	INNER JOIN doc_type ON logbook.fk_doc_type = doc_type.doc_type_id
 	INNER JOIN product_item ON logbook.fk_item_id = product_item.item_id
	INNER JOIN product ON product_item.fk_product_id = product.product_id
	INNER JOIN warehouse ON logbook.fk_warehouse_id = warehouse.warehouse_id
	LEFT JOIN customer ON logbook.fk_customer_id = customer.customer_id;

	
 
SELECT
    warehouse_name,
	product_name ,
	SUM(weight)	as "Остаток"
FROM logbook
	INNER JOIN doc_type ON logbook.fk_doc_type = doc_type.doc_type_id
 	INNER JOIN product_item ON logbook.fk_item_id = product_item.item_id
	INNER JOIN product ON product_item.fk_product_id = product.product_id
	INNER JOIN warehouse ON logbook.fk_warehouse_id = warehouse.warehouse_id
GROUP BY warehouse_name, product_name
	HAVING SUM(weight)>0
	







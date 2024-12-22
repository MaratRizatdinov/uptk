------------------------------- УДАЛЕНИЕ ТАБЛИЦ и ТИПОВ
DROP TABLE IF EXISTS product CASCADE;
DROP TABLE IF EXISTS warehouse CASCADE;
DROP TABLE IF EXISTS init_journal CASCADE;
DROP TABLE IF EXISTS init_product_warehouse CASCADE;
DROP TABLE IF EXISTS move_product_warehouse CASCADE;
DROP TABLE IF EXISTS move_journal CASCADE;
DROP TABLE IF EXISTS supplier CASCADE;
DROP TABLE IF EXISTS arrival_journal CASCADE;
DROP TABLE IF EXISTS arrival_product_warehouse CASCADE;
DROP TABLE IF EXISTS customer CASCADE;
DROP TABLE IF EXISTS shipment_journal CASCADE;
DROP TABLE IF EXISTS shipment_product_warehouse CASCADE;

DROP type doc_type;


------------------------------- СОЗДАНИЕ ТИПОВ

CREATE type doc_type AS ENUM('Init', 'Arrival', 'Shipment', 'Movement');

------------------------------- СОЗДАНИЕ ТАБЛИЦ

--1. ТАБЛИЦА ПРОДУКТОВ

CREATE TABLE product
(
	product_id serial PRIMARY KEY,
	product_name varchar(32)
);

--2. ТАБЛИЦА СКЛАДОВ

CREATE TABLE warehouse
(
	warehouse_id serial PRIMARY KEY,
	warehouse_name varchar(32)
);

------------------------------- ВВОД ПЕРВИЧНЫХ ОСТАТКОВ

--1. ТАБЛИЦА ДОКУМЕНТОВ ВВОДА ПЕРВИЧНЫХ ОСТАТКОВ

CREATE TABLE init_journal
(
	init_doc_id serial PRIMARY KEY,
	init_date timestamp,
	init_doc_alias doc_type
);



--2. СОЗДАЕМ ТАБЛИЦУ, СВЯЗЫВАЮЩУЮ INIT+ПРОДУКТЫ+СКЛАД+КОЛИЧЕСТВО

CREATE TABLE init_product_warehouse
(
	doc_id int REFERENCES init_journal(init_doc_id),
	warehouse_id int REFERENCES warehouse(warehouse_id),
	product_id int REFERENCES product(product_id),
	product_count int,
	CONSTRAINT init_doc_key PRIMARY KEY (doc_id, warehouse_id, product_id)
);

--3. СДЕЛАЕМ ЗАПИСЬ В ТАБЛИЦУ init_product_warehouse

INSERT INTO init_journal (init_date, init_doc_alias) 
VALUES
('2024-12-31','Init');


INSERT INTO warehouse (warehouse_name) 
VALUES
('Основной склад');

INSERT INTO product (product_name) 
VALUES
('Апельсин');

INSERT INTO init_product_warehouse
VALUES
(1,1,1,10);

--4. ПРОВЕРКА 

SELECT * 
FROM init_product_warehouse;

------------------------------- ВВОД ДОКУМЕНТОВ ПЕРЕМЕЩЕНИЯ

--1. ТАБЛИЦА ДОКУМЕНТОВ ВВОДА ДОКУМЕНТОВ ПЕРЕМЕЩЕНИЯ

CREATE TABLE move_journal
(
	move_doc_id serial PRIMARY KEY,
	move_date timestamp,
	move_doc_alias doc_type
);

--2. СОЗДАЕМ ТАБЛИЦУ, СВЯЗЫВАЮЩУЮ MOVE+ПРОДУКТЫ+СКЛАД+КОЛИЧЕСТВО

CREATE TABLE move_product_warehouse
(
	doc_id int REFERENCES move_journal(move_doc_id),
	warehouse_id int REFERENCES warehouse(warehouse_id),
	product_id int REFERENCES product(product_id),
	product_count int,
	CONSTRAINT move_doc_key PRIMARY KEY (doc_id, warehouse_id, product_id)
);

--3. СДЕЛАЕМ ЗАПИСЬ В ТАБЛИЦУ move_product_warehouse

INSERT INTO warehouse (warehouse_name) 
VALUES
('Кассета 1');

INSERT INTO move_journal (move_date, move_doc_alias) 
VALUES
('2025-01-01','Movement');

INSERT INTO move_product_warehouse
VALUES
(1,1,1,-2),
(1,2,1,2)
;

--4. ПРОВЕРКА 

SELECT init_date , init_doc_id,init_doc_alias, product_name, warehouse_name, product_count
FROM init_product_warehouse
INNER JOIN init_journal ON init_product_warehouse.doc_id = init_journal.init_doc_id
INNER JOIN product ON init_product_warehouse.product_id = product.product_id
INNER JOIN warehouse ON init_product_warehouse.warehouse_id = warehouse.warehouse_id

UNION

SELECT move_date , move_doc_id,move_doc_alias,product_name, warehouse_name, product_count
FROM move_product_warehouse
INNER JOIN move_journal ON move_product_warehouse.doc_id = move_journal.move_doc_id
INNER JOIN product ON move_product_warehouse.product_id = product.product_id
INNER JOIN warehouse ON move_product_warehouse.warehouse_id = warehouse.warehouse_id

ORDER BY init_date; 

------------------------------- ВВОД ДОКУМЕНТОВ ПРИХОДА

--1. СОЗДАНИЕ ТАБЛИЦЫ ПОСТАВЩИКОВ

CREATE TABLE supplier
(
	supplier_id serial PRIMARY KEY,
	supplier_name varchar(32)
);

--2. ТАБЛИЦА ДОКУМЕНТОВ ВВОДА ДОКУМЕНТОВ ПРИХОДА

CREATE TABLE arrival_journal
(
	arrival_doc_id serial PRIMARY KEY,
	arrival_date timestamp,
	arrival_doc_alias doc_type,
	supplier_id int REFERENCES supplier(supplier_id) NOT NULL
);


--3. СОЗДАЕМ ТАБЛИЦУ, СВЯЗЫВАЮЩУЮ ARRIVAL+ПРОДУКТЫ+СКЛАД+КОЛИЧЕСТВО

CREATE TABLE arrival_product_warehouse
(
	doc_id int REFERENCES arrival_journal(arrival_doc_id),
	warehouse_id int REFERENCES warehouse(warehouse_id),
	product_id int REFERENCES product(product_id),
	product_count int,
	CONSTRAINT arrival_doc_key PRIMARY KEY (doc_id, warehouse_id, product_id)
);

--4. СДЕЛАЕМ ЗАПИСЬ В ТАБЛИЦУ arrival_product_warehouse

INSERT INTO supplier (supplier_name) 
VALUES
('ООО "Рога и копыта"');

INSERT INTO arrival_journal (arrival_date, arrival_doc_alias, supplier_id) 
VALUES
('2025-01-02','Arrival',1);

INSERT INTO arrival_product_warehouse
VALUES
(1,2,1,15);

--5. ПРОВЕРКА 

SELECT init_date , init_doc_id,init_doc_alias, product_name, warehouse_name, product_count
FROM init_product_warehouse
INNER JOIN init_journal ON init_product_warehouse.doc_id = init_journal.init_doc_id
INNER JOIN product ON init_product_warehouse.product_id = product.product_id
INNER JOIN warehouse ON init_product_warehouse.warehouse_id = warehouse.warehouse_id

UNION

SELECT move_date , move_doc_id,move_doc_alias,product_name, warehouse_name, product_count
FROM move_product_warehouse
INNER JOIN move_journal ON move_product_warehouse.doc_id = move_journal.move_doc_id
INNER JOIN product ON move_product_warehouse.product_id = product.product_id
INNER JOIN warehouse ON move_product_warehouse.warehouse_id = warehouse.warehouse_id

UNION

SELECT arrival_date , arrival_doc_id, arrival_doc_alias, product_name, warehouse_name, product_count
FROM arrival_product_warehouse
INNER JOIN arrival_journal ON arrival_product_warehouse.doc_id = arrival_journal.arrival_doc_id
INNER JOIN product ON arrival_product_warehouse.product_id = product.product_id
INNER JOIN warehouse ON arrival_product_warehouse.warehouse_id = warehouse.warehouse_id

ORDER BY init_date; 

------------------------------- ВВОД ДОКУМЕНТОВ ОТГРУЗКИ

--1. СОЗДАНИЕ ТАБЛИЦЫ ПОКУПАТЕЛЕЙ

CREATE TABLE customer
(
	customer_id serial PRIMARY KEY,
	customer_name varchar(32)
);

--2. ТАБЛИЦА ДОКУМЕНТОВ ВВОДА ДОКУМЕНТОВ ОТГРУЗКИ

CREATE TABLE shipment_journal
(
	shipment_doc_id serial PRIMARY KEY,
	shipment_date timestamp,
	shipment_doc_alias doc_type,
	customer_id int REFERENCES customer(customer_id) NOT NULL
);

--3. СОЗДАЕМ ТАБЛИЦУ, СВЯЗЫВАЮЩУЮ ARRIVAL+ПРОДУКТЫ+СКЛАД+КОЛИЧЕСТВО

CREATE TABLE shipment_product_warehouse
(
	doc_id int REFERENCES shipment_journal(shipment_doc_id),
	warehouse_id int REFERENCES warehouse(warehouse_id),
	product_id int REFERENCES product(product_id),
	product_count int,
	CONSTRAINT shipment_doc_key PRIMARY KEY (doc_id, warehouse_id, product_id)
);

--4. СДЕЛАЕМ ЗАПИСЬ В ТАБЛИЦУ shipment_product_warehouse

INSERT INTO customer(customer_name) 
VALUES
('ООО "SUVAR"');

INSERT INTO shipment_journal (shipment_date, shipment_doc_alias, customer_id) 
VALUES
('2025-01-03','Shipment',1);

INSERT INTO shipment_product_warehouse
VALUES
(1,2,1,-12);

--5. ПРОВЕРКА 

SELECT init_date , init_doc_id,init_doc_alias, product_name, warehouse_name, product_count
FROM init_product_warehouse
INNER JOIN init_journal ON init_product_warehouse.doc_id = init_journal.init_doc_id
INNER JOIN product ON init_product_warehouse.product_id = product.product_id
INNER JOIN warehouse ON init_product_warehouse.warehouse_id = warehouse.warehouse_id

UNION

SELECT move_date , move_doc_id,move_doc_alias,product_name, warehouse_name, product_count
FROM move_product_warehouse
INNER JOIN move_journal ON move_product_warehouse.doc_id = move_journal.move_doc_id
INNER JOIN product ON move_product_warehouse.product_id = product.product_id
INNER JOIN warehouse ON move_product_warehouse.warehouse_id = warehouse.warehouse_id

UNION

SELECT arrival_date , arrival_doc_id, arrival_doc_alias, product_name, warehouse_name, product_count
FROM arrival_product_warehouse
INNER JOIN arrival_journal ON arrival_product_warehouse.doc_id = arrival_journal.arrival_doc_id
INNER JOIN product ON arrival_product_warehouse.product_id = product.product_id
INNER JOIN warehouse ON arrival_product_warehouse.warehouse_id = warehouse.warehouse_id

UNION

SELECT shipment_date , shipment_doc_id, shipment_doc_alias, product_name, warehouse_name, product_count
FROM shipment_product_warehouse
INNER JOIN shipment_journal ON shipment_product_warehouse.doc_id = shipment_journal.shipment_doc_id
INNER JOIN product ON shipment_product_warehouse.product_id = product.product_id
INNER JOIN warehouse ON shipment_product_warehouse.warehouse_id = warehouse.warehouse_id


ORDER BY init_date; 

CREATE OR REPLACE VIEW documents_all AS

  SELECT init_date as "Дата" , init_doc_id,init_doc_alias, product_name, warehouse_name, product_count
	FROM init_product_warehouse
	INNER JOIN init_journal ON init_product_warehouse.doc_id = init_journal.init_doc_id
	INNER JOIN product ON init_product_warehouse.product_id = product.product_id
	INNER JOIN warehouse ON init_product_warehouse.warehouse_id = warehouse.warehouse_id
	
	UNION
	
	SELECT move_date , move_doc_id,move_doc_alias,product_name, warehouse_name, product_count
	FROM move_product_warehouse
	INNER JOIN move_journal ON move_product_warehouse.doc_id = move_journal.move_doc_id
	INNER JOIN product ON move_product_warehouse.product_id = product.product_id
	INNER JOIN warehouse ON move_product_warehouse.warehouse_id = warehouse.warehouse_id
	
	UNION
	
	SELECT arrival_date , arrival_doc_id, arrival_doc_alias, product_name, warehouse_name, product_count
	FROM arrival_product_warehouse
	INNER JOIN arrival_journal ON arrival_product_warehouse.doc_id = arrival_journal.arrival_doc_id
	INNER JOIN product ON arrival_product_warehouse.product_id = product.product_id
	INNER JOIN warehouse ON arrival_product_warehouse.warehouse_id = warehouse.warehouse_id
	
	UNION
	
	SELECT shipment_date , shipment_doc_id, shipment_doc_alias, product_name, warehouse_name, product_count
	FROM shipment_product_warehouse
	INNER JOIN shipment_journal ON shipment_product_warehouse.doc_id = shipment_journal.shipment_doc_id
	INNER JOIN product ON shipment_product_warehouse.product_id = product.product_id
	INNER JOIN warehouse ON shipment_product_warehouse.warehouse_id = warehouse.warehouse_id
	
	ORDER BY "Дата"; 

SELECT *
FROM documents_all 
WHERE "Дата" > '2025-01-01'
;









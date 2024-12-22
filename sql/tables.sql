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
	code varchar(16),
	fk_warehouse_id integer REFERENCES warehouse,
	weight int NOT NULL
);

INSERT INTO product_item (fk_product_id, fuse, code, fk_warehouse_id, weight)
VALUES
(6,'2412448','120',3,2500),
(6,'2412448','121',3,3200),
(6,'2412448','122',1,2985),
(6,'2412448','123',1,3254),
(6,'2412448','124',1,2975),
(5,'3412448','220',1,3640),
(5,'3412448','221',1,3865),
(5,'3412449','222',1,3705),
(5,'3412449','223',1,3981),
(5,'3412449','224',2,4502);



-- --СОЗДАЕМ ТАБЛИЦУ ДОКУМЕНТА ВВОДА НАЧАЛЬНЫХ ОСТАТКОВ

-- DROP TABLE IF EXISTS initial_balance CASCADE;
-- CREATE TABLE initial_balance
-- (
-- 	document_date timestamp NOT NULL,
-- 	fk_warehouse_id int REFERENCES warehouse(warehouse_id) NOT NULL,
-- 	fk_item_id int REFERENCES product_item(item_id) NOT NULL,
-- 	weight int,
-- 	CONSTRAINT item_warehouse PRIMARY KEY (document_date, fk_warehouse_id, fk_item_id)
-- );

-- INSERT INTO initial_balance 
-- VALUES
-- ('2024-12-01 02:00:00', 1,6,3500),
-- ('2024-12-01 02:00:01', 1,5,3500),
-- ('2024-12-01', 1,6,3600),
-- ('2024-12-01', 2,5,3250),
-- ('2024-12-01', 3,6,3120),
-- ('2024-12-01', 1,5,2860)
-- ;

SELECT 
product_name AS "Наименование", (fuse||'/'||code) AS  code, warehouse_name, weight
FROM product_item
INNER JOIN product ON product_item.fk_product_id =product.product_id
INNER JOIN warehouse ON product_item.fk_warehouse_id =warehouse.warehouse_id;

SELECT product_name , SUM(weight)
FROM product_item
INNER JOIN product ON product_item.fk_product_id =product.product_id
GROUP BY product_name;

SELECT warehouse_name, product_name , SUM(weight)
FROM product_item
INNER JOIN product ON product_item.fk_product_id =product.product_id
INNER JOIN warehouse ON product_item.fk_warehouse_id =warehouse.warehouse_id
GROUP BY warehouse_name, product_name;










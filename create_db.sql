-- -----------------------------------------------------
-- Schema inventory_management_db
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `inventory_management_db`;

CREATE SCHEMA `inventory_management_db`;
USE `inventory_management_db` ;

-- -----------------------------------------------------
-- Table `inventory_management_db`.`product_category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `inventory_management_db`.`product_category` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `category_name` VARCHAR(255) NULL DEFAULT NULL,
  `date_created` TIMESTAMP DEFAULT NULL,
  `last_updated` TIMESTAMP DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE=InnoDB
AUTO_INCREMENT = 1;

-- -----------------------------------------------------
-- Table `inventory_management_db`.`product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `inventory_management_db`.`products` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `sku` VARCHAR(255) DEFAULT NULL,
  `name` VARCHAR(255) DEFAULT NULL,
  `description` VARCHAR(255) DEFAULT NULL,
  `unit_price` DECIMAL(13,2) DEFAULT NULL,
  `kit` BIT DEFAULT 0,
  `active` BIT DEFAULT 1,
  `units_in_stock` INT(11) DEFAULT NULL,
  `location` VARCHAR(50) DEFAULT NULL,
  `date_created` TIMESTAMP DEFAULT NULL,
  `last_updated` TIMESTAMP DEFAULT NULL,
  `category_id` BIGINT(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_category` (`category_id`),
  CONSTRAINT `fk_category` FOREIGN KEY (`category_id`) REFERENCES `product_category` (`id`)
) 
ENGINE=InnoDB
AUTO_INCREMENT = 1;

-- -----------------------------------------------------
-- Table `inventory_management_db`.`bill_of_materials`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `inventory_management_db`.`bill_of_materials` (
	`id` BIGINT(20) NOT NULL AUTO_INCREMENT,
    `product_id` BIGINT(20) NOT NULL,
    `bill_total` DECIMAL(13,2) DEFAULT NULL,
    `date_created` TIMESTAMP DEFAULT NULL,
	`last_updated` TIMESTAMP DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `fk_bom_products` (`product_id`),
    CONSTRAINT `fk_bom_products` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
)
ENGINE=InnoDB
AUTO_INCREMENT = 30001;

-- -----------------------------------------------------
-- Table `inventory_management_db`.`parts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `inventory_management_db`.`parts` (
	`id` BIGINT(20) NOT NULL AUTO_INCREMENT,
	`sku` VARCHAR(255) DEFAULT NULL,
	`name` VARCHAR(255) DEFAULT NULL,
	`description` VARCHAR(255) DEFAULT NULL,
	`unit_price` DECIMAL(13,2) DEFAULT NULL,
	`units_in_stock` INT(11) DEFAULT NULL,
    `location` VARCHAR(50) DEFAULT NULL,
	`date_created` TIMESTAMP DEFAULT NULL,
	`last_updated` TIMESTAMP DEFAULT NULL,
    PRIMARY KEY (`id`)
)
ENGINE=InnoDB
AUTO_INCREMENT = 1;

-- -----------------------------------------------------
-- Table `inventory_management_db`.`bill_details`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `inventory_management_db`.`bill_details` (
	`id` BIGINT(20) NOT NULL AUTO_INCREMENT,
	`bill_id` BIGINT(20) NOT NULL,
    `part_id` BIGINT(20) NOT NULL,
    `quantity_needed` INT(11) DEFAULT NULL,
    `line_total` DECIMAL(13,2) DEFAULT NULL,
    `date_created` TIMESTAMP DEFAULT NULL,
	`last_updated` TIMESTAMP DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `fk_bill` (`bill_id`),
    CONSTRAINT `fk_bill` FOREIGN KEY (`bill_id`) REFERENCES `bill_of_materials` (`id`),
    KEY `fk_parts` (`part_id`),
    CONSTRAINT `fk_parts` FOREIGN KEY (`part_id`) REFERENCES `parts` (`id`)
)
ENGINE=InnoDB
AUTO_INCREMENT = 1;

-- -----------------------------------------------------
-- Table `inventory_management_db`.`sales_orders`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `inventory_management_db`.`sales_orders` (
	`order_number` BIGINT(20) NOT NULL AUTO_INCREMENT,
    `total` DECIMAL(13,2) DEFAULT NULL,
    `date_created` TIMESTAMP DEFAULT NULL,
	`last_updated` TIMESTAMP DEFAULT NULL,
    PRIMARY KEY (`order_number`)
)
ENGINE=InnoDB
AUTO_INCREMENT = 10001;

-- -----------------------------------------------------
-- Table `inventory_management_db`.`sales_order_details`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `inventory_management_db`.`sales_order_details` (
	`id` BIGINT(20) NOT NULL AUTO_INCREMENT,
	`order_number` BIGINT(20) NOT NULL,
    `product_id` BIGINT(20) NOT NULL,
    `quantity_ordered` INT(11) DEFAULT NULL,
    `line_total` DECIMAL(13,2) DEFAULT NULL,
    `date_created` TIMESTAMP DEFAULT NULL,
	`last_updated` TIMESTAMP DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `fk_orders` (`order_number`),
    CONSTRAINT `fk_orders` FOREIGN KEY (`order_number`) REFERENCES `sales_orders` (`order_number`),
    KEY `fk_products` (`product_id`),
    CONSTRAINT `fk_products` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
)
ENGINE=InnoDB
AUTO_INCREMENT = 1;

-- -----------------------------------------------------
-- Table `inventory_management_db`.`purchase_orders`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `inventory_management_db`.`purchase_orders` (
	`order_number` BIGINT(20) NOT NULL AUTO_INCREMENT,
    `order_type` VARCHAR(20) NOT NULL,
    `total` DECIMAL(13,2) DEFAULT NULL,
    `date_created` TIMESTAMP DEFAULT NULL,
	`last_updated` TIMESTAMP DEFAULT NULL,
    PRIMARY KEY (`order_number`)
)
ENGINE=InnoDB
AUTO_INCREMENT = 20001;

-- -----------------------------------------------------
-- Table `inventory_management_db`.`purchase_order_details`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `inventory_management_db`.`purchase_order_details` (
	`id` BIGINT(20) NOT NULL AUTO_INCREMENT,
	`order_number` BIGINT(20) NOT NULL,
    `product_id` BIGINT(20) DEFAULT NULL,
    `part_id` BIGINT(20) DEFAULT NULL,
    `quantity_ordered` INT(11) DEFAULT NULL,
    `line_total` DECIMAL(13,2) DEFAULT NULL,
    `date_created` TIMESTAMP DEFAULT NULL,
	`last_updated` TIMESTAMP DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `fk_purchase_orders` (`order_number`),
    CONSTRAINT `fk_purchase_orders` FOREIGN KEY (`order_number`) REFERENCES `purchase_orders` (`order_number`),
    KEY `fk_purchase_product` (`product_id`),
	CONSTRAINT `fk_purchase_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
	KEY `fk_purchase_part` (`part_id`),
	CONSTRAINT `fk_purchase_part` FOREIGN KEY (`part_id`) REFERENCES `parts` (`id`)
)
ENGINE=InnoDB
AUTO_INCREMENT = 1;

-- -----------------------------------------------------
-- Table `inventory_management_db`.`inventory`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `inventory_management_db`.`inventory` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `product_id` BIGINT(20) DEFAULT NULL,
  `part_id` BIGINT(20) DEFAULT NULL,
  `bill_of_material_id` BIGINT(20) DEFAULT NULL,
  `bill_of_material_detail_id` BIGINT(20) DEFAULT NULL,
  `sales_order_detail_id` BIGINT(20) DEFAULT NULL,
  `purchase_order_detail_id` BIGINT(20) DEFAULT NULL,
  `item_sku` VARCHAR(255) DEFAULT NULL,
  `adjustment_type` VARCHAR(20),
  `order_number` BIGINT(20) DEFAULT NULL,
  `quantity` INT(11) DEFAULT NULL,
  `available_quantity` INT(11) DEFAULT NULL,
  `date` TIMESTAMP DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_product_inventory` (`product_id`),
  CONSTRAINT `fk_product_inventory` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  KEY `fk_part_inventory` (`part_id`),
  CONSTRAINT `fk_part_inventory` FOREIGN KEY (`part_id`) REFERENCES `parts` (`id`)
) 
ENGINE=InnoDB
AUTO_INCREMENT = 1;

-- -----------------------------------------------------
-- Categories
-- -----------------------------------------------------
INSERT INTO product_category(category_name, date_created, last_updated) VALUES ('Video Games', NOW(), NOW());
INSERT INTO product_category(category_name, date_created, last_updated) VALUES ('TVs', NOW(), NOW());
INSERT INTO product_category(category_name, date_created, last_updated) VALUES ('Speakers', NOW(), NOW());
INSERT INTO product_category(category_name, date_created, last_updated) VALUES ('Cameras', NOW(), NOW());
INSERT INTO product_category(category_name, date_created, last_updated) VALUES ('Computers', NOW(), NOW());

-- -----------------------------------------------------
-- Video Games
-- -----------------------------------------------------
INSERT INTO products (sku, name, description, kit, active, units_in_stock, unit_price, category_id,date_created, last_updated, location) VALUES ('CONSOLE-TEST-1', 'Test Console 1', 'Test Console 1', 0, 1, 24, 499.99, 1, NOW(), NOW(), '10-01-01');
INSERT INTO products (sku, name, description, kit, active, units_in_stock, unit_price, category_id,date_created, last_updated, location) VALUES ('CONSOLE-TEST-2', 'Test Console 2', 'Test Console 2', 0, 1, 30, 399.99, 1, NOW(), NOW(), '10-01-02');
INSERT INTO products (sku, name, description, kit, active, units_in_stock, unit_price, category_id,date_created, last_updated, location) VALUES ('CONSOLE-TEST-3', 'Test Console 3', 'Test Console 3', 0, 1, 20, 299.99, 1, NOW(), NOW(), '10-01-03');
-- -----------------------------------------------------
-- TVs
-- -----------------------------------------------------
INSERT INTO products (sku, name, description, kit, active, units_in_stock, unit_price, category_id,date_created, last_updated, location) VALUES ('TV-TEST-55', 'Test TV 55 Inch', 'Test TV 55 Inch', 0, 1, 34, 599.99, 2, NOW(), NOW(), '08-01-01');
INSERT INTO products (sku, name, description, kit, active, units_in_stock, unit_price, category_id,date_created, last_updated, location) VALUES ('TV-TEST-65', 'Test TV 65 Inch', 'Test TV 65 Inch', 0, 1, 24, 799.99, 2, NOW(), NOW(), '08-02-01');
INSERT INTO products (sku, name, description, kit, active, units_in_stock, unit_price, category_id,date_created, last_updated, location) VALUES ('TV-TEST-75', 'Test TV 75 Inch', 'Test TV 75 Inch', 0, 1, 15, 999.99, 2, NOW(), NOW(), '08-03-01');

-- -----------------------------------------------------
-- Speakers
-- -----------------------------------------------------
INSERT INTO products (sku, name, description, kit, active, units_in_stock, unit_price, category_id,date_created, last_updated, location) VALUES ('SPEAKER-TEST-TOWER', 'Test Tower Speaker', 'Test Tower Speaker', 0, 1, 28, 149.99, 3, NOW(), NOW(), '11-01-01');
INSERT INTO products (sku, name, description, kit, active, units_in_stock, unit_price, category_id,date_created, last_updated, location) VALUES ('SPEAKER-TEST-CENTER', 'Test Center Speaker', 'Test Center Speaker', 0, 1, 23, 99.99, 3, NOW(), NOW(), '11-01-02');
INSERT INTO products (sku, name, description, kit, active, units_in_stock, unit_price, category_id,date_created, last_updated, location) VALUES ('SPEAKER-TEST-REAR', 'Test Rear Speakers', 'Test Rear Speakers', 0, 1, 28, 99.99, 3, NOW(), NOW(), '11-01-03');
INSERT INTO products (sku, name, description, kit, active, units_in_stock, unit_price, category_id,date_created, last_updated, location) VALUES ('SPEAKER-TEST-BAR', 'Test Sound Bar', 'Test Sound Bar', 0, 1, 34, 399.99, 3, NOW(), NOW(), '11-01-04');

-- -----------------------------------------------------
-- Cameras
-- -----------------------------------------------------
INSERT INTO products (sku, name, description, kit, active, units_in_stock, unit_price, category_id,date_created, last_updated, location) VALUES ('CAMERA-TEST-1', 'Test Camera 1', 'Test Camera 1', 0, 1, 24, 799.99, 4, NOW(), NOW(), '06-01-01');
INSERT INTO products (sku, name, description, kit, active, units_in_stock, unit_price, category_id,date_created, last_updated, location) VALUES ('CAMERA-TEST-2', 'Test Camera 2', 'Test Camera 2', 0, 1, 30, 399.99, 4, NOW(), NOW(), '06-01-02');
INSERT INTO products (sku, name, description, kit, active, units_in_stock, unit_price, category_id,date_created, last_updated, location) VALUES ('CAMERA-TEST-3', 'Test Camera 3', 'Test Camera 3', 0, 1, 20, 199.99, 4, NOW(), NOW(), '06-01-03');

-- -----------------------------------------------------
-- Computers
-- -----------------------------------------------------
INSERT INTO products (sku, name, description, kit, active, units_in_stock, unit_price, category_id,date_created, last_updated, location) VALUES ('PC-BRAND1-GPU1-SSD', 'Brand 1 PC with GPU-1 and SSD', 'Brand 1 PC with GPU-1 and SSD', 1, 1,  5, 1241.91, 5, NOW(), NOW(), '04-01-01');
INSERT INTO products (sku, name, description, kit, active, units_in_stock, unit_price, category_id,date_created, last_updated, location) VALUES ('PC-BRAND2-GPU2-HDD', 'Brand 2 PC with GPU-1 and SSD', 'Brand 2 PC with GPU-1 and SSD', 1, 1,  6, 781.91, 5, NOW(), NOW(), '04-01-05');

-- -----------------------------------------------------
-- Bill of Materials
-- -----------------------------------------------------
INSERT INTO bill_of_materials(product_id, bill_total, date_created, last_updated) VALUES (14, 1241.91, NOW(), NOW());
INSERT INTO bill_of_materials(product_id, bill_total, date_created, last_updated) VALUES (15, 781.91, NOW(), NOW());

-- -----------------------------------------------------
-- Parts
-- -----------------------------------------------------
INSERT INTO parts (sku, name, description, units_in_stock, unit_price, location, date_created, last_updated) VALUES ('PRT-CPU-1', 'CPU Brand 1', 'Brand 1 of Central Processing Unit', 19, 200.99, '02-01-01', NOW(), NOW());
INSERT INTO parts (sku, name, description, units_in_stock, unit_price, location, date_created, last_updated) VALUES ('PRT-CPU-2', 'CPU Brand 2', 'Brand 2 of Central Processing Unit', 19, 150.99, '02-01-02', NOW(), NOW());

INSERT INTO parts (sku, name, description, units_in_stock, unit_price, location, date_created, last_updated) VALUES ('PRT-MOTHERBOARD-1', 'Motherboard for CPU-1', 'Motherboard compatible with CPU-1', 29, 120.99, '02-02-01', NOW(), NOW());
INSERT INTO parts (sku, name, description, units_in_stock, unit_price, location, date_created, last_updated) VALUES ('PRT-MOTHERBOARD-2', 'Motherboard for CPU-2', 'Motherboard compatible with CPU-2', 24, 90.99, '02-02-02', NOW(), NOW());

INSERT INTO parts (sku, name, description, units_in_stock, unit_price, location, date_created, last_updated) VALUES ('PRT-MEMORY-1', 'Memory for MOTHERBOARD-1', 'Memory compatible with MOTHERBOARD-1', 99, 24.99, '02-03-01', NOW(), NOW());
INSERT INTO parts (sku, name, description, units_in_stock, unit_price, location, date_created, last_updated) VALUES ('PRT-MEMORY-2', 'Memory for MOTHERBOARD-2', 'Memory compatible with MOTHERBOARD-2', 99, 14.99, '02-03-02', NOW(), NOW());

INSERT INTO parts (sku, name, description, units_in_stock, unit_price, location, date_created, last_updated) VALUES ('PRT-GPU-1', 'Graphics Card 1', 'Faster Graphics Card', 19, 599.99, '02-04-01', NOW(), NOW());
INSERT INTO parts (sku, name, description, units_in_stock, unit_price, location, date_created, last_updated) VALUES ('PRT-GPU-2', 'Graphics Card 2', 'Slower Graphics Card', 19, 399.99, '02-04-02', NOW(), NOW());

INSERT INTO parts (sku, name, description, units_in_stock, unit_price, location, date_created, last_updated) VALUES ('PRT-SSD', 'SSD', 'Fast Storage', 43, 109.99, '02-05-01', NOW(), NOW());
INSERT INTO parts (sku, name, description, units_in_stock, unit_price, location, date_created, last_updated) VALUES ('PRT-HDD', 'HDD', 'Slow Storage', 43, 39.99, '02-05-02', NOW(), NOW());

-- -----------------------------------------------------
-- Bill of Material Details
-- -----------------------------------------------------
INSERT INTO bill_details(part_id, bill_id, quantity_needed, line_total, date_created, last_updated) VALUES (1, 30001, 1, 200.99, NOW(), NOW());
INSERT INTO bill_details(part_id, bill_id, quantity_needed, line_total, date_created, last_updated) VALUES (3, 30001, 1, 120.99, NOW(), NOW());
INSERT INTO bill_details(part_id, bill_id, quantity_needed, line_total, date_created, last_updated) VALUES (5, 30001, 4, 99.96, NOW(), NOW());
INSERT INTO bill_details(part_id, bill_id, quantity_needed, line_total, date_created, last_updated) VALUES (7, 30001, 1, 599.99, NOW(), NOW());
INSERT INTO bill_details(part_id, bill_id, quantity_needed, line_total, date_created, last_updated) VALUES (9, 30001, 2, 219.98, NOW(), NOW());

INSERT INTO bill_details(part_id, bill_id, quantity_needed, line_total, date_created, last_updated) VALUES (2, 30002, 1, 150.99, NOW(), NOW());
INSERT INTO bill_details(part_id, bill_id, quantity_needed, line_total, date_created, last_updated) VALUES (4, 30002, 1, 90.99, NOW(), NOW());
INSERT INTO bill_details(part_id, bill_id, quantity_needed, line_total, date_created, last_updated) VALUES (6, 30002, 4, 59.96, NOW(), NOW());
INSERT INTO bill_details(part_id, bill_id, quantity_needed, line_total, date_created, last_updated) VALUES (8, 30002, 1, 399.99, NOW(), NOW());
INSERT INTO bill_details(part_id, bill_id, quantity_needed, line_total, date_created, last_updated) VALUES (10, 30002, 2, 79.98, NOW(), NOW());

-- -----------------------------------------------------
-- Sales Orders
-- -----------------------------------------------------
INSERT INTO sales_orders(total, date_created, last_updated) VALUES (1299.98, NOW(), NOW());
INSERT INTO sales_orders(total, date_created, last_updated) VALUES (599.95, NOW(), NOW());
INSERT INTO sales_orders(total, date_created, last_updated) VALUES (999.98, NOW(), NOW());
INSERT INTO sales_orders(total, date_created, last_updated) VALUES (2041.90, NOW(), NOW());

-- -----------------------------------------------------
-- Sales Order Details
-- -----------------------------------------------------
INSERT INTO sales_order_details(product_id, order_number, quantity_ordered, line_total, date_created, last_updated) VALUES (1, 10001, 1, 499.99, NOW(), NOW());
INSERT INTO sales_order_details(product_id, order_number, quantity_ordered, line_total, date_created, last_updated) VALUES (5, 10001, 1, 799.99, NOW(), NOW());

INSERT INTO sales_order_details(product_id, order_number, quantity_ordered, line_total, date_created, last_updated) VALUES (7, 10002, 2, 299.98, NOW(), NOW());
INSERT INTO sales_order_details(product_id, order_number, quantity_ordered, line_total, date_created, last_updated) VALUES (8, 10002, 1, 99.99, NOW(), NOW());
INSERT INTO sales_order_details(product_id, order_number, quantity_ordered, line_total, date_created, last_updated) VALUES (9, 10002, 2, 199.98, NOW(), NOW());

INSERT INTO sales_order_details(product_id, order_number, quantity_ordered, line_total, date_created, last_updated) VALUES (4, 10003, 1, 599.99, NOW(), NOW());
INSERT INTO sales_order_details(product_id, order_number, quantity_ordered, line_total, date_created, last_updated) VALUES (10, 10003, 1, 399.99, NOW(), NOW());

INSERT INTO sales_order_details(product_id, order_number, quantity_ordered, line_total, date_created, last_updated) VALUES (11, 10004, 1, 1241.91, NOW(), NOW());
INSERT INTO sales_order_details(product_id, order_number, quantity_ordered, line_total, date_created, last_updated) VALUES (14, 10004, 1, 799.99, NOW(), NOW());

-- -----------------------------------------------------
-- Purchase Orders
-- -----------------------------------------------------
INSERT INTO purchase_orders(total, order_type, date_created, last_updated) VALUES (7139.65, 'Product', NOW(), NOW());
INSERT INTO purchase_orders(total, order_type, date_created, last_updated) VALUES (2043.50, 'Part', NOW(), NOW());

-- -----------------------------------------------------
-- Purchase Order Details
-- -----------------------------------------------------
INSERT INTO purchase_order_details(order_number, product_id, part_id, quantity_ordered, line_total, date_created, last_updated) VALUES (20001, 7, null, 10, 1049.93, NOW(), NOW());
INSERT INTO purchase_order_details(order_number, product_id, part_id, quantity_ordered, line_total, date_created, last_updated) VALUES (20001, 8, null, 15, 1049.90, NOW(), NOW());
INSERT INTO purchase_order_details(order_number, product_id, part_id, quantity_ordered, line_total, date_created, last_updated) VALUES (20001, 9, null, 12, 839.92, NOW(), NOW());
INSERT INTO purchase_order_details(order_number, product_id, part_id, quantity_ordered, line_total, date_created, last_updated) VALUES (20001, 10, null, 15, 4199.90, NOW(), NOW());

INSERT INTO purchase_order_details(order_number, product_id, part_id, quantity_ordered, line_total, date_created, last_updated) VALUES (20002, null, 3, 15, 1361.10, NOW(), NOW());
INSERT INTO purchase_order_details(order_number, product_id, part_id, quantity_ordered, line_total, date_created, last_updated) VALUES (20002, null, 4, 10, 682.40, NOW(), NOW());

-- -----------------------------------------------------
-- Inventory
-- -----------------------------------------------------
INSERT INTO inventory(product_id, part_id, bill_of_material_id, bill_of_material_detail_id, sales_order_detail_id, purchase_order_detail_id, item_sku, adjustment_type, order_number, quantity, available_quantity, date) VALUES (1, null, null, null, 1, null, 'CONSOLE-TEST-1', 'SO', 10001, 1, 24, '2024-11-10 18:00:00');
INSERT INTO inventory(product_id, part_id, bill_of_material_id, bill_of_material_detail_id, sales_order_detail_id, purchase_order_detail_id, item_sku, adjustment_type, order_number, quantity, available_quantity, date) VALUES (5, null, null, null, 2, null, 'TV-TEST-65', 'SO', 10001, 1, 24, '2024-11-10 18:00:00');
INSERT INTO inventory(product_id, part_id, bill_of_material_id, bill_of_material_detail_id, sales_order_detail_id, purchase_order_detail_id, item_sku, adjustment_type, order_number, quantity, available_quantity, date) VALUES (7, null, null, null, 3, null, 'SPEAKER-TEST-TOWER', 'SO', 10002, 2, 18, '2024-11-15 18:00:00');
INSERT INTO inventory(product_id, part_id, bill_of_material_id, bill_of_material_detail_id, sales_order_detail_id, purchase_order_detail_id, item_sku, adjustment_type, order_number, quantity, available_quantity, date) VALUES (8, null, null, null, 4, null, 'SPEAKER-TEST-CENTER', 'SO', 10002, 1, 9, '2024-11-15 18:00:00');
INSERT INTO inventory(product_id, part_id, bill_of_material_id, bill_of_material_detail_id, sales_order_detail_id, purchase_order_detail_id, item_sku, adjustment_type, order_number, quantity, available_quantity, date) VALUES (9, null, null, null, 5, null, 'SPEAKER-TEST-REAR', 'SO', 10002, 2, 16, '2024-11-15 18:00:00');
INSERT INTO inventory(product_id, part_id, bill_of_material_id, bill_of_material_detail_id, sales_order_detail_id, purchase_order_detail_id, item_sku, adjustment_type, order_number, quantity, available_quantity, date) VALUES (4, null, null, null, 6, null, 'TV-TEST-55', 'SO', 10003, 1, 34, '2024-11-18 18:00:00');
INSERT INTO inventory(product_id, part_id, bill_of_material_id, bill_of_material_detail_id, sales_order_detail_id, purchase_order_detail_id, item_sku, adjustment_type, order_number, quantity, available_quantity, date) VALUES (10, null, null, null, 7, null, 'SPEAKER-TEST-BAR', 'SO', 10003, 1, 19, '2024-11-18 18:00:00');
INSERT INTO inventory(product_id, part_id, bill_of_material_id, bill_of_material_detail_id, sales_order_detail_id, purchase_order_detail_id, item_sku, adjustment_type, order_number, quantity, available_quantity, date) VALUES (11, null, null, null, 8, null, 'CAMERA-TEST-1', 'SO', 10004, 1, 24, '2024-11-22 18:00:00');
INSERT INTO inventory(product_id, part_id, bill_of_material_id, bill_of_material_detail_id, sales_order_detail_id, purchase_order_detail_id, item_sku, adjustment_type, order_number, quantity, available_quantity, date) VALUES (14, null, null, null, 9, null, 'PC-BRAND1-GPU1-SSD', 'SO', 10004, 1, 4, '2024-11-22 18:00:00');


INSERT INTO inventory(product_id, part_id, bill_of_material_id, bill_of_material_detail_id, sales_order_detail_id, purchase_order_detail_id, item_sku, adjustment_type, order_number, quantity, available_quantity, date) VALUES (14, null, 30001, null, null, null, 'PC-BRAND1-GPU1-SSD', 'BM', 30001, 1, 5, NOW());
INSERT INTO inventory(product_id, part_id, bill_of_material_id, bill_of_material_detail_id, sales_order_detail_id, purchase_order_detail_id, item_sku, adjustment_type, order_number, quantity, available_quantity, date) VALUES (null, 1, null, 1, null, null, 'PRT-CPU-1', 'BM', 30001, 1, 19, NOW());
INSERT INTO inventory(product_id, part_id, bill_of_material_id, bill_of_material_detail_id, sales_order_detail_id, purchase_order_detail_id, item_sku, adjustment_type, order_number, quantity, available_quantity, date) VALUES (null, 3, null, 2, null, null, 'PRT-MOTHERBOARD-1', 'BM', 30001, 1, 14, NOW());
INSERT INTO inventory(product_id, part_id, bill_of_material_id, bill_of_material_detail_id, sales_order_detail_id, purchase_order_detail_id, item_sku, adjustment_type, order_number, quantity, available_quantity, date) VALUES (null, 5, null, 3, null, null, 'PRT-MEMORY-1', 'BM', 30001, 1, 99, NOW());
INSERT INTO inventory(product_id, part_id, bill_of_material_id, bill_of_material_detail_id, sales_order_detail_id, purchase_order_detail_id, item_sku, adjustment_type, order_number, quantity, available_quantity, date) VALUES (null, 7, null, 4, null, null, 'PRT-GPU-1', 'BM', 30001, 1, 19, NOW());
INSERT INTO inventory(product_id, part_id, bill_of_material_id, bill_of_material_detail_id, sales_order_detail_id, purchase_order_detail_id, item_sku, adjustment_type, order_number, quantity, available_quantity, date) VALUES (null, 9, null, 5, null, null, 'PRT-SSD', 'BM', 30001, 2, 43, NOW());
INSERT INTO inventory(product_id, part_id, bill_of_material_id, bill_of_material_detail_id, sales_order_detail_id, purchase_order_detail_id, item_sku, adjustment_type, order_number, quantity, available_quantity, date) VALUES (15, null, 30002, null, null, null, 'PC-BRAND2-GPU2-HDD', 'BM', 30002, 1, 6, NOW());
INSERT INTO inventory(product_id, part_id, bill_of_material_id, bill_of_material_detail_id, sales_order_detail_id, purchase_order_detail_id, item_sku, adjustment_type, order_number, quantity, available_quantity, date) VALUES (null, 2, null, 6, null, null, 'PRT-CPU-2', 'BM', 30002, 1, 19, NOW());
INSERT INTO inventory(product_id, part_id, bill_of_material_id, bill_of_material_detail_id, sales_order_detail_id, purchase_order_detail_id, item_sku, adjustment_type, order_number, quantity, available_quantity, date) VALUES (null, 4, null, 7, null, null, 'PRT-MOTHERBOARD-2', 'BM', 30002, 1, 14, NOW());
INSERT INTO inventory(product_id, part_id, bill_of_material_id, bill_of_material_detail_id, sales_order_detail_id, purchase_order_detail_id, item_sku, adjustment_type, order_number, quantity, available_quantity, date) VALUES (null, 6, null, 8, null, null, 'PRT-MEMORY-2', 'BM', 30002, 1, 99, NOW());
INSERT INTO inventory(product_id, part_id, bill_of_material_id, bill_of_material_detail_id, sales_order_detail_id, purchase_order_detail_id, item_sku, adjustment_type, order_number, quantity, available_quantity, date) VALUES (null, 8, null, 9, null, null, 'PRT-GPU-2', 'BM', 30002, 1, 19, NOW());
INSERT INTO inventory(product_id, part_id, bill_of_material_id, bill_of_material_detail_id, sales_order_detail_id, purchase_order_detail_id, item_sku, adjustment_type, order_number, quantity, available_quantity, date) VALUES (null, 10, null, 10, null, null, 'PRT-HDD', 'BM', 30002, 2, 43, NOW());

INSERT INTO inventory(product_id, part_id, bill_of_material_id, bill_of_material_detail_id, sales_order_detail_id, purchase_order_detail_id, item_sku, adjustment_type, order_number, quantity, available_quantity, date) VALUES (7, null, null, null, null, 1, 'SPEAKER-TEST-TOWER', 'PO', 20001, 10, 28, NOW());
INSERT INTO inventory(product_id, part_id, bill_of_material_id, bill_of_material_detail_id, sales_order_detail_id, purchase_order_detail_id, item_sku, adjustment_type, order_number, quantity, available_quantity, date) VALUES (8, null, null, null, null, 2, 'SPEAKER-TEST-CENTER', 'PO', 20001, 15, 23, NOW());
INSERT INTO inventory(product_id, part_id, bill_of_material_id, bill_of_material_detail_id, sales_order_detail_id, purchase_order_detail_id, item_sku, adjustment_type, order_number, quantity, available_quantity, date) VALUES (9, null, null, null, null, 3, 'SPEAKER-TEST-REAR', 'PO', 20001, 12, 28, NOW());
INSERT INTO inventory(product_id, part_id, bill_of_material_id, bill_of_material_detail_id, sales_order_detail_id, purchase_order_detail_id, item_sku, adjustment_type, order_number, quantity, available_quantity, date) VALUES (10, null, null, null, null, 4, 'SPEAKER-TEST-BAR', 'PO', 20001, 15, 34, NOW());

INSERT INTO inventory(product_id, part_id, bill_of_material_id, bill_of_material_detail_id, sales_order_detail_id, purchase_order_detail_id, item_sku, adjustment_type, order_number, quantity, available_quantity, date) VALUES (null, 3, null, null, null, 5, 'PRT-MOTHERBOARD-1', 'PO', 20002, 15, 29, NOW());
INSERT INTO inventory(product_id, part_id, bill_of_material_id, bill_of_material_detail_id, sales_order_detail_id, purchase_order_detail_id, item_sku, adjustment_type, order_number, quantity, available_quantity, date) VALUES (null, 4, null, null, null, 6, 'PRT-MOTHERBOARD-2', 'PO', 20002, 10, 24, NOW());
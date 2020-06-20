DROP DATABASE IF EXISTS bamazonDB;
CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products(
    item_id INT(11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT(11),
    PRIMARY KEY(item_id)
);

SELECT * FROM products;

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("10 inch Chef Knife", "Kitchen", 99.99, 300);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("12 inch Sauce Pan", "Kitchen", 49.99, 150);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Bamboo Cutting Board", "Kitchen", 29.98, 200);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Chef Coat", "clothing", 45.00, 100);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Cozy Chef Pants", "clothing", 45.00, 150);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Top Vented Chef Hat", "clothing", 30.00, 45);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Pocket Thermometer", "accessories", 9.99, 400);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("4 Pack Sharpie", "misc", 7.99, 150);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Date Lables", "misc", 9.99, 200);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("10 Pack Bick Pens", "misc", 5.50, 500);
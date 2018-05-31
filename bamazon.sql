CREATE DATABASE bamazon;

USE bamazon;
DROP TABLE products;
WHERE id= 5;

CREATE TABLE products(
id INTEGER(10) AUTO_INCREMENT NOT NULL, 
product_name VARCHAR(30) NOT NULL,
department_name VARCHAR(30) NOT NULL,
price DECIMAL(4) NOT NULL,
stock_quantity INTEGER(10),
primary key (id)
);

ALTER TABLE products
MODIFY price DECIMAL(4);

select * from products;
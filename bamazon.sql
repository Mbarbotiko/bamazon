CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
id INTEGER(10) AUTO_INCREMENT NOT NULL, 
product_name VARCHAR(30) NOT NULL,
department_name VARCHAR(30) NOT NULL,
price INTEGER(10) NOT NULL,
stock_quantity INTEGER(10),
primary key (id)
);

select * from products
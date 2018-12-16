CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
item_id INTEGER(11) NOT NULL auto_increment,
product_name VARCHAR(50) NOT NULL,
department_name VARCHAR (50) NOT NULL,
price DECIMAL(11,2) NOT NULL,
stock_quantity INTEGER (11) NOT NULL,
primary	key (item_id)

);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES  ('Way of Kings', 'Fantasy', 11.50, 100),
('Words of Radiance', 'Fantasy', 11.50, 120),
('Oathbringer', 'Fantasy', 11.50, 50),
('Star Trek', 'Sci-Fi', 15.00, 75),
('Star Wars', 'Sci-Fi', 15.00, 20),
('One Piece', 'Manga', 9.50, 30),
('Naruto', 'Manga', 9.50, 10),
('Bleach', 'Manga', 9.50, 15),
('Scott Pilgram', 'Manga', 9.50, 12),
('IT', 'Horror', 19.50, 50),
('Cujo', 'Horror', 19.50, 45),
('Holy Bible', 'Horror', 19.50, 60),
('Spider-Man', 'Comic', 5.50, 100),
('HULK', 'Comic', 5.50, 90),
('Iron Man', 'Comic', 5.50, 150);

Select * from products;
CREATE DATABASE IF NOT EXISTS test_task;

use test_task;

-- create tables
DROP TABLE IF EXISTS taxes;

CREATE TABLE taxes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(15) NOT NULL,
  value TINYINT DEFAULT NULL,
  description VARCHAR(50) DEFAULT NULL
) ENGINE = InnoDB;

DROP TABLE IF EXISTS categories;

CREATE TABLE IF NOT EXISTS categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) DEFAULT NULL,
  taxId INT DEFAULT NULL,
  FOREIGN KEY (taxId) REFERENCES taxes (id) ON DELETE
  SET
    NULL
) ENGINE = InnoDB;

DROP TABLE IF EXISTS products;

CREATE TABLE IF NOT EXISTS products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(70) NOT NULL,
  price DECIMAL(10, 2) NULL
) ENGINE = InnoDB;

DROP TABLE IF EXISTS productTaxes;

CREATE TABLE IF NOT EXISTS productTaxes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  productId INT NOT NULL,
  taxId INT NULL,
  FOREIGN KEY (productId) REFERENCES products (id) ON DELETE CASCADE,
  FOREIGN KEY (taxId) REFERENCES taxes (id) ON DELETE CASCADE
) ENGINE = InnoDB;

DROP TABLE IF EXISTS productCategory;

CREATE TABLE IF NOT EXISTS productCategory (
  id INT PRIMARY KEY AUTO_INCREMENT,
  productId INT NOT NULL,
  categoryId INT NULL,
  FOREIGN KEY (productId) REFERENCES products (id) ON DELETE CASCADE,
  FOREIGN KEY (categoryId) REFERENCES categories (id) ON DELETE CASCADE
) ENGINE = InnoDB;

DROP TABLE IF EXISTS orders;

CREATE TABLE IF NOT EXISTS orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  date DATETIME DEFAULT CURRENT_TIMESTAMP,
  salesTaxes DECIMAL(10, 2) NULL,
  total DECIMAL(10, 2) NULL
) ENGINE = InnoDB;

DROP TABLE IF EXISTS orderList;

CREATE TABLE IF NOT EXISTS orderList (
  id INT PRIMARY KEY AUTO_INCREMENT,
  orderId INT NOT NULL,
  productId INT NOT NULL,
  quantity TINYINT DEFAULT 1,
  FOREIGN KEY (orderId) REFERENCES orders (id) ON DELETE CASCADE,
  FOREIGN KEY (productId) REFERENCES products (id) ON DELETE CASCADE
) ENGINE = InnoDB;

-- create triggers
DELIMITER $$
CREATE TRIGGER trg_AddProductTax
AFTER INSERT
ON productCategory FOR EACH ROW
BEGIN
  SET @taxId = (SELECT taxId FROM categories WHERE id = New.categoryId and taxId IS NOT NULL);
	IF @taxId THEN
    SET @isTheSameTax = NOT EXISTS (SELECT taxId FROM productTaxes WHERE productId = New.productId and taxId = @taxId);
		IF @isTheSameTax THEN
			INSERT INTO productTaxes(productId, taxId)
			VALUES (New.productId, @taxId);
		END IF;
	END IF;
END$$
DELIMITER ;

-- insert default data
INSERT INTO
  taxes (name, value, description)
valueS
  ("Basic sales", "10", "Basic tax"),
  ("Import duty", "5", "Import tax");

INSERT INTO
  categories (name, taxId)
valueS
  ("Candy", null),
  ("Coffee", null),
  ("Popcorn", null),
  ("Wine", "1"),
  ("Imported", "2"),
  ("Music device", "1"),
  ("Device", "1");

INSERT INTO
  products (name, price)
valueS
  ("16lb bag of Skittles", 16.00),
  ("Walkman", 99.99),
  ("Popcorn", 0.99),
  ("Vanilla-Hazelnut Coffee", 11.00),
  ("Vespa", 15001.25),
  ("crate of Almond Snickers", 75.99),
  ("Discman", 55.00),
  ("Bottle of Wine", 10.00),
  ("300# bag of Fair-Trade Coffee", 997.99);

INSERT INTO
  productCategory (productId, categoryId)
valueS
  (1, 1),
  (2, 6),
  (3, 3),
  (4, 2),
  (4, 5),
  (5, 7),
  (5, 5),
  (6, 2),
  (6, 5),
  (7, 6),
  (8, 4),
  (8, 5),
  (9, 2);
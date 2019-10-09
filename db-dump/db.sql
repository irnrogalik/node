CREATE DATABASE IF NOT EXISTS test_task;
use test_task;

-- create tables
DROP TABLE IF EXISTS Taxes;
CREATE TABLE Taxes (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(15) NOT NULL,
    Value TINYINT DEFAULT NULL,
    Description VARCHAR(50) DEFAULT NULL)
    ENGINE = InnoDB;

DROP TABLE IF EXISTS Categories;
CREATE TABLE IF NOT EXISTS Categories (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(50) DEFAULT NULL,
    TaxId INT DEFAULT NULL,
    FOREIGN KEY (TaxId) REFERENCES Taxes (Id))
    ENGINE = InnoDB;

DROP TABLE IF EXISTS Products;
CREATE TABLE IF NOT EXISTS Products (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(70) NOT NULL,
    Price DECIMAL(10,2) NULL)
    ENGINE = InnoDB;

DROP TABLE IF EXISTS ProductTaxes;
CREATE TABLE IF NOT EXISTS ProductTaxes (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    ProductId INT NOT NULL,
    TaxId INT NULL,
    FOREIGN KEY (ProductId) REFERENCES Products (Id) ON DELETE CASCADE,
    FOREIGN KEY (TaxId) REFERENCES Taxes (Id) ON DELETE CASCADE)
    ENGINE = InnoDB;

DROP TABLE IF EXISTS ProductCategory;
CREATE TABLE IF NOT EXISTS ProductCategory (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    ProductId INT NOT NULL,
    CategoryId INT NULL,
    FOREIGN KEY (ProductId) REFERENCES Products (Id) ON DELETE CASCADE,
    FOREIGN KEY (CategoryId) REFERENCES Categories (Id) ON DELETE CASCADE)
    ENGINE = InnoDB;

DROP TABLE IF EXISTS Orders;
CREATE TABLE IF NOT EXISTS Orders (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Date DATETIME DEFAULT CURRENT_TIMESTAMP,
    SalesTaxes DECIMAL(10,2) NULL,
    Total DECIMAL(10,2) NULL)
    ENGINE = InnoDB;

DROP TABLE IF EXISTS OrderList;
CREATE TABLE IF NOT EXISTS OrderList (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    OrderId INT NOT NULL,
    ProductId INT NOT NULL,
    Quantity TINYINT DEFAULT 1,
    FOREIGN KEY (OrderId) REFERENCES Orders (Id) ON DELETE CASCADE,
    FOREIGN KEY (ProductId) REFERENCES Products (Id) ON DELETE CASCADE)
    ENGINE = InnoDB;

-- create storage procedures
DELIMITER $$
CREATE PROCEDURE getProductsListInCart(IN idList NVARCHAR(100))
BEGIN
	SET @sql = CONCAT('
        SELECT Products.Id, Products.Name, Products.Price, SUM(Products.Price * (Taxes.Value / 100)) as ProductTax
        FROM Products
            LEFT JOIN ProductTaxes on Products.Id = ProductTaxes.ProductId
            LEFT JOIN Taxes on ProductTaxes.TaxId = Taxes.Id
        WHERE Products.Id IN (', idList, ')
        GROUP BY Products.Id, Products.Name');

    PREPARE stmt FROM @sql;
	EXECUTE stmt;
	DEALLOCATE PREPARE stmt;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE getProductsList ()
BEGIN
	SELECT Products.Id, Products.Name, Products.Price, GROUP_CONCAT(Categories.Name) as CategoryName FROM Products
		LEFT JOIN ProductCategory ON Products.Id = ProductCategory.ProductId
		LEFT JOIN Categories on ProductCategory.CategoryId = Categories.Id
	GROUP BY Products.Id, Products.Name, Products.Price;
END$$
DELIMITER ;

-- create triggers
DELIMITER $$
CREATE TRIGGER trg_AddProductTax
AFTER INSERT
ON ProductCategory FOR EACH ROW
BEGIN
  SET @TaxId = (SELECT TaxId FROM Categories WHERE Id = New.CategoryId and TaxId IS NOT NULL);
	IF @TaxId THEN
    SET @isTheSameTax = NOT EXISTS (SELECT TaxId FROM ProductTaxes WHERE ProductId = New.ProductId and TaxId = @TaxId);
		IF @isTheSameTax THEN
			INSERT INTO ProductTaxes(ProductId,TaxId)
			VALUES (New.ProductId, @TaxId);
		END IF;
	END IF;
END$$
DELIMITER ;

-- create views
CREATE VIEW getTaxes AS select Id, Name from Taxes;

-- insert default data
INSERT INTO Taxes (Name, Value)
  VALUES ("Basic sales", "10"), ("Import duty", "5");

INSERT INTO Categories (Name, TaxId)
  VALUES
  ("Candy", null),
  ("Coffee", null),
  ("Popcorn", null),
  ("Wine", "1"),
  ("Imported", "2"),
  ("Music device", "1"),
  ("Device", "1");

INSERT INTO Products (Name, Price)
  VALUES
  ("16lb bag of Skittles", 16.00),
  ("Walkman", 99.99),
  ("Popcorn", 0.99),

  ("Vanilla-Hazelnut Coffee", 11.00),
  ("Vespa", 15001.25),

  ("crate of Almond Snickers", 75.99),
  ("Discman", 55.00),
  ("Bottle of Wine", 10.00),
  ("300# bag of Fair-Trade Coffee", 997.99);

INSERT INTO ProductCategory (ProductId, CategoryId)
  VALUES
  (1, 1),
  (2, 6),
  (3, 3),
  (4, 2), (4, 5),
  (5, 7), (5, 5),
  (6, 2), (6, 5),
  (7, 6),
  (8, 4), (8, 5),
  (9, 2);



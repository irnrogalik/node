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

-- create views
CREATE VIEW getTaxes AS select Id, Name from Taxes;
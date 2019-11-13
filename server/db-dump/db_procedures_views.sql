-- create storage procedures
DELIMITER $$
CREATE PROCEDURE getproductsListInCart(IN idList NVARCHAR(100))
BEGIN
	SET @sql = CONCAT('
        SELECT products.id, products.name, products.price, GROUP_CONCAT(taxes.value) as taxValue
        FROM products
            LEFT JOIN productTaxes on products.id = productTaxes.productId
            LEFT JOIN taxes on productTaxes.taxId = taxes.id
        WHERE products.id IN (', idList, ')
        GROUP BY products.id, products.name');

    PREPARE stmt FROM @sql;
	EXECUTE stmt;
	DEALLOCATE PREPARE stmt;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE getproductsList ()
BEGIN
	SELECT products.id, products.name, products.price, GROUP_CONCAT(categories.name) as categoryName FROM products
		LEFT JOIN productCategory ON products.id = productCategory.productId
		LEFT JOIN categories on productCategory.categoryId = categories.id
	GROUP BY products.id, products.name, products.price;
END$$
DELIMITER ;

-- create views
CREATE VIEW getTaxes AS select id, name from taxes;
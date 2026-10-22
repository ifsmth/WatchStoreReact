CREATE DATABASE IF NOT EXISTS watchstore CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE watchstore;

CREATE TABLE brands (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100) NOT NULL UNIQUE);
CREATE TABLE products (
 id INT AUTO_INCREMENT PRIMARY KEY, brand_id INT NULL, title VARCHAR(255) NOT NULL,
 price DECIMAL(10,2) NOT NULL, gender ENUM('Чоловічий','Жіночий','Унісекс') DEFAULT 'Унісекс',
 mechanism VARCHAR(50), glass VARCHAR(50), strap_material VARCHAR(50), water_resistance VARCHAR(50),
 stock INT NOT NULL DEFAULT 0, description TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 CONSTRAINT fk_products_brand FOREIGN KEY (brand_id) REFERENCES brands(id) ON DELETE SET NULL
);
CREATE TABLE product_images (
 id INT AUTO_INCREMENT PRIMARY KEY, product_id INT NOT NULL, image_url VARCHAR(255) NOT NULL,
 is_main BOOLEAN NOT NULL DEFAULT FALSE,
 CONSTRAINT fk_images_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);
CREATE TABLE users (
 id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100) NOT NULL, email VARCHAR(255) NOT NULL UNIQUE,
 phone_number VARCHAR(50) NOT NULL UNIQUE, password_hash VARCHAR(255) NOT NULL,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE admins (
 id INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(255) NOT NULL UNIQUE,
 password_hash VARCHAR(255) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE orders (
 id INT AUTO_INCREMENT PRIMARY KEY, user_id INT NULL, customer_name VARCHAR(255) NOT NULL,
 phone VARCHAR(50), email VARCHAR(255), comment TEXT, total_price DECIMAL(10,2) NOT NULL,
 status ENUM('Нове','В обробці','Відправлено','Виконано','Скасовано') DEFAULT 'Нове',
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 CONSTRAINT fk_orders_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);
CREATE TABLE order_items (
 id INT AUTO_INCREMENT PRIMARY KEY, order_id INT NOT NULL, product_id INT NOT NULL,
 quantity INT NOT NULL DEFAULT 1, price_at_purchase DECIMAL(10,2) NOT NULL,
 CONSTRAINT fk_items_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
 CONSTRAINT fk_items_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT
);
CREATE TABLE applications (
 id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, contact_information VARCHAR(255) NOT NULL,
 message TEXT NOT NULL, status ENUM('Нове','Опрацьовано') DEFAULT 'Нове', created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

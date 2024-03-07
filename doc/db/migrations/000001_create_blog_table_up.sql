CREATE TABLE IF NOT EXISTS blog(
	id INT PRIMARY KEY AUTO_INCREMENT,
	title VARCHAR(50) DEFAULT '',
	content LONGTEXT,
	author_id INT NOT NULL,
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
	updated_at DATETIME,
	delete_at DATETIME
)
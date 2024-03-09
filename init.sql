CREATE DATABASE IF NOT EXISTS blogger_author;
CREATE DATABASE IF NOT EXISTS blogger_blog;

USE blogger_author;
CREATE TABLE IF NOT EXISTS author(
	id INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(50) DEFAULT '',
	username VARCHAR(50) DEFAULT '',
	email VARCHAR(50) DEFAULT '',
	image VARCHAR(255) DEFAULT '',
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
	updated_at DATETIME,
	delete_at DATETIME
);

USE blogger_blog;
CREATE TABLE IF NOT EXISTS blog(
	id INT PRIMARY KEY AUTO_INCREMENT,
	title VARCHAR(50) DEFAULT '',
	content LONGTEXT,
	author_id INT NOT NULL,
	image VARCHAR(255) DEFAULT '',
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
	updated_at DATETIME,
	delete_at DATETIME
);

-- create mock data to populate the database
USE blogger_author;
INSERT INTO author(name, username, email, image) VALUES('Diego', 'dragon', 'www.diego@gmail.com','');
INSERT INTO author(name, username, email, image) VALUES('Conrad', 'count', 'www,conrad@gmail.com','');
INSERT INTO author(name, username, email, image) VALUES('Micheal', 'mike', 'www.mickey@gmail.com','');

USE blogger_blog;
INSERT INTO blog(title, content, author_id, image) VALUES('The hidden forest', 'The Niagara Escarpment is a steep slope that runs through New York, Ontario, Michigan, Wisconsin, and Illinois. Niagara Falls actually plunges over one cliff in the Niagara Escarpment. This vast region is covered in forests and runs along long stretches of coastline. It’s a popular region for hikers and scientists alike, especially now that one of its major secrets has been revealed.', 1, 'https://firebasestorage.googleapis.com/v0/b/propics-fde49.appspot.com/o/background-card-1.png?alt=media&token=196365a7-3afa-4c40-b460-b250b2a4b27a');
INSERT INTO blog(title, content, author_id, image) VALUES('Creatures of the sea', 'Lots of different animals drift in the ‘inner space’ of the deep ocean, where they are collectively known as zooplankton – from the Greek for ‘animal drifters’. Some of them live their whole lives as drifters, such as the ‘seed shrimp’ (1) tucked up in its orange carapace, and the ‘sea butterfly’ (2) – a snail that swims instead of crawls. Others are only temporary members of the zooplankton – the larval stages of animals such as sea stars (3), which eventually sink back down to continue their lives on the seafloor. Spending time as drifters means they can be carried to new places by ocean currents, if they’re not eaten by other zooplankton on the way.',2,"https://firebasestorage.googleapis.com/v0/b/propics-fde49.appspot.com/o/00000-00556186.webp?alt=media&token=50a92fc0-206a-44f2-8dd5-8f49090bb484");
INSERT INTO blog(title, content, author_id, image) VALUES('The golden monkey','The Monkey King or Sun Wukong (simplified Chinese: 孙悟空; traditional Chinese: 孫悟空; pinyin: Sūn Wù Kōng) is a fictional character best known as one of the main players in the 16th-century Chinese novel Journey to the West (traditional Chinese: 西遊記; simplified Chinese: 西游记), and many later stories and adaptations.[1] In the novel, Sun Wukong is a monkey born from a stone who acquires supernatural powers through Taoist practices. After rebelling against heaven, he is imprisoned under a mountain by the Buddha. After five hundred years, he accompanies the monk Tang Sanzang (唐三藏) riding on the White Dragon Horse and two other disciples, Zhu Bajie and Sha Wujing, on a journey to obtain Buddhist sutras from the West (India), where Buddha and his followers dwell.',3,'https://firebasestorage.googleapis.com/v0/b/propics-fde49.appspot.com/o/forestTemple.jpg?alt=media&token=d08907b0-b8fb-410e-92d3-2035d066357b');
INSERT INTO blog(title, content, author_id, image) VALUES('Leyendas tibetanas', 'En la región del Transhimalaya, en el suroeste del Tíbet, yace el monte Kailash, centro de peregrinación de las grandes religiones de la India. El Kailash es la montaña que simboliza, por sus cumbres nevadas como halos de luz, el más alto logro espiritual, la pureza de la mente, la iluminación. Aunque los alpinistas no consideran que el Kailash sea una cima muy difícil de conquistar, no se tiene registro de que nadie haya subido a la cima del Kailash (los montañistas occidentales que han planeado su ascenso han sido recibidos con protestas y animadversión). El Kailash se mantiene puro; su verdadera cima puede alcanzarse, según la tradición, solamente a través de la meditación y el cultivo de la conciencia sutil.', 1, 'https://firebasestorage.googleapis.com/v0/b/propics-fde49.appspot.com/o/01-best-buddhist-temples-dgk07h.jpg?alt=media&token=62fb82ca-4bfb-400f-ae94-ecbf7dad65ca');
INSERT INTO blog(title, content, author_id, image) VALUES('La leyenda de la montaña sagrada', 'El Sintoísmo, "El camino de los dioses", considera la existencia de espíritus, kami en todos los fenómenos naturales. Segen-Sama, diosa del monte fuji, es la más venerada. El monte Fuji es escenario de muchos mitos japoneses. Se cree, por ejemplo, que es la morada de Kunitokotachi, el Señor de la Tierra Eterna, invisible deidad creadora ominipresente que surgió en forma de caña del caos del océano primigenio.', 1, 'https://firebasestorage.googleapis.com/v0/b/propics-fde49.appspot.com/o/blog-2024-03-09T01%3A22%3A23.485Z-6965672962?alt=media&token=47aeefae-4abf-4ffb-8d09-eb835c999a17');

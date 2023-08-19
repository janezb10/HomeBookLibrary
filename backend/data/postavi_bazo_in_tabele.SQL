CREATE DATABASE IF NOT EXISTS knjiznica;
USE knjiznica;

CREATE TABLE IF NOT EXISTS languages(
	id_language		INTEGER  			NOT NULL PRIMARY KEY AUTO_INCREMENT
	,language		VARCHAR(91) 		NOT NULL
);

CREATE TABLE IF NOT EXISTS fields(
	id_field		INTEGER 			NOT NULL PRIMARY KEY AUTO_INCREMENT
	,field	    	VARCHAR(91) 	    NOT NULL
);

CREATE TABLE IF NOT EXISTS subfields(
	id_subfield 	INTEGER				NOT NULL AUTO_INCREMENT
	,id_field   	INTEGER				NOT NULL
	,subfield   	VARCHAR(91)			NOT NULL
	,PRIMARY KEY (id_subfield, id_field)
	,FOREIGN KEY (id_field) REFERENCES fields(id_field) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS positions(
	id_position  	INTEGER				NOT NULL PRIMARY KEY AUTO_INCREMENT
	,`position`		VARCHAR(91)			NOT NULL
);

CREATE TABLE IF NOT EXISTS authors(
	id_author  		INTEGER				NOT NULL PRIMARY KEY AUTO_INCREMENT
	,author			VARCHAR(91)			NOT NULL
);

CREATE TABLE IF NOT EXISTS collections(
	id_collection		INTEGER			NOT NULL PRIMARY KEY AUTO_INCREMENT
	,collection			VARCHAR(91)		NOT NULL
);

CREATE TABLE IF NOT EXISTS books(
	id				INTEGER  			NOT NULL PRIMARY KEY AUTO_INCREMENT
	,title			VARCHAR(91) 		NOT NULL
	,id_author		INTEGER 			NOT NULL DEFAULT 1
	,id_field	    INTEGER 			NOT NULL DEFAULT 1
	,id_subfield    INTEGER 			NOT NULL DEFAULT 1
	,id_position	INTEGER 			NOT NULL DEFAULT 1
	,id_language	INTEGER
	,id_collection	INTEGER
	,country		VARCHAR(91)
	,`year`			INTEGER
	,notes			VARCHAR(91)
	,FOREIGN KEY (id_author)			REFERENCES authors(id_author)
	,FOREIGN KEY (id_field) 			REFERENCES fields(id_field)
	,FOREIGN KEY (id_subfield) 		    REFERENCES subfields(id_subfield)
	,FOREIGN KEY (id_position) 			REFERENCES positions(id_position)
	,FOREIGN KEY (id_language) 			REFERENCES languages(id_language)
	,FOREIGN KEY (id_collection)		REFERENCES collections(id_collection)
);








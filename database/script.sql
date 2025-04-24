CREATE DATABASE db_controle_musicas_ba;

USE db_controle_musicas_ba;

CREATE TABLE tbl_musica(
	id_musica INT PRIMARY KEY auto_increment,
    nome VARCHAR(80) NOT NULL,
    link VARCHAR(200) NOT NULL,
	duracao TIME NOT NULL,
    data_lancamento DATE NOT NULL,
    foto_capa VARCHAR(200),
    letra TEXT
);

CREATE TABLE tbl_usuario(
	id INT PRIMARY KEY auto_increment,
    nome VARCHAR(60) NOT NULL,
    user_name VARCHAR(30) NOT NULL,
	email VARCHAR(100) NOT NULL,
    senha VARCHAR(8) NOT NULL
);

CREATE TABLE tbl_banda(
	id INT PRIMARY KEY auto_increment,
    nome VARCHAR(80) NOT NULL,
    membros VARCHAR(200) NOT NULL,
	data_criacao DATE NOT NULL
);

CREATE TABLE tbl_playlist(
	id INT PRIMARY KEY auto_increment,
    nome VARCHAR(30) NOT NULL,
    data_criacao DATE NOT NULL,
	duracao TIME NOT NULL,
    foto_capa VARCHAR(200)
);

CREATE TABLE tbl_plano(
	id INT PRIMARY KEY auto_increment,
    nome VARCHAR(100) NOT NULL,
    preco VARCHAR(20) NOT NULL,
    beneficios VARCHAR(200) NOT NULL
);

CREATE TABLE tbl_data_vigencia(
	id INT PRIMARY KEY auto_increment,
    data_inicio DATE NOT NULL,
    data_termino DATE NOT NULL
);

CREATE TABLE tbl_classificacao(
	id INT PRIMARY KEY auto_increment,
    nome VARCHAR(60) NOT NULL
);

CREATE TABLE genero(
	id INT PRIMARY KEY auto_increment,
    nome VARCHAR(45) NOT NULL
);

SHOW TABLES;

DESC tbl_musica;
DESC tbl_usuario;
DESC tbl_banda;
DESC tbl_playlist;
DESC tbl_plano;
DESC tbl_data_vigencia;
DESC tbl_classificacao;
DESC tbl_genero;

SELECT * FROM tbl_musica;
SELECT * FROM tbl_usuario;
SELECT * FROM tbl_banda;
SELECT * FROM tbl_playlist;
SELECT * FROM tbl_plano;
SELECT * FROM tbl_data_vigencia;
SELECT * FROM tbl_classificacao;
SELECT * FROM tbl_genero;
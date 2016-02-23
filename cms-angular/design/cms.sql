

DROP TABLE IF EXISTS resource;

CREATE TABLE resource (
  id INT(10) UNSIGNED NOT NULL auto_increment,
  code VARCHAR(32) NOT NULL UNIQUE,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE users (
  id INT(10) UNSIGNED NOT NULL auto_increment,
  name VARCHAR(32) NOT NULL UNIQUE,
  email VARCHAR(128) NOT NULL UNIQUE,
  password BINARY(32) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

insert into users(name,email,password) values ('dave','dave@abc.com','1234');
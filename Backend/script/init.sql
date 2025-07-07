CREATE DATABASE IF NOT EXISTS movies_db;
USE movies_db;


CREATE TABLE IF NOT EXISTS actors (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    name       VARCHAR(255) NOT NULL,
    image_url  TEXT
);


CREATE TABLE IF NOT EXISTS movies (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    title       VARCHAR(255) NOT NULL,
    description TEXT,
    image_url   TEXT
);

CREATE TABLE IF NOT EXISTS movie_actor (
    movie_id INT NOT NULL,
    actor_id INT NOT NULL,
    PRIMARY KEY (movie_id, actor_id),
    FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE,
    FOREIGN KEY (actor_id) REFERENCES actors(id) ON DELETE CASCADE
);

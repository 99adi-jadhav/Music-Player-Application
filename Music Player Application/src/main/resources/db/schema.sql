-- Create tables
CREATE TABLE IF NOT EXISTS songs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    artist VARCHAR(255) NOT NULL,
    path VARCHAR(255) NOT NULL,
    album_art VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS favorites (
    song_id INTEGER REFERENCES songs(id) ON DELETE CASCADE,
    PRIMARY KEY (song_id)
);

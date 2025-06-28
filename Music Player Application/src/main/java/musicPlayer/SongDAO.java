package musicPlayer;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class SongDAO {
    
    public List<Song> getAllSongs() {
        List<Song> songs = new ArrayList<>();
        String sql = "SELECT s.*, EXISTS(SELECT 1 FROM favorites f WHERE f.song_id = s.id) AS is_favorite FROM songs s";

        try (Connection conn = Database.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {

            while (rs.next()) {
                Song song = new Song();
                song.setId(rs.getInt("id"));
                song.setTitle(rs.getString("title"));
                song.setArtist(rs.getString("artist"));
                song.setPath("/songs/" + rs.getString("path")); // Corrected path
                song.setAlbumArt("/image/" + rs.getString("album_art")); // Corrected path
                song.setFavorite(rs.getBoolean("is_favorite"));
                songs.add(song);
            }
        } catch (SQLException e) {
            System.err.println("Error fetching songs: " + e.getMessage());
        }
        return songs;
    }

    public void addFavorite(int songId) {
        executeUpdate("INSERT INTO favorites (song_id) VALUES (?) ON CONFLICT DO NOTHING", songId);
    }

    public void removeFavorite(int songId) {
        executeUpdate("DELETE FROM favorites WHERE song_id = ?", songId);
    }

    private void executeUpdate(String sql, int songId) {
        try (Connection conn = Database.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, songId);
            stmt.executeUpdate();
        } catch (SQLException e) {
            System.err.println("Error executing update: " + e.getMessage());
        }
    }
}

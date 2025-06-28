package musicPlayer;

public class Song {
    private int id;
    private String title;
    private String artist;
    private String path;
    private String albumArt;
    private boolean isFavorite;

    public int getId() { return id; }
    public String getTitle() { return title; }
    public String getArtist() { return artist; }
    public String getPath() { return path; }
    public String getAlbumArt() { return albumArt; }
    public boolean isFavorite() { return isFavorite; }

    public void setId(int id) { this.id = id; }
    public void setTitle(String title) { this.title = title; }
    public void setArtist(String artist) { this.artist = artist; }
    public void setPath(String path) { this.path = path; }
    public void setAlbumArt(String albumArt) { this.albumArt = albumArt; }
    public void setFavorite(boolean favorite) { isFavorite = favorite; }
}

package musicPlayer;

import static spark.Spark.*;
import com.google.gson.Gson;

public class App {
    public static void main(String[] args) {
        System.out.println("Server starting on port 8080...");
        port(8080);
        // Configure static file serving
        staticFiles.externalLocation("songs");  // Serve songs from 'songs' directory
        staticFiles.externalLocation("images"); // Serve images from 'images' directory

        // Initialize components
        SongDAO songDAO = new SongDAO();
        Gson gson = new Gson();

        // Enable CORS
        enableCORS();

        // API Endpoints
        get("/songs", (req, res) -> {
            res.type("application/json");
            return songDAO.getAllSongs();
        }, gson::toJson);

        post("/favorites/:id", (req, res) -> {
            int songId = Integer.parseInt(req.params(":id"));
            songDAO.addFavorite(songId);
            res.status(204);
            return "";
        });

        delete("/favorites/:id", (req, res) -> {
            int songId = Integer.parseInt(req.params(":id"));
            songDAO.removeFavorite(songId);
            res.status(204);
            return "";
        });

        // Handle 404 errors
        notFound((req, res) -> {
            res.type("application/json");
            return "{\"error\": \"Resource not found\"}";
        });

        // Log incoming requests
        before((req, res) -> {
            System.out.println("Request received: " + req.pathInfo());
        });
    }

    private static void enableCORS() {
        options("/*", (req, res) -> {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
            res.header("Access-Control-Allow-Headers", "Content-Type");
            return "OK";
        });

        before((req, res) -> {
            res.header("Access-Control-Allow-Origin", "*");
        });
    }
}
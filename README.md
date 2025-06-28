# Project Title:- Music Player Application.

## Overview :- 
The **Music Player Application** is a Java-based web application designed for streaming and managing audio files through a web interface.
It allows users to play songs, upload audio files, and manage a song list stored in a SQL database.
The system uses **Java Servlets** (or Spark framework) for the backend and **SQL (PostgreSQL/MySQL)** for data storage. 
The frontend is developed using **HTML**, **CSS**, and **JavaScript** for interactive controls and song management.

## Key Features :-
- Play, Pause, Next, Previous song controls.
- Upload new audio files through the web interface.
- View and browse the list of available songs.
- Responsive and interactive user interface.
- SQL database integration for managing song details.

# Project Structure
- /src: Contains Java backend code (Servlets or Spark controllers, models).
- /webapp/css: CSS files for styling the frontend.
- /webapp/js: JavaScript files for music player controls.
- /webapp/songs: Directory to store audio files.
- /webapp/WEB-INF: web.xml configuration for the Java web application.
- /sql: SQL script for database table creation and sample data.
- /README.md: Project description and structure.

## Technologies Used :-
- Java (Servlets or Spark framework)
- SQL (PostgreSQL/MySQL)
- HTML
- CSS
- JavaScript

## Database :-
- Relational database created using SQL.
- Table `songs` to store song metadata (title and file path).

**Sample Table Structure**
```sql
CREATE TABLE songs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    file_path VARCHAR(255) NOT NULL
);



---

## 📦 Installation

### Prerequisites
- Java JDK 11+
- Apache Tomcat / Spark Framework
- PostgreSQL / MySQL
- Maven (if applicable)

### Steps
1. Clone the repository:
```bash
git clone https://github.com/99adi-jadhav/music-player-application.git


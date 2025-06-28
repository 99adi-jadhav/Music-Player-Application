document.addEventListener("DOMContentLoaded", () => {
            // DOM Elements
            const audioPlayer = document.getElementById("audio-player");
            const playPauseBtn = document.getElementById("play-pause");
            const playIcon = document.getElementById("play-icon");
            const prevBtn = document.getElementById("prev");
            const nextBtn = document.getElementById("next");
            const shuffleBtn = document.getElementById("shuffle");
            const repeatBtn = document.getElementById("repeat");
            const progressBar = document.getElementById("progress-bar");
            const playlistContainer = document.getElementById("playlist");
            const albumArt = document.getElementById("album-art");
            const backgroundArt = document.getElementById("background-art");
            const songNameEl = document.getElementById("song-name");
            const artistNameEl = document.getElementById("artist-name");
            const likeBtn = document.getElementById("like-btn");
            const seeAllBtn = document.getElementById("see-all");
            const favoritesBtn = document.getElementById("favorites");
            const volumeControl = document.getElementById("volume-control");
            const currentTimeEl = document.getElementById("current-time");
            const totalTimeEl = document.getElementById("total-time");
            const songCountEl = document.getElementById("song-count");

            // Your custom songs
            let songs = [
                {
                    id: 1,
                    title: "Squid Game Theme",
                    artist: "Jang Kui",
                    path: "songs/Squid_Game_Song.mp3",
                    albumArt: "image/Squid_Game_photo.jpg",
                    duration: "3:45",
                    isFavorite: false
                },
                {
                    id: 2,
                    title: "Kalki Theme",
                    artist: "Govin",
                    path: "songs/Kalki_song.mp3",
                    albumArt: "image/Kalki_Photo.jpg",
                    duration: "4:20",
                    isFavorite: true
                },
                {
                    id: 3,
                    title: "Shivbha Raj Theme",
                    artist: "Ajay-Atul",
                    path: "songs/Shivba_Raje_song.mp3",
                    albumArt: "image/Shivba_Raje_photo.jpg",
                    duration: "5:10",
                    isFavorite: false
                }
            ];

            let currentSongIndex = 0;
            let isPlaying = false;
            let isShuffled = false;
            let repeatMode = 0; // 0: off, 1: all, 2: one

            // Initialize player
            function initPlayer() {
                populatePlaylist();
                loadSong(songs[currentSongIndex]);
                updateSongCount();
                
                // Set volume
                audioPlayer.volume = volumeControl.value;
            }

            // Format time in MM:SS format
            function formatTime(seconds) {
                const min = Math.floor(seconds / 60);
                const sec = Math.floor(seconds % 60);
                return `${min}:${sec < 10 ? '0' : ''}${sec}`;
            }

            // Load a song
            function loadSong(song) {
                songNameEl.textContent = song.title;
                artistNameEl.textContent = song.artist;
                albumArt.src = song.albumArt;
                backgroundArt.style.backgroundImage = `url(${song.albumArt})`;
                
                // Update like button
                likeBtn.classList.toggle('active', song.isFavorite);
                
                // Set audio source
                audioPlayer.src = song.path;
                
                // Update playlist active state
                updateActiveSong();
                
                // Reset play icon if needed
                if (!isPlaying) {
                    playIcon.classList.remove('fa-pause');
                    playIcon.classList.add('fa-play');
                }
            }

            // Play/pause toggle
            function togglePlayPause() {
                if (isPlaying) {
                    audioPlayer.pause();
                    playIcon.classList.remove('fa-pause');
                    playIcon.classList.add('fa-play');
                } else {
                    audioPlayer.play().catch(error => {
                        console.error("Playback failed:", error);
                        alert("Failed to play audio. Please check the file path.");
                    });
                    playIcon.classList.remove('fa-play');
                    playIcon.classList.add('fa-pause');
                }
                isPlaying = !isPlaying;
            }

            // Next song
            function nextSong() {
                if (isShuffled) {
                    currentSongIndex = Math.floor(Math.random() * songs.length);
                } else {
                    currentSongIndex = (currentSongIndex + 1) % songs.length;
                }
                loadSong(songs[currentSongIndex]);
                if (isPlaying) audioPlayer.play();
            }

            // Previous song
            function prevSong() {
                if (audioPlayer.currentTime > 3) {
                    audioPlayer.currentTime = 0;
                } else {
                    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
                    loadSong(songs[currentSongIndex]);
                    if (isPlaying) audioPlayer.play();
                }
            }

            // Toggle shuffle
            function toggleShuffle() {
                isShuffled = !isShuffled;
                shuffleBtn.classList.toggle('active', isShuffled);
            }

            // Toggle repeat
            function toggleRepeat() {
                repeatMode = (repeatMode + 1) % 3;
                repeatBtn.classList.toggle('active', repeatMode > 0);
                
                // Update icon based on repeat mode
                if (repeatMode === 2) {
                    repeatBtn.innerHTML = '<i class="fas fa-redo-alt"></i>';
                } else {
                    repeatBtn.innerHTML = '<i class="fas fa-redo"></i>';
                }
            }

            // Toggle favorite
            function toggleFavorite() {
                songs[currentSongIndex].isFavorite = !songs[currentSongIndex].isFavorite;
                likeBtn.classList.toggle('active', songs[currentSongIndex].isFavorite);
                updateFavoriteIcons();
            }

            // Populate playlist
            function populatePlaylist() {
                playlistContainer.innerHTML = '';
                
                songs.forEach((song, index) => {
                    const li = document.createElement('li');
                    li.classList.toggle('active', index === currentSongIndex);
                    
                    li.innerHTML = `
                        <div class="song-details">
                            <div class="song-title">${song.title}</div>
                            <div class="song-artist">${song.artist}</div>
                        </div>
                        <div class="song-duration">${song.duration}</div>
                        <i class="fas fa-heart favorite-icon ${song.isFavorite ? 'active' : ''}"></i>
                    `;
                    
                    li.addEventListener('click', () => {
                        currentSongIndex = index;
                        loadSong(songs[currentSongIndex]);
                        if (isPlaying) audioPlayer.play();
                    });
                    
                    playlistContainer.appendChild(li);
                });
            }

            // Update active song in playlist
            function updateActiveSong() {
                const playlistItems = playlistContainer.querySelectorAll('li');
                playlistItems.forEach((item, index) => {
                    item.classList.toggle('active', index === currentSongIndex);
                });
            }

            // Update favorite icons
            function updateFavoriteIcons() {
                const favoriteIcons = playlistContainer.querySelectorAll('.favorite-icon');
                favoriteIcons.forEach((icon, index) => {
                    icon.classList.toggle('active', songs[index].isFavorite);
                });
            }

            // Update song count
            function updateSongCount() {
                songCountEl.textContent = `${songs.length} songs`;
            }

            // Event Listeners
            playPauseBtn.addEventListener('click', togglePlayPause);
            nextBtn.addEventListener('click', nextSong);
            prevBtn.addEventListener('click', prevSong);
            shuffleBtn.addEventListener('click', toggleShuffle);
            repeatBtn.addEventListener('click', toggleRepeat);
            likeBtn.addEventListener('click', toggleFavorite);
            
            // Progress bar
            progressBar.addEventListener('input', () => {
                const seekTime = (progressBar.value / 100) * audioPlayer.duration;
                audioPlayer.currentTime = seekTime;
            });
            
            // Volume control
            volumeControl.addEventListener('input', () => {
                audioPlayer.volume = volumeControl.value;
            });
            
            // Audio player events
            audioPlayer.addEventListener('timeupdate', () => {
                if (!isNaN(audioPlayer.duration)) {
                    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
                    progressBar.value = progress;
                    currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
                }
            });
            
            audioPlayer.addEventListener('loadedmetadata', () => {
                if (!isNaN(audioPlayer.duration)) {
                    totalTimeEl.textContent = formatTime(audioPlayer.duration);
                } else {
                    totalTimeEl.textContent = "0:00";
                }
            });
            
            audioPlayer.addEventListener('error', (e) => {
                console.error("Audio error:", audioPlayer.error);
                songNameEl.textContent = "Error loading song";
                artistNameEl.textContent = "";
                totalTimeEl.textContent = "0:00";
            });
            
            audioPlayer.addEventListener('ended', () => {
                if (repeatMode === 2) {
                    // Repeat one song
                    audioPlayer.currentTime = 0;
                    audioPlayer.play();
                } else {
                    nextSong();
                }
            });
            
            // Playlist filter buttons
            seeAllBtn.addEventListener('click', () => {
                seeAllBtn.classList.add('active');
                favoritesBtn.classList.remove('active');
                // In a real app, this would fetch all songs from the backend
            });
            
            favoritesBtn.addEventListener('click', () => {
                favoritesBtn.classList.add('active');
                seeAllBtn.classList.remove('active');
                // In a real app, this would fetch favorite songs from the backend
            });
            
            // Initialize the player
            initPlayer();
        });
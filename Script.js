const apiKey = -o3r8CuSbIrHALER5RswW8N7PU5mRvQjvRTBlIRp3e_YwN4aFMnCfPWwZr7HHF8A // Add your API key for Genius or any lyrics service

function searchSong() {
    const query = document.getElementById("song-search").value;
    if (!query) return;

    fetch(`https://api.genius.com/search?q=${query}&access_token=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const song = data.response.hits[0].result;
            displaySong(song);
        });
}

function displaySong(song) {
    const songTitle = document.getElementById("song-title");
    const songArtist = document.getElementById("song-artist");
    const audioSource = document.getElementById("audio-source");
    const lyricsDisplay = document.getElementById("lyrics-display");
    const emotionDisplay = document.getElementById("song-emotion");

    songTitle.textContent = song.title;
    songArtist.textContent = song.primary_artist.name;
    audioSource.src = song.url; // You can replace this with a direct song link if available

    fetchLyrics(song.path).then(lyrics => {
        lyricsDisplay.textContent = lyrics;
    });

    // Get emotion (this can be from an external API like IBM Watson)
    emotionDisplay.textContent = "Emotion: Happy"; // Placeholder emotion
}

async function fetchLyrics(path) {
    const response = await fetch(path);
    const data = await response.text();
    // Extract lyrics from the page HTML (you may need to adjust based on structure)
    const lyrics = data.match(/<div class="lyrics">([\s\S]+?)<\/div>/)[1];
    return lyrics.replace(/<br>/g, '\n');
}

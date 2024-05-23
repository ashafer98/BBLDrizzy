function generateLyric() {
    const lyrics = [
        "Started from the bottom now we're here.",
        "You only live once, that's the motto, YOLO.",
        "I got my eyes on you, you're everything that I see.",
        "Just hold on, we're going home.",
        "I know when that hotline bling, that can only mean one thing.",
        "Cause you a good girl and you know it.",
        "I'm way up, I feel blessed.",
        "Kiki, do you love me? Are you riding?",
        "I'm more than just an option, refuse to be forgotten."
    ];

    const randomIndex = Math.floor(Math.random() * lyrics.length);
    document.getElementById('lyric-display').textContent = lyrics[randomIndex];
}

}
function getTodayDateString() {
    const today = new Date();
    return today.toISOString().split('T')[0]; // format: "YYYY-MM-DD"
}

function getStoredQuote() {
    const saved = localStorage.getItem("dailyQuote");
    if (!saved) return null;

    const { quote, date } = JSON.parse(saved);
    const today = getTodayDateString();

    return (date === today) ? quote : null;
}

function setNewQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const newQuote = quotes[randomIndex];
    const today = getTodayDateString();

    localStorage.setItem("dailyQuote", JSON.stringify({ quote: newQuote, date: today }));
    return newQuote;
}

window.addEventListener("DOMContentLoaded", () => {
    // Apply team color theme, if this bracelet's link included one
    const params = new URLSearchParams(window.location.search);
    const team = params.get("team");
    if (team && typeof teamThemes !== "undefined" && teamThemes[team]) {
        const theme = teamThemes[team];
        if (theme.bg) document.documentElement.style.setProperty("--bg-color", theme.bg);
        if (theme.accent) document.documentElement.style.setProperty("--accent-color", theme.accent);
        if (theme.logo) {
            const logoEl = document.querySelector(".logo");
            if (logoEl) logoEl.src = "assets/images/" + theme.logo;
        }
    }

    const quoteElement = document.getElementById("quote");

    // Check if session already saw the quote
    const sessionSeen = sessionStorage.getItem("quoteShown");

    let quote;

    if (!sessionSeen) {
        // New tab or visit - generate a new quote
        quote = setNewQuote();
        sessionStorage.setItem("quoteShown", "true");
    } else {
        // Same tab/session - use stored quote
        quote = getStoredQuote() || setNewQuote();
    }

    quoteElement.textContent = quote;
});

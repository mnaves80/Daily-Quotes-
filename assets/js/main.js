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
    const quoteElement = document.getElementById("quote");
    const existingQuote = getStoredQuote();

    quoteElement.textContent = existingQuote || setNewQuote();
});
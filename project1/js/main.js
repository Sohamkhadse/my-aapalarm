document.addEventListener('DOMContentLoaded', () => {
    const appItems = document.querySelectorAll('.app-item');

    appItems.forEach(item => {
        item.addEventListener('click', () => {
            const app = item.dataset.app;
            window.location.href = `app-timer.html?app=${app}`;
        });
    });

    // Add a motivational quote
    const quoteElement = document.createElement('blockquote');
    quoteElement.textContent = "The secret of getting ahead is getting started.";
    quoteElement.style.fontStyle = 'italic';
    quoteElement.style.margin = '2rem 0';
    quoteElement.style.textAlign = 'center';
    document.querySelector('#motivation').appendChild(quoteElement);

    const quotes = [
        "The secret of getting ahead is getting started.",
        "The only way to do great work is to love what you do.",
        "Believe you can and you're halfway there.",
        "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        "The future belongs to those who believe in the beauty of their dreams."
    ];

    function displayRandomQuote() {
        const quoteElement = document.getElementById('motivational-quote');
        const randomIndex = Math.floor(Math.random() * quotes.length);
        quoteElement.textContent = quotes[randomIndex];
    }

    // Call this function when the page loads and every 10 seconds
    displayRandomQuote();
    setInterval(displayRandomQuote, 10000);

    // Animate title letters with staggered delay
    const titleLetters = document.querySelectorAll('.animated-title .letter');
    titleLetters.forEach((letter, index) => {
        letter.style.animationDelay = `${index * 0.1}s`;
    });

    // Animate clock
    function setClock() {
        const currentDate = new Date();
        const secondsRatio = currentDate.getSeconds() / 60;
        const minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60;
        const hoursRatio = (minutesRatio + currentDate.getHours()) / 12;

        setRotation(document.querySelector('.hand.second'), secondsRatio);
        setRotation(document.querySelector('.hand.minute'), minutesRatio);
        setRotation(document.querySelector('.hand.hour'), hoursRatio);
    }

    function setRotation(element, rotationRatio) {
        element.style.setProperty('--rotation', rotationRatio * 360);
    }

    setInterval(setClock, 1000);
    setClock(); // Initial call to set clock hands
});

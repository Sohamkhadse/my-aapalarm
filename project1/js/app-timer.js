document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const app = urlParams.get('app');
    
    const selectedAppSpan = document.getElementById('selected-app');
    selectedAppSpan.textContent = app;

    const timerForm = document.getElementById('timer-form');
    const timerList = document.getElementById('timer-list');

    // Load timers from local storage
    let timers = JSON.parse(localStorage.getItem('timers')) || [];
    renderTimers();

    timerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const hours = parseInt(document.getElementById('hours').value) || 0;
        const minutes = parseInt(document.getElementById('minutes').value) || 0;
        
        if (hours === 0 && minutes === 0) {
            alert('Please set a valid time.');
            return;
        }

        const totalMinutes = hours * 60 + minutes;
        const endTime = new Date(Date.now() + totalMinutes * 60000);

        const timer = {
            app,
            hours,
            minutes,
            endTime: endTime.getTime()
        };

        timers.push(timer);
        saveTimers();
        renderTimers();

        timerForm.reset();
    });

    function renderTimers() {
        timerList.innerHTML = '';
        const now = Date.now();

        timers = timers.filter(timer => timer.endTime > now);

        timers.forEach((timer, index) => {
            const timerItem = document.createElement('li');
            const timeLeft = Math.max(0, Math.floor((timer.endTime - now) / 60000));
            const hoursLeft = Math.floor(timeLeft / 60);
            const minutesLeft = timeLeft % 60;

            timerItem.innerHTML = `
                <strong>${timer.app}</strong>: ${hoursLeft}h ${minutesLeft}m left
                (Ends at ${new Date(timer.endTime).toLocaleTimeString()})
                <button class="cancel-timer" data-index="${index}">Cancel</button>
            `;

            timerList.appendChild(timerItem);
        });

        saveTimers();
    }

    timerList.addEventListener('click', (e) => {
        if (e.target.classList.contains('cancel-timer')) {
            const index = e.target.dataset.index;
            timers.splice(index, 1);
            renderTimers();
        }
    });

    function saveTimers() {
        localStorage.setItem('timers', JSON.stringify(timers));
    }

    function updateTimers() {
        renderTimers();
        requestAnimationFrame(updateTimers);
    }

    // Start the update loop
    requestAnimationFrame(updateTimers);

    // Request notification permission
    if ('Notification' in window) {
        Notification.requestPermission();
    }

    // Check for expired timers and send notifications
    function checkTimers() {
        const now = Date.now();
        timers.forEach(timer => {
            if (timer.endTime <= now) {
                sendNotification(timer.app);
            }
        });
    }

    const notificationSound = new Audio('path/to/notification-sound.mp3');

    function sendNotification(app) {
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('Time\'s up!', {
                body: `You should stop using ${app} now.`,
                icon: 'path/to/icon.png'
            });
            notificationSound.play();
        } else {
            alert(`Time's up! You should stop using ${app} now.`);
        }
    }

    // Check timers every minute
    setInterval(checkTimers, 60000);
});


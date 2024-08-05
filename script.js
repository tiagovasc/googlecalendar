// script.js
document.getElementById('eventForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = encodeURIComponent(document.getElementById('title').value);
    const date = document.getElementById('date').value;
    const start_time = document.getElementById('start_time').value;
    const end_time = document.getElementById('end_time').value;
    const description = encodeURIComponent(document.getElementById('description').value);
    const location = encodeURIComponent(document.getElementById('location').value);

    const dateParts = date.split('/');
    const startDateTime = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}T${start_time}:00Z`);
    const endDateTime = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}T${end_time}:00Z`);

    const start_utc = startDateTime.toISOString().replace(/-|:|\.\d+Z$/g, '');
    const end_utc = endDateTime.toISOString().replace(/-|:|\.\d+Z$/g, '');

    const url = `https://calendar.google.com/calendar/u/0/r/eventedit?text=${title}&dates=${start_utc}/${end_utc}&details=${description}&location=${location}`;
    navigator.clipboard.writeText(url).then(() => {
        document.getElementById('copyNotification').textContent = 'Event URL copied to clipboard!';
        document.getElementById('copyNotification').style.visibility = 'visible';
        setTimeout(() => {
            document.getElementById('copyNotification').style.visibility = 'hidden';
        }, 3000);
    });
});

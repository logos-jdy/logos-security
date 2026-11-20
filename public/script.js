// Deliberately vulnerable example: DOM-based XSS (CWE-79).
const params = new URLSearchParams(window.location.search);
document.getElementById('result').innerHTML = params.get('name') || 'Guest';

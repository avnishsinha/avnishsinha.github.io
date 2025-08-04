// Typewriter effect for name
const nameTypewriter = document.getElementById('name-typewriter');
const taglineTypewriter = document.getElementById('tagline-typewriter');
const nameText = 'Avnish Kumar Sinha';
const taglineText = 'Frame | Game | Fame';
let nameIndex = 0;
let taglineIndex = 0;

function typeWriterName() {
    if (nameIndex < nameText.length) {
        nameTypewriter.textContent += nameText.charAt(nameIndex);
        nameIndex++;
        setTimeout(typeWriterName, 100); // Adjust the typing speed here
    } else {
        setTimeout(typeWriterTagline, 100);
    }
}

function typeWriterTagline() {
    if (taglineIndex < taglineText.length) {
        taglineTypewriter.textContent += taglineText.charAt(taglineIndex);
        taglineIndex++;
        setTimeout(typeWriterTagline, 100); // Adjust the typing speed here
    }
}

// Start typewriter effect on page load
document.addEventListener('DOMContentLoaded', typeWriterName);


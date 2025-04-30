// Total number of memes available
const TOTAL_MEMES = 336;

// Array to track which memes have been shown
let shownMemes = [];
let currentMemeNumber = 0;

// Get DOM elements
const memeImg = document.getElementById('meme');
const newMemeBtn = document.getElementById('newMemeBtn');
const memeCounter = document.getElementById('memeCounter');

// Function to display a random meme
function showRandomMeme() {
    // Add loading state
    memeImg.classList.add('loading');
    memeContainer.classList.add('loading');
    
    // Reset if all memes have been shown
    if (shownMemes.length === TOTAL_MEMES) {
        shownMemes = [];
        console.log("All memes viewed! Starting a new cycle.");
    }
    
    // Find a meme we haven't shown yet
    let randomNumber;
    do {
        randomNumber = Math.floor(Math.random() * TOTAL_MEMES) + 1;
    } while (shownMemes.includes(randomNumber));
    
    // Mark this meme as shown
    shownMemes.push(randomNumber);
    currentMemeNumber = randomNumber;
    
    // Set the image source
    memeImg.src = `images/meme${randomNumber}.jpg`;
    
    // Update counter
    memeCounter.textContent = `Meme ${shownMemes.length} of ${TOTAL_MEMES} viewed this session`;
}

// Handle image load completion
memeImg.onload = function() {
    // Remove loading state
    memeImg.classList.remove('loading');
    memeContainer.classList.remove('loading');
};

// Handle image load errors
memeImg.onerror = function() {
    console.log(`Failed to load meme${currentMemeNumber}.jpg`);
    
    // Remove the failed meme from the shown list
    const index = shownMemes.indexOf(currentMemeNumber);
    if (index > -1) {
        shownMemes.splice(index, 1);
    }
    
    // Try another meme
    showRandomMeme();
};

// Get reference to meme container for loading animation
const memeContainer = document.querySelector('.meme-container');

// Display a random meme when the page loads
window.onload = showRandomMeme;

// Display a new random meme when the button is clicked
newMemeBtn.addEventListener('click', showRandomMeme);

// Add a keyboard shortcut (spacebar) to show next meme
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        event.preventDefault(); // Prevent page scrolling
        showRandomMeme();
        
        // Add button animation
        newMemeBtn.classList.add('active');
        setTimeout(() => {
            newMemeBtn.classList.remove('active');
        }, 200);
    }
});
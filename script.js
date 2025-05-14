// You can add JavaScript here for more complex interactions
// For example, you might use it to control a more advanced background animation library.

// Example: Adding a class to the background for a gradient animation
document.addEventListener('DOMContentLoaded', function() {
    const background = document.querySelector('.background-animation');
    // You might have a condition to enable the gradient, or always enable it
    background.classList.add('gradient');
});

document.addEventListener('DOMContentLoaded', function() {
    const gameNavLink = document.getElementById('gameNavLink');
    const gamePopupContainer = document.getElementById('game-popup-container');
    const closeGameButton = document.getElementById('close-game');
    const wheelContainer = document.getElementById('wheel-container');
    const wheel = document.getElementById('wheel');
    const spinButton = document.getElementById('spin-button');
    const resultDiv = document.getElementById('result');
    const winMessageContainer = document.getElementById('win-message-container');
    const winningPrizeSpan = document.getElementById('winning-prize');

    const prizes = ["10% OFF", "Free Drink", "5% OFF", "Try Again", "15% OFF", "Free Side"];
    let rotation = 0;
    let spinning = false;

    function spinWheel() {
        if (spinning) return;
        spinning = true;
        resultDiv.textContent = '';
        winMessageContainer.classList.remove('show'); // Hide previous win message

        const randomSpin = Math.floor(Math.random() * 3600) + 3600; // Spin multiple times
        rotation += randomSpin;
        wheelContainer.style.transform = `rotate(${rotation}deg)`;

        setTimeout(() => {
            spinning = false;
            const degreesPerPrize = 360 / prizes.length;
            const winningIndex = Math.floor((rotation % 360) / degreesPerPrize);
            const winningPrize = prizes[prizes.length - 1 - winningIndex]; // Adjust for reverse order

            resultDiv.textContent = `You landed on: ${winningPrize}!`;

            // Show the win message if the prize is not "Try Again"
            if (winningPrize !== "Try Again") {
                winningPrizeSpan.textContent = winningPrize;
                winMessageContainer.classList.add('show');
            } else {
                winMessageContainer.classList.remove('show'); // Ensure it's hidden for "Try Again"
            }

        }, 5000); // Match the transition duration
    }

    // Initialize the wheel segments
    function createWheelSegments() {
        const numSegments = prizes.length;
        const degreesPerSegment = 360 / numSegments;
        wheel.innerHTML = '';
        for (let i = 0; i < numSegments; i++) {
            const segment = document.createElement('div');
            segment.style.position = 'absolute';
            segment.style.width = '100%';
            segment.style.height = '100%';
            segment.style.transformOrigin = 'center center';
            segment.style.transform = `rotate(${i * degreesPerSegment}deg)`;
            segment.style.display = 'flex';
            segment.style.justifyContent = 'flex-end';
            segment.style.alignItems = 'center';
            segment.style.paddingRight = '20px';
            segment.style.fontSize = '0.8em';
            segment.style.pointerEvents = 'none'; // Prevent text selection during spin
            segment.textContent = prizes[i];
            wheel.appendChild(segment);
        }
    }

    // Show the game popup
    if (gameNavLink && gamePopupContainer) {
        gameNavLink.addEventListener('click', function(event) {
            event.preventDefault();
            gamePopupContainer.classList.remove('hidden');
            createWheelSegments(); // Create segments when the popup opens
            rotation = 0; // Reset rotation on open
            wheelContainer.style.transform = `rotate(0deg)`;
            resultDiv.textContent = '';
            winMessageContainer.classList.remove('show'); // Hide win message on open
        });
    }

    // Close the game popup
    if (closeGameButton && gamePopupContainer) {
        closeGameButton.addEventListener('click', function() {
            gamePopupContainer.classList.add('hidden');
            spinning = false;
        });
    }

    // Spin the wheel on button click
    if (spinButton && wheelContainer) {
        spinButton.addEventListener('click', spinWheel);
    }
});

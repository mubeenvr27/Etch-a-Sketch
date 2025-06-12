const divContainer = document.createElement('div');
divContainer.className = 'container';
const resetButton = document.createElement('button');

resetButton.id = 'reset-button';
resetButton.textContent = 'Reset Grid';

const Grid = document.createElement('div');
Grid.id = 'grid';

divContainer.appendChild(resetButton);
document.body.appendChild(divContainer);
divContainer.appendChild(Grid);



function createGrid(size) {
    // Clear Grid
    Grid.innerHTML = '';
    // Calculate square size to fit 960px
    const squareSize = 660 / size;

    // Create grid squares
    for (let i = 0; i < size * size; i++) {
        const square = document.createElement('div');
        square.className = 'grid-square';
        square.style.width = `${squareSize}px`;
        square.style.height = `${squareSize}px`;
        square.dataset.darkness = '0'; // Track darkening level
        Grid.appendChild(square);
    }
    // Add hover effect
    const squares = document.querySelectorAll('.grid-square');
    squares.forEach(square => {
        square.addEventListener('mouseenter', () => {
            let darkness = parseInt(square.dataset.darkness);
            if (darkness < 10) {
                // Generate random RGB color for first interaction
                if (darkness === 0) {
                    const r = Math.floor(Math.random() * 256);
                    const g = Math.floor(Math.random() * 256);
                    const b = Math.floor(Math.random() * 256);
                    square.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
                }
                // Increase darkness by 10%
                darkness += 1;
                square.dataset.darkness = darkness;
                square.style.opacity = darkness / 10;
            }
        });     
    });

}
// Reset grid with user input
resetButton.addEventListener('click', () => {
    let size = prompt('Enter number of squares per side (max 100):');
    size = parseInt(size);
    if (isNaN(size) || size < 1 || size > 100) {
        alert('Please enter a number between 1 and 100.');
        return;
    }
    createGrid(size);
});
// Initialize 16x16 grid
createGrid(16);
// Debug: Log when script is loaded
console.log('Script loaded, 16x16 grid initialized');

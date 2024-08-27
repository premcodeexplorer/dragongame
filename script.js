let score = 0;
let cross = true;
let speed = 1; // Initial speed

document.onkeydown = function (e) {
    console.log("Key code is: ", e.keyCode);
    
    const dino = document.querySelector('.dino');
    
    if (e.keyCode == 38) { // Up arrow key
        if (!dino.classList.contains('animateDino')) {
            dino.classList.add('animateDino');
            setTimeout(() => {
                dino.classList.remove('animateDino');
            }, 700);
        }
    }
    
    if (e.keyCode == 39) { // Right arrow key
        let dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = Math.min(dinoX + 20, window.innerWidth - 200) + "px";
    }
    
    if (e.keyCode == 37) { // Left arrow key
        let dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = Math.max(dinoX - 20, 0) + "px";
    }
}

setInterval(() => {
    const dino = document.querySelector('.dino');
    const gameOver = document.querySelector('.gameover');
    const obstacle = document.querySelector('.obstacle');
    
    let dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    let dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('bottom'));
    
    let ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('right'));
    let oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('bottom'));
    
    let offsetX = Math.abs(window.innerWidth - dx - ox - 150);
    let offsetY = Math.abs(dy - oy);
    
    if (offsetX < 80 && offsetY < 80) {
        gameOver.style.visibility = 'visible';
        obstacle.classList.remove('obstacleAni');
        return; // Stop the game
    }
    
    if (offsetX < 5 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        
        // Increase speed
        speed += 0.1;
        obstacle.style.animationDuration = (3 / speed) + 's';
        console.log('New speed: ', speed);
    }
}, 10);

function updateScore(score) {
    const scoreCont = document.querySelector('#scoreCont');
    scoreCont.innerHTML = "Score: " + score;
}

// Initialize obstacle animation
document.querySelector('.obstacle').style.animationDuration = (3 / speed) + 's';
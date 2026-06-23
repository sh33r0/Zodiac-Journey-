let gameStarted = false;
const size = 6;
let currentLevel = 0;
let seconds = 0;
let timerInterval;
let musicStarted = false;
let levelTimes = Array(12).fill("");
let levelScores = Array(12).fill("");
let totalScore = 0;
const zodiacLevels = [
{name:"Aries",symbol:"♈",bg:"#264d26"},
{name:"Taurus",symbol:"♉",bg:"#5e1914"},
{name:"Gemini",symbol:"♊",bg:"#7a6614"},
{name:"Cancer",symbol:"♋",bg:"#16385c"},
{name:"Leo",symbol:"♌",bg:"#6b3b00"},
{name:"Virgo",symbol:"♍",bg:"#3d4d3d"},
{name:"Libra",symbol:"♎",bg:"#6e1d52"},
{name:"Scorpio",symbol:"♏",bg:"#330000"},
{name:"Sagittarius",symbol:"♐",bg:"#4d2c1a"},
{name:"Capricorn",symbol:"♑",bg:"#330101"},
{name:"Aquarius",symbol:"♒",bg:"#003b4d"},
{name:"Pisces",symbol:"♓",bg:"#24154d"}
];
const puzzles = [

// Aries
[
[0,0,1,1,1,2],
[0,0,1,1,2,2],
[0,3,3,1,2,2],
[3,3,3,4,4,2],
[3,4,4,4,4,5],
[5,5,5,5,5,5]
],

// Taurus
[
[0,0,0,1,1,1],
[0,2,2,2,1,1],
[0,2,3,3,3,1],
[4,2,3,5,5,5],
[4,4,4,5,5,5],
[4,4,4,5,5,5]
],

// Gemini
[
[0,0,1,1,2,2],
[0,0,1,2,2,2],
[3,3,1,1,4,4],
[3,3,5,5,4,4],
[3,5,5,5,4,4],
[3,5,5,5,4,4]
],

[
[0,0,0,1,1,2],
[0,3,3,1,2,2],
[0,3,3,1,2,2],
[4,4,3,5,5,2],
[4,4,5,5,5,2],
[4,4,5,5,5,2]
],

[
[0,0,1,1,2,2],
[0,0,1,1,2,2],
[3,3,1,4,4,2],
[3,3,4,4,4,5],
[3,3,4,5,5,5],
[3,5,5,5,5,5]
],

[
[0,0,0,1,1,1],
[0,2,2,2,1,1],
[0,2,3,3,3,1],
[4,2,3,5,3,5],
[4,4,3,5,5,5],
[4,4,4,5,5,5]
],

[
[0,0,1,1,1,2],
[0,0,1,3,2,2],
[0,3,3,3,2,2],
[4,4,3,5,5,2],
[4,4,4,5,5,5],
[4,4,4,5,5,5]
],

[
[0,0,0,1,1,2],
[0,3,0,1,2,2],
[3,3,3,1,2,2],
[4,3,5,5,5,2],
[4,4,5,5,5,2],
[4,4,4,5,5,5]
],

[
[0,0,1,1,2,2],
[0,3,1,1,2,2],
[3,3,3,4,2,2],
[3,5,4,4,4,2],
[5,5,5,4,4,4],
[5,5,5,4,4,4]
],

[
[0,0,0,1,1,1],
[0,2,2,1,3,1],
[0,2,2,3,3,3],
[4,4,2,5,3,3],
[4,4,5,5,5,3],
[4,4,5,5,5,5]
],

[
[0,0,1,1,2,2],
[0,0,1,3,2,2],
[4,1,1,3,3,2],
[4,4,3,3,5,5],
[4,4,4,5,5,5],
[4,4,4,5,5,5]
],

[
[0,0,0,1,1,2],
[0,3,0,1,2,2],
[3,3,1,1,2,2],
[3,4,4,5,5,2],
[4,4,4,5,5,5],
[4,4,4,5,5,5]
]
];
console.log(puzzles.length);
let regions = puzzles[0];

const zodiacs = [
"♈","♉","♊",
"♋","♌","♍"
];

let board = Array(size)
.fill()
.map(()=>Array(size).fill(0));

const gameBoard = document.getElementById("board");

const bg = new Audio("bg.mp3");
bg.loop = true;
bg.volume = 0.4;

const sfx = {
    wm: new Audio("wm.mp3"),
    cross: new Audio("cross.mp3"),
    symbol: new Audio("symbol.mp3"),
    pop: new Audio("pop.mp3"),
    win: new Audio("win.mp3"),
    finalWin: new Audio("finalWin.mp3"),
    start: new Audio("start.mp3"),
    reset: new Audio("reset.mp3"),
    restart: new Audio("restart.mp3"),
    hint: new Audio("hint.mp3"),
    nextLevel: new Audio("nextLevel.mp3")
};

function play(sound){
    sound.currentTime = 0;
    sound.play();
}

function startTimer(){

    clearInterval(timerInterval);

    seconds = 0;

    timerInterval = setInterval(()=>{

        seconds++;

        let min =
        String(Math.floor(seconds/60))
        .padStart(2,"0");

        let sec =
        String(seconds%60)
        .padStart(2,"0");

        document.getElementById(
            "timer"
        ).innerText =
        `⏱ ${min}:${sec}`;

    },1000);
}

function stopTimer(){

    clearInterval(timerInterval);
}
function calculateScore(sec){

    if(sec <= 30) return 100;
    if(sec <= 60) return 75;
    if(sec <= 90) return 50;

    return 25;
}

function buildScoreTable(){

    const body =
    document.getElementById("scoreBody");

    if(!body) return;

    body.innerHTML = "";

    zodiacLevels.forEach((zodiac,index)=>{

        body.innerHTML += `
        <tr>
            <td>${index+1}</td>
            <td>${zodiac.name}</td>
            <td>${levelTimes[index]}</td>
            <td>${levelScores[index]}</td>
        </tr>`;
    });
}

function createStars(){
    const stars = document.getElementById("stars");

    const colors = ["#ffffff", "#a5b4fc", "#fca5a5", "#fde68a"];

    for(let i=0;i<150;i++){
        const star = document.createElement("div");
        star.className = "star";

        star.style.left = Math.random()*100 + "%";
        star.style.top = Math.random()*100 + "%";

        star.style.animationDelay = Math.random()*2 + "s";

        const color = colors[Math.floor(Math.random()*colors.length)];
        star.style.background = color;
        star.style.boxShadow = `0 0 6px ${color}`;

        stars.appendChild(star);
    }
}
function createShootingStar(){

    const star = document.createElement("div");
    star.className = "shooting-star";
    star.style.left = Math.random() * window.innerWidth + "px";
    star.style.top = Math.random() * window.innerHeight * 0.5 + "px";
    // random start position
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight * 0.5;
    const colors = ["#ffffff","#60a5fa","#f472b6","#34d399","#fbbf24"];
    const color = colors[Math.floor(Math.random()*colors.length)];

    star.style.background = color;
    star.style.boxShadow = `0 0 10px ${color}, 0 0 20px ${color}`;
    star.style.left = startX + "px";
    star.style.top = startY + "px";

    // random direction
    const dx = (Math.random() - 0.5) * 300; // left or right spread
    const dy = Math.random() * 400 + 200;   // always downward

    star.style.setProperty("--x", dx + "px");
    star.style.setProperty("--y", dy + "px");

    document.body.appendChild(star);

    setTimeout(()=> star.remove(), 1500);
}

function loadLevel(level){

    currentLevel = level;

    const zodiac =
    zodiacLevels[level];

    document.body.style.background =
    `radial-gradient(circle at center,
    #0f172a 0%,
    #0f172a 45%,
    ${zodiac.bg} 100%)`;

    document.getElementById(
        "levelTitle"
    ).innerText =
    zodiac.symbol + " " +
    zodiac.name;

    regions = puzzles[level];

    // Update board border and glow to match the current level color
    const boardEl = document.querySelector('.board');
    if (boardEl) {
        boardEl.style.borderColor = zodiac.bg;
        // add a subtle glow using the same color with transparency
        boardEl.style.boxShadow = `0 0 30px ${zodiac.bg}55`;
    }

    board = Array(size)
.fill()
.map(() => Array(size).fill(0));

startTimer();
drawBoard();
}
function drawBoard(){

    gameBoard.innerHTML="";

    for(let r=0;r<size;r++){

        for(let c=0;c<size;c++){

            const cell=document.createElement("div");

            cell.className=
            "cell region"+regions[r][c];

            if(board[r][c] === 1){

                cell.textContent = "❌";
            }

            if(board[r][c] === 2){

                cell.textContent = zodiacLevels[currentLevel].symbol;
            }

            cell.onclick =
            ()=>toggleCell(r,c);

            gameBoard.appendChild(cell);
        }
    }

    validateBoard();
}

function toggleCell(r,c){
    console.log("clicked", r, c);
    const prev = board[r][c];
    const next = (prev + 1) % 3;

    board[r][c] = next;

    if(next === 1) play(sfx.cross);
    else if(next === 2) play(sfx.symbol);
    else play(sfx.pop);

    drawBoard();

    if(checkWin()){

    play(sfx.win);

    stopTimer();

    let mins =
    String(Math.floor(seconds/60))
    .padStart(2,"0");

    let secs =
    String(seconds%60)
    .padStart(2,"0");

    levelTimes[currentLevel] =
    `${mins}:${secs}`;

    let score =
    calculateScore(seconds);

    levelScores[currentLevel] =
    score;

    totalScore += score;

    buildScoreTable();

    celebrate();

        setTimeout(()=>{

    currentLevel++;

    if(currentLevel >= zodiacLevels.length){

    play(sfx.finalWin);
    bg.pause();
    bg.currentTime = 0;
    document.querySelector("h1").style.display = "none";
    document.getElementById("levelTitle").style.display = "none";
    document.getElementById("timer").style.display = "none";
    document.getElementById("board").style.display = "none";
    document.getElementById("hintBtn").style.display = "none";
    document.getElementById("resetBtn").style.display = "none";
    const msg = document.createElement("div");

    msg.className = "win-message";

    msg.innerHTML =
    `🏆 Zodiac Queens Completed! 🏆
    <br><br>
    ⭐ Total Score: ${totalScore}`;

    document.body.appendChild(msg);

    const restartBtn =
    document.createElement("button");

    restartBtn.innerText =
    "🔄 Restart Game";

    restartBtn.style.padding =
    "12px 24px";

    restartBtn.style.fontSize =
    "22px";

    restartBtn.style.position =
    "fixed";

    restartBtn.style.top =
    "80%";

    restartBtn.style.left =
    "50%";

    restartBtn.style.transform =
    "translateX(-50%)";

    restartBtn.style.zIndex =
    "1000";

    document.body.appendChild(restartBtn);

    let fireworkLoop = setInterval(()=>{
        celebrate();
    },1000);

    restartBtn.onclick = ()=>{
        play(sfx.restart);
    clearInterval(fireworkLoop);

    msg.remove();
    restartBtn.remove();

    levelTimes =
    Array(12).fill("");

    levelScores =
    Array(12).fill("");

    totalScore = 0;

    buildScoreTable();

    document.querySelector("h1").style.display = "block";
    document.getElementById("levelTitle").style.display = "block";
    document.getElementById("timer").style.display = "block";
    document.getElementById("board").style.display = "grid";
    document.getElementById("hintBtn").style.display = "inline-block";
    document.getElementById("resetBtn").style.display = "inline-block";
    currentLevel = 0;
    loadLevel(0);
};

    return;
}

    const nextBtn =
    document.createElement("button");

    nextBtn.innerText =
    "➡ Next Level";

    nextBtn.style.padding =
    "12px 24px";

    nextBtn.style.fontSize =
    "22px";

    nextBtn.style.position =
    "fixed";

    nextBtn.style.top =
    "65%";

    nextBtn.style.left =
    "50%";

    nextBtn.style.transform =
    "translateX(-50%)";

    nextBtn.style.zIndex =
    "1000";

    document.body
    .appendChild(nextBtn);

    nextBtn.onclick = ()=>{

    play(sfx.nextLevel);

    nextBtn.remove();

    loadLevel(currentLevel);
};

},2500);
    }
}

function validateBoard(){

    const cells =
    document.querySelectorAll(".cell");

    cells.forEach(cell=>
        cell.classList.remove(
            "valid","invalid"
        )
    );

    let valid = true;

    for(let r=0;r<size;r++){

        let count =
        board[r].filter(
            cell => cell === 2
        ).length;

        if(count>1)
            valid=false;
    }

    for(let c=0;c<size;c++){

        let count=0;

        for(let r=0;r<size;r++){
            if(board[r][c] === 2)
                count++;
}

        if(count>1)
            valid=false;
    }
    let regionCount = {};

for(let r=0;r<size;r++){

    for(let c=0;c<size;c++){

        if(board[r][c] === 2){

            let region = regions[r][c];

            regionCount[region] =
            (regionCount[region] || 0) + 1;

            if(regionCount[region] > 1){
                valid = false;
            }
        }
    }
}
    if(!validDiagonalCheck())
        valid=false;

    if(valid){
        cells.forEach(
            c=>c.classList.add("valid")
        );
    }
    else{
    cells.forEach(c => c.classList.add("invalid"));
    setTimeout(()=>play(sfx.wm), 50);
}
}

function validDiagonalCheck(){

    for(let r=0;r<size;r++){

        for(let c=0;c<size;c++){

            if(board[r][c] === 2){

                const dirs=[
                    [-1,-1],
                    [-1,1],
                    [1,-1],
                    [1,1]
                ];

                for(const [dr,dc] of dirs){

                    const nr=r+dr;
                    const nc=c+dc;

                    if(
                        nr>=0 &&
                        nr<size &&
                        nc>=0 &&
                        nc<size &&
                        board[nr][nc] === 2
                    ){
                        return false;
                    }
                }
            }
        }
    }

    return true;
}

function checkWin(){

    for(let r=0;r<size;r++){

        let count =
        board[r].filter(
            cell => cell === 2
        ).length;

        if(count!==1)
            return false;
    }

    for(let c=0;c<size;c++){

        let count=0;

        for(let r=0;r<size;r++){
            if(board[r][c] === 2)
                count++;
        }

        if(count!==1)
            return false;
    }

    let regionCount={};

    for(let r=0;r<size;r++){

        for(let c=0;c<size;c++){

            if(board[r][c] === 2){

                let region=
                regions[r][c];

                regionCount[region] =
                (regionCount[region]||0)+1;
            }
        }
    }

    for(let i=0;i<6;i++){

        if(regionCount[i]!==1)
            return false;
    }

    return validDiagonalCheck();
}

function celebrate(){

    const colors = [
        "#ffcc00",
        "#ff66ff",
        "#00ffff",
        "#ff4444",
        "#66ff66",
        "#ffffff"
    ];

    for(let i=0;i<80;i++){

        const particle =
        document.createElement("div");

        particle.className =
        "firework";

        particle.style.left =
        "50vw";

        particle.style.top =
        "50vh";

        const angle =
        Math.random() * 360;

        const distance =
        100 + Math.random() * 300;

        particle.style.setProperty(
            "--x",
            Math.cos(angle*Math.PI/180)
            * distance + "px"
        );

        particle.style.setProperty(
            "--y",
            Math.sin(angle*Math.PI/180)
            * distance + "px"
        );

        particle.style.background =
        colors[
            Math.floor(
                Math.random()*colors.length
            )
        ];

        document.body
        .appendChild(particle);

        setTimeout(()=>{
            particle.remove();
        },1500);
    }

    const msg =
    document.createElement("div");

    msg.className =
    "win-message";

    msg.innerHTML =
zodiacLevels[currentLevel].symbol +
" " +
zodiacLevels[currentLevel].name +
" Complete!";

    document.body
    .appendChild(msg);

    setTimeout(()=>{
        msg.remove();
    },2500);
}

createStars();

function shootingStarLoop() {
    createShootingStar();

    let randomTime = Math.random() * 5000 + 3000; // 3s–8s

    setTimeout(shootingStarLoop, randomTime);
}

shootingStarLoop();

// Start button handler
document.getElementById("startBtn").onclick = () => {
    play(sfx.start);
    gameStarted = true;
    musicStarted = true;

    bg.currentTime = 0;
    bg.play().catch(err => console.log("Audio play error:", err));

    // Hide start screen and show game screen
    const btn = document.getElementById("startBtn");
    if (btn) btn.style.display = "none";

    const startScreen = document.getElementById("startScreen");
    const gameScreen = document.getElementById("gameScreen");
    if (startScreen) startScreen.classList.add("hidden");
    if (gameScreen) gameScreen.classList.remove("hidden");
    
    document.getElementById("hintBtn").style.display = "inline-block";
    document.getElementById("resetBtn").style.display = "inline-block";
    document.getElementById("timer").style.display = "block";
    buildScoreTable();
    loadLevel(0);
};

document.addEventListener("click", () => {
    bg.play().catch(err => console.log("Audio play error:", err));
}, { once: true });
document.getElementById("resetBtn").onclick = ()=>{
play(sfx.reset);
    board = Array(size)
    .fill()
    .map(()=>Array(size).fill(0));

    drawBoard();
    document.getElementById("hintBtn").onclick = ()=>{

    play(sfx.hint);
};
};
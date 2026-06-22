const size = 6;
let currentLevel = 0;
let seconds = 0;
let timerInterval;
const zodiacLevels = [
{name:"Aries",symbol:"♈",bg:"#5e1914"},
{name:"Taurus",symbol:"♉",bg:"#264d26"},
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

const bg = new Audio("sounds/bg.mp3");
bg.loop = true;
bg.volume = 0.4;

const sfx = {
    wm: new Audio("sounds/wm.mp3"),
    cross: new Audio("sounds/cross.mp3"),
    symbol: new Audio("sounds/symbol.mp3"),
    pop: new Audio("sounds/pop.mp3"),
    win: new Audio("sounds/win.mp3"),
    finalWin: new Audio("sounds/finalWin.mp3")
};

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
        celebrate();

        setTimeout(()=>{
            currentLevel++;

            if(currentLevel >= zodiacLevels.length){
                play(sfx.finalWin);
                return;
            }

            loadLevel(currentLevel);
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
    play(sfx.wm);
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

    for(let i=0;i<200;i++){

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
loadLevel(0);
document.addEventListener("click", () => {
    bg.play();
}, { once: true });
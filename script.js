const size = 6;
let currentLevel = 0;

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
{name:"Capricorn",symbol:"♑",bg:"#303030"},
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
]

];

let regions = puzzles[0];

const zodiacs = [
"♈","♉","♊",
"♋","♌","♍"
];

let board = Array(size)
.fill()
.map(()=>Array(size).fill(0));

const gameBoard = document.getElementById("board");
function loadLevel(level){

    currentLevel = level;

    const zodiac =
    zodiacLevels[level];

    document.body.style.background =
    zodiac.bg;

    document.getElementById(
        "levelTitle"
    ).innerText =
    zodiac.symbol + " " +
    zodiac.name;

    regions = puzzles[level];

    board = Array(size)
    .fill()
    .map(() => Array(size).fill(0));

    drawBoard();
}
function drawBoard(){

    gameBoard.innerHTML="";

    for(let r=0;r<size;r++){

        for(let c=0;c<size;c++){

            const cell=document.createElement("div");

            cell.className=
            "cell region"+regions[r][c];

            if(board[r][c]){

                cell.textContent =
                zodiacs[regions[r][c]];
            }

            cell.onclick =
            ()=>toggleCell(r,c);

            gameBoard.appendChild(cell);
        }
    }

    validateBoard();
}

function toggleCell(r,c){

    board[r][c] =
    board[r][c] ? 0 : 1;

    drawBoard();

    if(checkWin()){

    celebrate();

    setTimeout(()=>{

        currentLevel++;

        if(currentLevel >= zodiacLevels.length){

            alert("🏆 Zodiac Journey Complete!");
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
        board[r].reduce(
            (a,b)=>a+b,0
        );

        if(count>1)
            valid=false;
    }

    for(let c=0;c<size;c++){

        let count=0;

        for(let r=0;r<size;r++)
            count+=board[r][c];

        if(count>1)
            valid=false;
    }

    if(!validDiagonalCheck())
        valid=false;

    if(valid){
        cells.forEach(
            c=>c.classList.add("valid")
        );
    }
    else{
        cells.forEach(
            c=>c.classList.add("invalid")
        );
    }
}

function validDiagonalCheck(){

    for(let r=0;r<size;r++){

        for(let c=0;c<size;c++){

            if(board[r][c]){

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
                        board[nr][nc]
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

        let count=
        board[r].reduce(
            (a,b)=>a+b,0
        );

        if(count!==1)
            return false;
    }

    for(let c=0;c<size;c++){

        let count=0;

        for(let r=0;r<size;r++)
            count+=board[r][c];

        if(count!==1)
            return false;
    }

    let regionCount={};

    for(let r=0;r<size;r++){

        for(let c=0;c<size;c++){

            if(board[r][c]){

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

loadLevel(0);
regions = puzzles[level];
drawBoard();
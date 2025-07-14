const boxes = document.querySelectorAll(".box");
const restartBtn = document.querySelector("#restart");
const msg = document.querySelector("#msg");

let turn = "X";
let gameOver = false;

const checkWinner = () => {
    const winPatterns = [
        [0,1,2], [3,4,5], [6,7,8], // rows
        [0,3,6], [1,4,7], [2,5,8], // columns
        [0,4,8], [2,4,6]           // diagonals
    ];

    winPatterns.forEach(pattern => {
        let [a,b,c] = pattern;
        if (
            boxes[a].innerText &&
            boxes[a].innerText === boxes[b].innerText &&
            boxes[a].innerText === boxes[c].innerText
        ) {
            msg.innerText = `Player ${boxes[a].innerText} wins! 🎉`;
            gameOver = true;
            boxes.forEach(box => box.disabled = true);
        }
    });
};

boxes.forEach(box => {
    box.addEventListener("click", () => {
        if (!box.innerText && !gameOver) {
            box.innerText = turn;
            box.disabled = true;
            checkWinner();
            turn = turn === "X" ? "O" : "X";
        }
    });
});

restartBtn.addEventListener("click", () => {
    boxes.forEach(box => {
        box.innerText = "";
        box.disabled = false;
    });
    msg.innerText = "Let's Play the Game";
    turn = "X";
    gameOver = false;
});
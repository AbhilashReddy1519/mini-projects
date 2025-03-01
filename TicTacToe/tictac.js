let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector('#reset');
let newGame = document.querySelector('.newBtn');
let winner = document.querySelector('.msg-container');
let winPlayer = document.querySelector('.msg');

let turn = true //player turns true = O false = X
let count = 0

const pattern = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]  // Diagonals
];

boxes.forEach((box) => {
    box.addEventListener('click', () => {
        console.log("Box clicked");
        if(turn) {
            box.innerHTML = 'O';
            box.style.color = 'lime';
            turn = !turn;
            count++;
        } else {
            box.innerText = 'X';
            box.style.color = 'red';
            turn = !turn;
            count++;
        }
        box.disabled = true;
        checkWinner();
    })
}) 

const showWinner = (player) => {
    if(player === 'O') {
        winPlayer.innerText = '🏆 Player 1 wins! ✨';
    } else {
        winPlayer.innerText = '🏆 Player 2 wins! ✨';
    }
    winner.classList.remove('hide');
    resetBtn.classList.add('hide');
}

const checkWinner = () =>  {
    for(let pat of pattern) {
        let pos1 = boxes[pat[0]].innerText;
        let pos2 = boxes[pat[1]].innerText;
        let pos3 = boxes[pat[2]].innerText;

        if(pos1 != '' && pos2 != '' && pos3 != '') {
            if(pos1 === pos2 && pos2 === pos3) {
                console.log('Winner');
                boxes.forEach((box) => box.disabled = true);
                showWinner(pos1);
            }
        }
        if(count == 9) {
            winner.classList.remove('hide');
            winPlayer.innerText = '🤝 It is draw! 🤝'
            resetBtn.classList.add('hide');
        }

    }
}

newGame.addEventListener('click', () => {
    boxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
    });
    turn = true;
    winner.classList.add('hide');
    resetBtn.classList.remove('hide');
    boxes.forEach((box) => box.disabled = false);
    console.clear();
})

resetBtn.addEventListener('click', () => {
        boxes.forEach((box) => {
            box.innerText = "";
            box.disabled = false;
        });
        turn = true;
        winner.classList.add('hide');
        boxes.forEach((box) => box.disabled = false);
});
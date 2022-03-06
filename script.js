'use strict';

// selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0 = document.querySelector('#score--0'); //# is use for selecting id in index.html
const score1 = document.getElementById('score--1'); // passing the name of the id that where we looking for not selecting
const current0 = document.getElementById('current--0'); // passing the name of the id that where we looking for not selecting
const current1 = document.getElementById('current--1'); // passing the name of the id that where we looking for not selecting

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let score, activePlayer, currentScore, playing;
const init = function () {
  // starting condition

  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;

  diceEl.classList.add('hidden'); // it use hide the content which is showing on the html page
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Rolling dice functionally
btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    //display dice
    diceEl.classList.remove('hidden'); // The classList is written on the const diceEl = querySelector
    diceEl.src = `dice-${dice}.png`;

    //checked for rolled dice
    if (dice !== 1) {
      //add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // document.getElementById(`current--${activePlayer}`).textContent = 0;
      // currentScore = 0;
      // activePlayer = activePlayer === 0 ? 1 : 0;
      // player0El.classList.toggle('player--active');
      // player1El.classList.toggle('player--active');
      switchPlayer(); // instead of above code we wright switchPlayer()
    }
  }
});

//swithcing player
btnHold.addEventListener('click', function () {
  if (playing) {
    // Add current score to active player,s score
    score[activePlayer] += currentScore;

    //scores[1] = scores[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    //check
    if (score[activePlayer] >= 30) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`) //when we use query selector we need actual selector by (.dot) of class
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

//button new
btnNew.addEventListener('click', function () {
  init();
});

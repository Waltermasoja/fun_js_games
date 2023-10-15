function ageInDayas() {
    let birthYear = prompt('Enter the year that you were born!');
    let ageInDays = (2023 - birthYear) * 365;
    let h1 = document.createElement('h1');
    let textanswer = document.createTextNode('You are ' + ageInDays + '  days old');
    h1.setAttribute('id', 'ageInDays');
    h1.appendChild(textanswer);
    document.getElementById('flex-box-result').appendChild(h1);


}
function reset() {
    document.getElementById('ageInDays').remove();
}

//cat generator

function generateCate(yourChoice) {
    let image = document.createElement('img');
    let div = document.getElementById('flex-cat-gen');
    image.src = 'http://thecatapi.com/api/images/get?/formats=src&type=gif&size=small';
    div.appendChild(image);

}

//Rock Paper scissors
function rps(yourChoice) {
    let humanChoice, botChoice;
    humanChoice = yourChoice.id;
    botChoice = numberToChoice(randToRpsInt());
    console.log('bot choice :', botChoice)
    results = decideWinner(humanChoice, botChoice);
    message = finalMessage(results)
    rpsFrontEnd(humanChoice, botChoice, message);


}
function randToRpsInt() {

    return Math.floor(Math.random() * 3);

}

function numberToChoice(number) {
    return ['rock', 'paper', 'scissors'][number]
}

function decideWinner(yourChoice, ComputerChoice) {
    let rpsDatabase = {
        'rock': { 'scissors': 1, 'rock': 0.5, 'paper': 0 },
        'paper': { 'scissors': 0, 'rock': 1, 'paper': 0.5 },
        'scissors': { 'scissors': 0.5, 'rock': 0, 'paper': 1 },
    };

    let yourScore = rpsDatabase[yourChoice][ComputerChoice];
    let computerScore = rpsDatabase[ComputerChoice][yourChoice];

    return [yourScore, computerScore]
}

function finalMessage([yourScore, computerScore]) {
    if (yourScore === 0) {
        return { 'message': 'You lost', 'color': 'red', }
    }
    else if (yourScore === 0.5) {

        return { 'message': 'you tied', 'color': 'yellow' }
    }
    else {
        return { 'message': 'you won!', 'color': 'green' }
    }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, message) {
    let imagesDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src,
    }
    //removing all the images
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();



    let humanDiv = document.createElement('div');
    let botDiv = document.createElement('div');
    let messageDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src='" + imagesDatabase[humanImageChoice] + "' width =150px height = 150px style='box-shadow: 0px 10px 50px rgba(37,50,233,1) '> "
    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    let result = finalMessage(results)
    messageDiv.innerHTML = "<h1 style ='color:" + result['color'] + "; font-size:60px; padding:30px ;'>" + result['message'] + "</h1>";
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);

    botDiv.innerHTML = "<img src='" + imagesDatabase[botImageChoice] + "' width =150px height = 150px style='box-shadow: 0px 10px 50px rgba(255,0,0,1) '> "
    document.getElementById('flex-box-rps-div').appendChild(botDiv);

}

//change the colour of all the buttons
let all_buttons = document.getElementsByTagName('button');
let copy_all_buttons = []
for (let i = 0; i < all_buttons.length; i++) {
    copy_all_buttons.push(all_buttons[i].classList[1]);
}

function buttonColorChange(btnChoice) {

    if (btnChoice.value === 'red') {
        buttonRed()
        console.log('Changing to red');
    }

    else if (btnChoice.value === 'green') {
        buttonGreen()
    }
    else if (btnChoice.value === 'reset') {
        buttonReset()
    }
    else if (btnChoice.value === 'random') {
        randomBtnColour()
    }
}


function buttonRed() {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }
}

function buttonGreen() {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }
}

function buttonReset() {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copy_all_buttons[i]);
    }
}

function randomBtnColour() {
    let choice = ['btn-danger', 'btn-success', 'btn-warning', 'btn-primary']

    for (let i = 0; i < all_buttons.length; i++) {
        let randChoice = Math.floor(Math.random() * 4)
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choice[randChoice]);
    }
}
//blackjack
let blackjackGame = {
    'you': { 'scoreSpan': '#your-black-jack-results', 'div': '#your-box', 'score': 0 },
    'dealer': {'scoreSpan': '#dealer-black-jack-results', 'div': '#dealer-box', 'score': 0},
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Q', 'J', 'A', 'K'],
    'cardsMap': { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'Q': 10, 'J': 10, 'A': [11, 1], 'K': 10 },
    'wins':0,
    'losses':0,
    'draws':0,
    'isStand':false,
    'turnsOver':false,
}
const You = blackjackGame['you'];
const Dealer = blackjackGame['dealer'];
const HitSound = new Audio('static/sounds/swish.m4a');
const winSound = new Audio('static/sounds/cash.mp3');
const lossSound = new Audio('static/sounds/aww.mp3');

document.querySelector('#black-jack-hitButton').addEventListener('click', blackJackHit);
document.querySelector('#black-jack-dealButton').addEventListener('click', blackJackDeal);
document.querySelector('#black-jack-standButton').addEventListener('click',blackJackStand);

function blackJackHit() {
    if(blackjackGame['isStand'] === false){
    let card = randomCard()
    showCard(card, You);
    IcreamentScore(card, You)
    showScore(You)
}
}

function randomCard() {
    let randomIndex = Math.floor(Math.random() * 13)
    return blackjackGame['cards'][randomIndex]
}

function showCard(card, activePlayer) {
    if(activePlayer['score'] <= 21){
    let cardImage = document.createElement('img');
    cardImage.src = `static/images/${card}.png`;
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    HitSound.play();
}
}
function blackJackDeal() {
    if(blackjackGame['turnsOver']===true){
        blackjackGame['isStand'] = false
        let yourImage = document.querySelector('#your-box').querySelectorAll('img');
        let dealerImage = document.querySelector('#dealer-box').querySelectorAll('img');
        console.log(dealerImage)
        for (let i = 0; i < yourImage.length; i++) {
            yourImage[i].remove();
        }
        for (let i = 0; i < dealerImage.length; i++) {
            dealerImage[i].remove();
        }
        console.log("You['score']: ", You['score']);
        console.log("Dealer['score']: ", Dealer['score']);
    

        You['score'] = 0;
        Dealer['score'] = 0;

        document.querySelector('#your-black-jack-results').textContent = 0;
        document.querySelector('#dealer-black-jack-results').textContent = 0;

        document.querySelector('#your-black-jack-results').style.color='#ffffff';
        document.querySelector('#dealer-black-jack-results').style.color='#ffffff'
        document.querySelector('#blackjack-results').textContent = 'Lets Play'
        document.querySelector('#blackjack-results').style.color = 'black'
        blackjackGame['turnsOver'] = true
    }
}
function IcreamentScore(card, activePlayer) {
    if (card === 'A') {
        // Check if adding 11 would not bust the player
        if (activePlayer['score'] + blackjackGame['cardsMap'][card][0] <= 21) {
            activePlayer['score'] += blackjackGame['cardsMap'][card][0];
        } else {
            // If adding 11 would bust, add 1
            activePlayer['score'] += blackjackGame['cardsMap'][card][1];
        }
    } else {
        activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
}


function showScore(activePlayer) {
    
    if(activePlayer['score']>21){
        document.querySelector(activePlayer['scoreSpan']).textContent='BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color ='red';
    }else
    {
    document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
}
}
function sleep(ms){
    return new Promise(resolve => setTimeout(resolve,ms));
}
async function blackJackStand(){
    blackjackGame['isStand'] = true;

    while(Dealer['score']<16 && blackjackGame['isStand']===true){

    let card = randomCard()
    showCard(card, Dealer);
    IcreamentScore(card, Dealer)
    showScore(Dealer)
    await sleep(1000)
}

    blackjackGame['turnsOver']=true
    let winner = computeWinner()
    showWinner(winner)
}

//Compute the winner and return the rusults
function computeWinner(){
    let winner;

    if(You['score'] <= 21){
        if(You['score'] > Dealer['score'] || (Dealer['score']>21)){
            blackjackGame['wins']++;
            winner=You;

        }else if(You['score'] < Dealer['score']){
            blackjackGame['losses']++;
        winner= Dealer;

      } else if(You['score'] === Dealer['score']){
        blackjackGame['draws']++;
      }
      
    } else if(You['score']>21 && Dealer['score']<=21){
        blackjackGame['losses']++;
       winner = Dealer;
      }
      else if(You['score']> 21 && Dealer['score']>21){
        blackjackGame['draws']++;
      }
      console.log('winner is :',winner)
      return winner;
    }
   
function showWinner(winner){
    let message,messageColor;
    if(blackjackGame['turnsOver'] === true){
        if(winner === You){
            document.querySelector('#wins').textContent= blackjackGame['wins']
            message = 'You won';
            messageColor = 'green';
            winSound.play();
        }else if(winner === Dealer){
            document.querySelector('#losses').textContent= blackjackGame['losses']
            message = 'You lost!'
            messageColor = 'red'
            lossSound.play();
        }else{
            document.querySelector('#draws').textContent= blackjackGame['draws']
            message = 'you drew'
            messageColor = 'yellow'
        }
        document.querySelector('#blackjack-results').textContent= message;
        document.querySelector('#blackjack-results').style.color=messageColor;
    }
}

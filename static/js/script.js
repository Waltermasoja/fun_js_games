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
function rps(yourChoice){
    let humanChoice,botChoice;
    humanChoice = yourChoice.id;
    botChoice = numberToChoice(randToRpsInt());
    console.log('bot choice :',botChoice)
    results = decideWinner(humanChoice,botChoice);
    message = finalMessage(results)
    rpsFrontEnd(humanChoice,botChoice,message);
    console.log(humanChoice);
    console.log(results);
    console.log(message)

}
function randToRpsInt(){

   return Math.floor(Math.random()*3);
    
}

function numberToChoice(number){
    return ['rock','paper','scissors'][number]
}

function decideWinner(yourChoice,ComputerChoice){
   let rpsDatabase = { 'rock':{'scissors':1,'rock':0.5,'paper':0},
                     'paper':{'scissors':0,'rock':1,'paper':0.5},
                     'scissors':{'scissors':0.5,'rock':0,'paper':1}, };

    let yourScore = rpsDatabase[yourChoice][ComputerChoice] ;
    let computerScore = rpsDatabase[ComputerChoice][yourChoice] ;

    return [yourScore ,computerScore]                
}

function finalMessage([yourScore,computerScore]){
    if (yourScore === 0){ 
        return {'message':'You lost','colour':'red',}
    }
    else if (yourScore === 0.5){

        return {message:'you tied','colour':'yellow'}
    }
    else{
        return {'message':'you won','colour':'green'}}
}

function rpsFrontEnd(humanImageChoice,botImageChoice,message){
    let imagesDatabase = {
        'rock':document.getElementById('rock').src,
        'paper':document.getElementById('paper').src,
        'scissors':document.getElementById('scissors').src,
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
}
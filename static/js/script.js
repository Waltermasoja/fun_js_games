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
        return {'message':'You lost','color':'red',}
    }
    else if (yourScore === 0.5){

        return {'message':'you tied','color':'yellow'}
    }
    else{
        return {'message':'you won!','color':'green'}}
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
     let result = finalMessage(results)
     messageDiv.innerHTML = "<h1 style ='color:"+ result['color'] +"; font-size:60px; padding:30px ;'>" + result['message'] + "</h1>";
     document.getElementById('flex-box-rps-div').appendChild(messageDiv);

     botDiv.innerHTML = "<img src='" + imagesDatabase[botImageChoice] + "' width =150px height = 150px style='box-shadow: 0px 10px 50px rgba(255,0,0,1) '> "
     document.getElementById('flex-box-rps-div').appendChild(botDiv);
    
    }    

    //change the colour of all the buttons
    let all_buttons = document.getElementsByTagName('button');
    let copy_all_buttons = []
    for(let i = 0; i < all_buttons.length;i++){
         copy_all_buttons.push(all_buttons[i].classList[1]);
    }

    function buttonColorChange(btnChoice){

      if(btnChoice.value === 'red'){buttonRed()
        console.log('Changing to red');
    }
    
      else if(btnChoice.value === 'green'){buttonGreen()
      }
      else if(btnChoice.value === 'reset'){buttonReset()
      }
      else if(btnChoice.value === 'random'){randomBtnColour()
      }
    }

    
    function buttonRed() {
        for(let i=0; i < all_buttons.length; i++) {
            all_buttons[i].classList.remove(all_buttons[i].classList[1]);
            all_buttons[i].classList.add('btn-danger');
        }
    }

    function buttonGreen() {
        for(let i=0; i < all_buttons.length; i++) {
            all_buttons[i].classList.remove(all_buttons[i].classList[1]);
            all_buttons[i].classList.add('btn-success');
        }
    }

    function buttonReset() {
        for(let i=0; i < all_buttons.length; i++) {
            all_buttons[i].classList.remove(all_buttons[i].classList[1]);
            all_buttons[i].classList.add(copy_all_buttons[i]);
        }
    }
    
    function randomBtnColour(){
        let choice = ['btn-danger','btn-success','btn-warning','btn-primary']

        for(let i=0; i < all_buttons.length; i++) {
            let randChoice = Math.floor(Math.random()*4)
            all_buttons[i].classList.remove(all_buttons[i].classList[1]);
            all_buttons[i].classList.add(choice[randChoice]);
        }  
    }
    
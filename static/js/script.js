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
    console.log(yourChoice)
    // let humanChoice,botChoice;
    // humanChoice = yourChoice.id;
    // results = decideWinner(humanhoice,botChoice)
    //message = finalMessage(results)
    rpsFrontEnd(humanChoice,botChoice,message)

}
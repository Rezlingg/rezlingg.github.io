const cards = document.querySelectorAll(".card");

let cardOne, cardTwo;
let freezeCards = false;
let matchedCards = 0;

function flipCard(e){

    if(freezeCards == true){
        return;
    }

    let clickedCard = e.target;

    if((clickedCard !== cardOne) && (cardOne != undefined)){
        cardTwo = clickedCard;
        clickedCard.classList.add("flip");

        freezeCards = true;
        
        let cardOneImg = cardOne.querySelector("img").src;
        let cardTwoImg = cardTwo.querySelector("img").src;

        setTimeout(()=> {
            if(cardOneImg !== cardTwoImg){
            cardOne.classList.remove("flip");
            cardTwo.classList.remove("flip");
            }

            else{

                matchedCards++;
            
                /*
                cardOne.classList.add("matched");
                cardTwo.classList.add("matched");   
                */  
                cardOne.removeEventListener("click", flipCard);
                cardTwo.removeEventListener("click", flipCard);

                if(matchedCards == 8){

                    setTimeout(()=> {
                    resetCards();
                    }, 1);
                }
         
            }

            cardOne = undefined;
            cardTwo = undefined;      
            freezeCards = false;
            
            
        }, 500);
        
        return;    
    }
        
        cardOne = clickedCard;
        clickedCard.classList.add("flip");
}

function resetCards(){

    matchedCards = 0;
    cardOne = cardTwo = undefined;

    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1); 

    cards.forEach((card, index)=> {
        card.classList.remove("flip");
        let imgTag = card.querySelector("img");
        imgTag.src = `images/image-${arr[index]}.png`; 

        card.addEventListener("click", flipCard);
    });

    freezeCards = false;
    
}

resetCards();

cards.forEach(card=> {
    card.addEventListener("click", flipCard);
});


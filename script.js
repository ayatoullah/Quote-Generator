let quoteContainer=document.getElementById('quote-container');
let quoteText=document.getElementById('quote');
let quoteAuthor=document.getElementById('quote-author');
let newQuoteBtn=document.getElementById('new-quote');
let twitterBtn=document.getElementById('twitter');
let loader=document.getElementById('loader');
let apiQuotes=[];


function newQuote(){
    loading();
    let randomQuote=apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
    console.log(randomQuote);
    if(!randomQuote.author){
        quoteAuthor.textContent='Unknown';
    } else {
        quoteAuthor.textContent=randomQuote.author;
    }
    quoteText.textContent=randomQuote.text;
    complete();
}
async function getQuote(){
    loading();
    //const proxyUrl='https://cors-anywhere.herokuapp.com/';
    const apiUrl="https://type.fit/api/quotes";
    try{
        
        const response=await fetch(apiUrl);
        apiQuotes=await response.json();
        newQuote();

    }catch(error){
        return "whoops, error"+error;
    }

}

function tweetQuote(){
    const twitterUrl=`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
    window.open(twitterUrl,'_blank');
}

function loading(){
    quoteContainer.hidden=true;
    loader.hidden=false;
    
}

function complete(){
    loader.hidden=true;
    quoteContainer.hidden=false;
}
getQuote();

newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click',tweetQuote);

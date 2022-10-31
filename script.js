const quotebtn = document.querySelector(".quote-btn");

const quote_text = document.querySelector(".quote-text");

const quote_author = document.querySelector(".quote-author");
const body = document.querySelector("body");

const random_num = () => Math.floor(Math.random() * 256);

function randomizeColor() {
  let color = `rgb(${random_num()}, ${random_num()}, ${random_num()})`;
  body.style.backgroundColor = color;
  quote_text.style.color = color;
  quote_author.style.color = color;
  quotebtn.style.backgroundColor = color;
}

async function fetchQuote() {
  const response = await fetch("https://api.quotable.io/random");
  const data = await response.json();

  if (response.ok) {
    quote_text.textContent = data.content;
    quote_author.textContent = "- " + data.author;
  } else {
    quote_text.textContent = "Couldn't fetch the quote.";
  }

  
  randomizeColor();
}


fetchQuote();

quotebtn.addEventListener("click", fetchQuote);

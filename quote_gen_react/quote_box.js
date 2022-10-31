function randomizeColor() {
  const random_num = () => Math.floor(Math.random() * 256);
  const quotebtn = document.querySelector(".quote-btn");
  const quote_text = document.querySelector(".quote-text");
  const quote_author = document.querySelector(".quote-author");
  const body = document.querySelector("body");

  let color = `rgb(${random_num()}, ${random_num()}, ${random_num()})`;
  body.style.backgroundColor = color;
  quote_text.style.color = color;
  quote_author.style.color = color;
  quotebtn.style.backgroundColor = color;
}

function QuoteBox() {
  const [data, setData] = React.useState(null);

  async function fetchQuote() {
    try {
      const response = await fetch("https://api.quotable.io/random");
      const { statusCode, statusMessage, ...data } = await response.json();
      if (!response.ok) throw new Error(`${statusCode} ${statusMessage}`);
      setData(data);
    } catch (error) {
      console.error(error);
      setData({ content: "Couldn't fetch the quote." });
    }
    randomizeColor();
  }

  React.useEffect(() => {
    fetchQuote();
  }, []);

  if (!data) return null;

  return (
    <div className="quote-box">
      <div className="quote-text">{data.content}</div>
      <div className="quote-author">{data.author}</div>
      <div className="buttons">
        <button className="quote-btn" onClick={fetchQuote}>
          New Quote
        </button>
      </div>
    </div>
  );
}

const wrapper = document.querySelector(".wrapper");
const root = ReactDOM.createRoot(wrapper);
root.render(React.createElement(QuoteBox));

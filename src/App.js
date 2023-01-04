import React, { useState, useRef, useEffect } from "react";
import "./styles.css";

const API_KEY = "https://api.quotable.io/random?maxLength=150";

const App = () => {
  const [quote, setQuote] = useState(undefined);
  const quoteTextRef = useRef(null);
  const quoteAuthorRef = useRef(null);

  const getRandomColor = () => {
    const randomNum = Math.floor(Math.random() * 256);
    return `hsl(${randomNum}, 70%, 36%)`;
  };

  const getNewQuote = React.useCallback(async () => {
    const { content, author } = await (await fetch(API_KEY)).json();
    const quoteText = quoteTextRef.current;
    const quoteAuthor = quoteAuthorRef.current;
    quoteText.style.opacity = "0";
    quoteAuthor.style.opacity = "0";
    setTimeout(() => {
      setQuote({ content, author });
    }, 1000);
    const newColor = getRandomColor();
    document.body.style.setProperty("--main-color", newColor);
    setTimeout(() => {
      quoteText.style.opacity = "1";
      quoteAuthor.style.opacity = "1";
    }, 1000);
  }, []);

  useEffect(() => {
    getNewQuote();
  }, [getNewQuote]);

  return (
    <div id="quote-box">
      <div className="content">
        <span ref={quoteTextRef} id="text">
          {quote && quote.content}
        </span>
        <p ref={quoteAuthorRef} id="author">
          {quote && quote.author}
        </p>
      </div>
      <div className="btns">
        <a
          id="tweet-quote"
          title="Tweet this quote!"
          target="_top"
          href="https://twitter.com/intent/tweet"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
          </svg>
        </a>
        <button onClick={getNewQuote} id="new-quote">
          New quote
        </button>
      </div>
    </div>
  );
};

export default App;

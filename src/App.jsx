import { useState, useEffect, Fragment } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState([])
  const [quote, setQuote] = useState({
    quote: "The only thing have to fear is fear itself",
    author: "Franklin D. Roosevelt"
  })
  const [color, setColor] = useState("blue")

  const colorPalette = [
    "#605F5E",
    "#1D3461",
    "#FB3640",
    "#1F487E",
    "#247BA0",
    "#7B9E89",
    "#0E1428",
    "#D95D39",
    "#F18805",
    "#F0A202",
  ]

  function changeColor(coloor) {
    document.getElementById("root").style.backgroundColor = coloor
    setColor(coloor)
  }

  useEffect( () => {
    async function getQuoteData() {
      const res = await fetch("https://api.api-ninjas.com/v1/quotes?limit=10", {
        method: 'GET',
        headers: {'X-Api-Key': "Fm/mRiSE76NGI094oA6y9w==tdRbwRQUCO8ujvlz"}
      })
      const data = await res.json()
      setData(data)
    }
    getQuoteData()
    }, [])

  function getQuote() {
    const randomNumber = Math.floor(Math.random() * data.length)
    const quote = data[randomNumber].quote
    const author = data[randomNumber].author
    setQuote({
      "quote": quote,
      "author": author
    })
    changeColor(colorPalette[randomNumber])
  }

  return (
    <div className="card w-75 p-4" style={{maxWidth: "600px",}}>
      <div className="card-body">
        <blockquote className="blockquote">
          <p style={{color: color}}><i className="fa-solid fa-quote-left me-2"></i>{quote.quote}</p>
          <footer style={{color: color}} className="blockquote-footer">{quote.author}</footer>
        </blockquote>
        <div className="row align-items-center">
          <a className="col-3 col-8" target="_blank" href={`https://twitter.com/intent/tweet?text=${'"' + quote.quote + '"' + ' ~' + quote.author}`}><i style={{color: color}} className="fa-brands fa-square-twitter"></i></a>
          <button style={{color: color}} onClick={getQuote}id="new-quote" className="col align-self-end">New Quote</button>
        </div>
      </div>
    </div>
  )
}

export default App

import './App.css';
import { useEffect, useState } from 'react';
import logo from './watermelon.png';
import edamam from './edamam.png';

import MyRecipesComponent from './MyRecipesComponent';

<script src="https://developer.edamam.com/attribution/badge.js"></script>

function App() {

  const MY_ID = "7b01ec46";
  const MY_KEY = "b6fa9d22e446ba8db20c595a4e51a990";
  const query = "watermelon";
  const nextPageBtn = document.querySelector('#nextPageBtn');
  const input = document.querySelector('.searchinput');

  const [mySearch, setMySearch] = useState("");
  const [myRecipes, setMyRecipes] = useState([]);
  const [next, setNext] = useState([]);
  const [wordSubmitted, setWordSubmitted] = useState(query);

   useEffect (  () => {

    async function fetchData() {

    const responce = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${wordSubmitted}&app_id=${MY_ID}&app_key=${MY_KEY}`);
    const data = await responce.json();
  //  console.log(data.hits);
    setMyRecipes(data.hits);
    

    const newResponce = await fetch(data._links.next.href);
    const newData = await newResponce.json();
   // console.log(newData.hits);
    setNext(newData.hits);

  }
  fetchData();
    }, [wordSubmitted] )

  const myRecipeSearch = (e)=> {
   // console.log(e.target.value);
    setMySearch(e.target.value);
    
  }

  const finalSearch = (e)=> {
    e.preventDefault();
    setWordSubmitted(mySearch);
    nextPageBtn.innerHTML = "Page 2";
    window.scrollTo(0 ,0);
  }

  const nextPage = (e)=> {
    
    e.preventDefault();
   // console.log(next);
    setMyRecipes(next);
    nextPageBtn.innerHTML = "New Search";
    input.value = "";
    window.scrollTo(0 ,0);
  }

 
  return (
    <div className="App">
      
    <img src={logo} className="logo" alt='logo'/>
    
        <h1>Search & cook</h1>

        <form onSubmit={ finalSearch }>

          <button className='btnicon' >
          <svg className='searchicon'  onClick={ finalSearch } xmlns="http://www.w3.org/2000/svg"  fill="currentColor" viewBox="0 0 16 16">
              <path d="M6.5 13a6.474 6.474 0 0 0 3.845-1.258h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.008 1.008 0 0 0-.115-.1A6.471 6.471 0 0 0 13 6.5 6.502 6.502 0 0 0 6.5 0a6.5 6.5 0 1 0 0 13Zm0-8.518c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.69 0-5.018Z"/>
            </svg>
          </button>
            
          <input className='searchinput' placeholder='Search...' onChange={ myRecipeSearch } value={ mySearch } />
        
        </form>
        
          
      
          <div className="container" > 
      
      { myRecipes.map( (element, index) => (

        <MyRecipesComponent 
        key={ index }
        label={element.recipe.label} 
        calories={element.recipe.calories} 
        weight={element.recipe.totalWeight} 
        image={element.recipe.image}
        ingredients={element.recipe.ingredientLines}
        like = {element.recipe.yield}
        
        />
      )
      )} 

<br/> <br/>

<button id='nextPageBtn'  onClick={ nextPage } > Page 2 </button>

<br/>

    </div>

        <a className='footer line' href='https://lunacode.fr/' target="_blank" rel="noreferrer">
          Developed with love by Elena GRONDIN
        </a>

        <a  href='https://www.edamam.com/' target="_blank" rel="noreferrer">
          
          <img className='edamam' src={ edamam } alt="logo" />
          
        </a>

<br/>
        



    </div>
  );
}

export default App;

import './App.scss';
import axios from 'axios';
import React, {useState, useEffect} from 'react';


const App = () => {


   const [query, setQuery] =useState('')
   const [container, setContainer] = useState([])
   const [endPoint, setEndpoint] = useState('')

   useEffect(()=> {
  const options = {
 method: 'GET',
 headers: {
   'X-RapidAPI-Host': 'edamam-food-and-grocery-database.p.rapidapi.com',
   'X-RapidAPI-Key': '7116eb20b0mshc8e8392f35e8610p13a5dejsnad8d58afea5c'
 }
};

fetch(`https://edamam-food-and-grocery-database.p.rapidapi.com/parser?ingr=+${query}`, options)
 .then(response => response.json())
 .then(response => setContainer(response.hints))
 .catch(err => console.error(err));
}, [query])


 const onChangeHandler = (e) => {
   setQuery(e.target.value)
 }

 const onSubmitHandler = (e) => {
   e.preventDefault();
   setEndpoint(query)
 }

  return (
    <div className="App">
       <form onSubmit={onSubmitHandler} className="search">
         <input type="text" value={query} onChange={onChangeHandler} className="search-box"/>
         <button type='Submit'> submit</button>
       </form>
       <div className="foods">
       {container.map((item)=> {
          const image = item.food.image
         return (

           <div key ={item.food.foodId} className='category-container'>
       <div
         className='background-image'
         style={{
           backgroundImage: `url(${image})`,
         }
         }
       />
       <div className='category-body-container'>
         <h2>{item.food.label}</h2>
         <p>Shop Now</p>
       </div>
     </div>

         )
       })}
       </div>
    </div>
  );
}

export default App;

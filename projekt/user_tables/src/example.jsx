import React, { useState, useCallback, useEffect } from 'react'
import Card from './Card'
import update from 'immutability-helper'
const style = {
  width: 400,
  margin: "40px auto",
}

const initialState = {
  name: '',
  lastName: '',
  email: '',
  nat: '',
  postCode: '',
  city: '',
}


const Container = () => {
  
  const [cards, setCards] = useState([]);
   
      async function fetchData(){
      const resp = await fetch("http://localhost:3001/results")
      const data = await resp.json();
      setCards(data.results);
    }

    async function postData(url, data) {
      const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) 
    });
  return await response; 
}

  useEffect(() =>{


    fetchData()    
  }, []);

    const moveCard = useCallback(
      (dragIndex, hoverIndex) => {
        const dragCard = cards[dragIndex]
        setCards(
          update(cards, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, dragCard],
            ],
          }),
        )
      },
      [cards],
    )

    const handleDeleteUser = (index) =>{
      let results = [...cards];
      results.splice(index, 1);
      setCards(results);
       postData("http://localhost:3001/results", {results})
          .then((data) => console.log(data));
     
    }

    //changing user details
    const onSubmitUser = (num) =>{
      let results = [...cards]
      results.map((card, i) =>{
        if(i === num){ //wiem, że tutaj powinienem użyc prawdopodobnie useReducer, ale nie ciężko mi było załapać jak go tu wkleić :( 
         initialState.name !== '' ? results[i].name.first = initialState.name : console.log("name has not changed");
         initialState.lastName !== '' ? results[i].name.last = initialState.lastName :console.log("last name has not changed");
         initialState.email !== '' ? results[i].email = initialState.email : console.log("email has not changed");
         initialState.nat !== '' ? results[i].nat = initialState.nat: console.log("nationality has not changed");
         initialState.postCode !== '' ? results[i].location.postcode = initialState.postCode : console.log("post code has not changed");
         initialState.city !== '' ? results[i].location.city = initialState.city : console.log("city has not changed");
          initialState.name = '';
          initialState.lastName = '';
          initialState.email = '';
          initialState.nat = '';
          initialState.postCode = '';
          initialState.city = '';
          postData("http://localhost:3001/results", {results})
          .then((data) => console.log(data));
        }
        
       return setCards(results);
       
      });
    }


    //handling input from modal
    const onNameChange = (e) => initialState.name = e.target.value;
    const onLastChange = (e) => initialState.lastName = e.target.value;
    const onEmailChange = (e) => initialState.email = e.target.value;
    const onNatChange = (e) => initialState.nat = e.target.value;
    const onPostChange = (e) => initialState.postCode = e.target.value;
    const onCityChange = (e) => initialState.city = e.target.value;



    const renderCard = (card, index) => {
      return(
        <Card
          key={card.location.postcode}
          index={index}
          id={card[index]}
          text={`${card.name.first} ${card.name.last}`}
          card ={card}
          moveCard={moveCard}
          onDeleteUser={handleDeleteUser}
          editName = {onNameChange}
          editLast = {onLastChange}
          editEmail = {onEmailChange}
          editNat = {onNatChange}
          editPost = {onPostChange}
          editCity = {onCityChange}
          onSubmitUser = {onSubmitUser}
        />
      )
    }
    return !cards.length ?
      <div>
      <h1>Refresh the page please :)</h1>
      </div> :   (
        <div style={style}>
        {cards.map((card, i) => renderCard(card, i))}
        </div>
    )
}
export default Container

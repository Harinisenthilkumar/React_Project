import React, { useEffect, useState } from 'react'
import './NewItems.css'
import Item from '../Item/Item'
// import new_items from '../Assets/new_items'
const NewItems = () => {
const [new_collection,setNew_collection] = useState([])
useEffect(() => {
  fetch(" http://localhost:4000/newcollections")
  .then((response) => response.json())
  .then((data) => setNew_collection(data));
},[])

  return (
    <div className="new-items">
      <h1>Varities</h1>
      <hr />
      <div className="items">
        {new_collection.map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </div>
  );
}

export default NewItems

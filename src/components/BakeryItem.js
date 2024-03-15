// TODO: create a component that displays a single bakery item
import React from 'react'

function BakeryItem(props) {
  return (
    <>
        <div className="card">
            <img src={props.item.image} className="card-image" alt="card image"/>
            <h2>{props.item.name}</h2>
            <p>{props.item.description}</p>
            <p>Price: {props.item.price}</p>
            <button className="button" onClick={() => props.addToCart(props.item)}>Add to Cart</button>
        </div>
    </>  )
}

export default BakeryItem;


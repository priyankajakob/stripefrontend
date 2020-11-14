import React,{useState} from 'react'
import './App.css'
import StripeCheckout from "react-stripe-checkout"

function App() {

    const [product,setProduct] = useState({
      name:"React from FB",
      price :10,
      productBy: "facebook"
    })

    const makePayment = (token)=>{
      const body = {
        token,
        product
      }

      const headers = {
        "Content-type":"applications/json"
      }

      return fetch(`https://localhost:8282/payment`,{
        method : "POST",
        headers,
        body : JSON.stringify(body)
      })
      .then(response=>{
        console.log(response.json())
        const {status}=response
        console.log(status)
      })
      .catch(error=>{
        console.log(error)
      })
    }

  return (
    <div className="App">
      <p>
      <StripeCheckout 
        stripekey={process.env.REACT_APP_KEY} 
        token={makePayment} 
        name="Buy React"
        amount={product.price*100}
        shippingAddress
        billingAddress
        >

        <button>Buy React in just $ {product.price}</button>
        </StripeCheckout>
      </p>
        
    </div>
  );
}

export default App;

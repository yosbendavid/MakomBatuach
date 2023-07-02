import React, { useState, useEffect } from "react";
import "../../CSS/PHomePage.css"
import { useNavigate, useLocation } from "react-router-dom";



const Article = () => {


  const navigate = useNavigate();
  const { state } = useLocation();
  const [email, setEmail] = useState('')

  useEffect(() => {
    const email = state;
    console.log(email)
    setEmail(email)
  })

  return (
    <div>
        <p>hey rom</p>
        <p>{email}</p>
    
    </div>
  );
}
export default Article;


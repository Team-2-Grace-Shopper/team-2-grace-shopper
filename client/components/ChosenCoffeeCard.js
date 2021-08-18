import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StarRatings from "react-star-ratings";
import Carousel from './Carousel';

//useState-> function, pass in arg as a default value. Will use default value to create state for this compondent and will return an array with 2 times. 1st- value, 2nd setState function exclusively for that value

const ChosenCoffeeCard = ({ chosenCoffee }) => {
    const [count, setCount] = useState(1);
    //functions to make buttons work
    // let currPhotoNum = 1 //default

    // function currPhoto (num) {
    //     carousel(currPhotoNum = num)
    // }

    // function nextSlide(num) {
    //     carousel(slidePosition += num)
    // }


    // function carousel(num) {
    //     let photos = [chosenCoffee.imageUrl1, chosenCoffee.imageUrl2, chosenCoffee.imageUrl3]
    //     if (num > photos.length) {
    //         currPhotoNum = 1
    //     }
    //     else if (num < 1) {
    //         currPhotoNum = photos.length
    //     }
    // }

    return (
        <div key= { chosenCoffee.id }>
            <div className= 'singleItem'>
                <div className= 'chosenCoffeeInfo' key={chosenCoffee.id}>
                    <span>
                        <StarRatings
                            rating={chosenCoffee.rating * 1}
                            starRatedColor="gold"
                            numberOfStars={5}
                            name="rating"
                            starDimension="15px"
                            starSpacing="0px"
                        />
                    </span>
                    <Carousel chosenCoffee={chosenCoffee} key={chosenCoffee.id}/>
                    {/* <img src={chosenCoffee.imageUrl1} /> */}
                    <h1>{ chosenCoffee.name }</h1>
                    <p>{ chosenCoffee.description }</p>
                    <p>{ chosenCoffee.weight }oz</p>
                </div>
                
                <div>
                    <p>${ chosenCoffee.price }</p>
                    <button>ADD TO CART</button>
                </div>
                
            </div>
            
            <ul>
                <button onClick={() => count > 0 && setCount(count - 1)}>-</button>
                <li>{count}</li>
                <button onClick={() => setCount(count + 1)}>+</button>
            </ul>
            <p>${ chosenCoffee.price }</p>
            <button className={count > 0 ? "cta" : "ctadisabled"}>ADD TO CART</button>
        </div>
    )
}

export default ChosenCoffeeCard

//to do the add to cart you'll have to connect it

/*

<div id='photoCarousel'>
                    <div className='photoContainer'>
                        <div className='imageNum'>
                            <p> 1/3 </p>
                        </div>
                        <img src={chosenCoffee.imageUrl1}/>
                    </div>

                    <div className='photoContainer'>
                        <div className='imageNum'>
                            <p> 2/3 </p>
                        </div>
                        <img src={chosenCoffee.imageUrl2}/>
                    </div>

                    <div className='photoContainer'>
                        <div className='imageNum'>
                            <p> 3/3 </p>
                        </div>
                        <img src={chosenCoffee.imageUrl3}/>
                    </div>

                    {/* <a className="Back" onClick={plusSlides(-1)}>&#10094;</a>
                    <a className="forward" onClick={plusSlides(1)}>&#10095;</a>
                     *///}
                     /*
                </div>
                <div>
                    <span className="dots" onClick={currPhoto(1)}></span>
                    <span className="dots" onClick={currPhoto(2)}></span>
                    <span className="dots" onClick={currPhoto(3)}></span>
                </div> 
*/
import React, { useState } from 'react'
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';


const Carousel = ({ chosenCoffee }) => {
    const images = [chosenCoffee.imageUrl2, chosenCoffee.imageUrl1, chosenCoffee.imageUrl3];
    const [current, setCurrent] = useState(0);
    const length = images.length;

    const nextImage = () => {
        setCurrent(current === length - 1 ? 0 : current + 1)
        console.log('HELLO', images[current])
    }

    const previousImage = () => {
        setCurrent(current === 0 ? length - 1 : current - 1)
    }

    if(!Array.isArray(images) || images.length <= 0) {
        return null;
    }

    return (
        <section className='slides'>
            <FaArrowAltCircleLeft className='left-arrow' onClick= {previousImage}/>
            <FaArrowAltCircleRight className='right-arrow' onClick= {nextImage}/>
            
            {images.map((image, index) => {
                return (
                    <div className={index === current ? 'image active' : 'image'} key= {index}>
                        {index === current && (<img src={image} alt="travel image" className='image'/>)}
                    </div>
                )
            })}
        </section>
    )
}

export default Carousel;
import React, { useState } from 'react'
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';


const AccessoryCarousel = ({ chosenAccessory }) => {
    const images = [chosenAccessory.imageUrl1, chosenAccessory.imageUrl2, chosenAccessory.imageUrl3];
    const [current, setCurrent] = useState(0);
    const length = images.length;

    const nextImage = () => {
        setCurrent(current === length - 1 ? 0 : current + 1)
        //console.log('HELLO', images[current])
    }

    const previousImage = () => {
        setCurrent(current === 0 ? length - 1 : current - 1)
    }

    if(!Array.isArray(images) || images.length <= 0) {
        return null;
    }

    return (
        <section className='slides'>
            <FaArrowAltCircleLeft className='left-arrow' onClick= {previousImage} />
            <FaArrowAltCircleRight className='right-arrow' onClick= {nextImage} />
            
            {images.map((image, index) => {
                return (
                    <div className={index === current ? 'imageActive' : 'image'} key= {index}>
                        {index === current && (<img src={image} alt="coffee image" className='image' />)}
                    </div>
                )
            })}
        </section>
    )
}

export default AccessoryCarousel;
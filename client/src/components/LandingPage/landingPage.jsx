import React, {useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import s from './landingPage.module.css';
import Nav from '../Nav/nav';
import image from '../../map.png'


const LandingPage= () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        
    },[])

    return (

        <div class={s.body}>
            <Nav/>
            <div class={s.container}>
                <div class={s.info}>
                    <h1>Descubre y Explora países de todo el mundo</h1>
                    <p>
                    En esta página encontraras todos los países del mundo con su información y las actividades turísticas en las que puedes
                    aventurarte.
                    </p>
                    <br/>
                    <Link to='/home'>
                        <button class={s.startButtom}>
                            Comencemos
                            {/* <img src={arrow} alt='arrow-img'/> */}
                        </button>
                    </Link>
                </div>
                <div class={s.earth}>
                    <img src={image}/>
                    
                </div>
            </div>
        </div>
        
    )
}

export default LandingPage;

import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getCountryId } from '../../redux/actions/countries';
import { useDispatch, useSelector } from 'react-redux';
import s from './detailsCountry.module.css';
import { useState } from 'react';
import Nav from '../Nav/nav';

function DetailsCountry () {
    const [activities, setActivities] = useState([]);
    const dispatch = useDispatch();
    const country = useSelector((state) => state.country);
    let { id } = useParams();

    useEffect(() => {
        dispatch(getCountryId(id));
    }, []);

    function separator(numb) {
        var str = numb.toString().split(".");
        str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return str.join(".");
    }

    return (
        <div>
            <Nav/>
            <div>
                <div class={s.card}>
            
                    <div class={s.card__cover}>
                        <img src={country.image}/>
                    </div>

            
                    <div class={s.card__content}>
                        <h1>{country.name}</h1>
                        
                        <ul>
                            <li><h4>Codigo del pais:</h4></li>
                            <li ><p>{country.id}</p></li>
                        </ul>

                        <ul>
                            <li><h4>Capital:</h4></li>
                            <li><p>{country.capital}</p></li>
                        </ul>

                        <ul>
                            <li><h4>Continente:</h4></li>
                            <li><p>{country.continent}</p></li>
                        </ul>

                        <ul>
                            <li><h4>Area:</h4></li>
                            <li><p>{country.area}</p></li>
                        </ul>

                        <ul>
                            <li><h4>Population:</h4></li>
                            {country.population ? (
                            <li><p> {separator(country.population)}</p></li>) : (<p></p>)}
                        </ul>
                        
                                        
                    </div>
                    </div>
                    

                    <div class={s.card}>
                        <h3>Actividades:</h3>
                        <div>
                        {country.activities && country.activities.length > 0 ? (
                            country.activities.map((a) => {
                            return (
                                <div >
                                    <br/>
                                    <p>
                                        <span>Actividad: </span>
                                        {a.name}
                                    </p>
                                    <p>
                                        <span>Dificultad: </span>
                                        {a.difficulty}
                                    </p>
                                    <p>
                                        <span>Duración: </span>
                                        {a.duration}
                                    </p>
                                    <p>
                                        <span>Temporada: </span>
                                        {a.season}
                                    </p>
                                </div>
                            );
                            })
                        ) : (
                            <h4>No hay actividades para este País</h4>
                        )}
                        </div>
                    </div>
            
                

                

            </div>
        </div>
    );
}

export default DetailsCountry;
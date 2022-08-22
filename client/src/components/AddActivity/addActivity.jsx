import React, {useState, useEffect } from 'react';
import { HelpGetCountries } from '../helper';
import {deleteCountry, postActivity} from "../../redux/actions/activities"
import { useDispatch } from 'react-redux';
import s from "./addActivity.module.css";
import Nav from '../Nav/nav';

function AddActivity() {
    const dispatch = useDispatch();

    const [countries, setCountries] = useState([]);
    const [searchCountry, setSearchCountry] = useState([]);
    const [activity, setActivity] = useState({
        name:"",
        difficulty:"",
        number:"",
        duration:"",
        season:""
    })
    


    useEffect(() => {
        const fetchCountries = async () => {
            HelpGetCountries('/countries').then((res) => {
                setCountries(res.data);
            });
        }

        fetchCountries();

    }, []);

    function handleChange(e) {
        setActivity(() => {
          return {
            ...activity,
            [e.target.name]: e.target.value,
          };
        });
      }

    function handleSubmit(e) {
        e.preventDefault();
        if(activity.name=="" || activity.difficulty=="" || activity.number=="" || activity.duration=='' || activity.duration== "Seleccione..." 
        || activity.season==""|| searchCountry.length==0){
            window.alert('COMPLETE TODOS LOS CAMPOS')
        }else{
            const addActivity = {
                name: activity.name,
                difficulty: activity.difficulty,
                duration: activity.number + " " + activity.duration,
                season: activity.season,
                countries: searchCountry
            }

            dispatch(postActivity(addActivity));
            window.alert("actividad agregada")
        }
    }
    
    const deleteCountry = (country) => {
        let countries = searchCountry.filter((c) => c !== country);
        setSearchCountry([...countries]);
    }

    const addCountry = () => {
        const select = document.getElementById('country');
        const text = select.options[select.selectedIndex].text;
        setSearchCountry([...searchCountry, text]);
    }



    return(
        <div>
            <Nav/>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Crear Actividad</legend>

                        <label>Nombre de actividad:</label>
                        <input type='text' name="name" value={activity.name} onChange={(e) => handleChange(e)}></input>
                            <br/>
                            <br/>   
                        <label>Estacion:</label>
                        <select name="season"value={activity.season} onChange={(e) => handleChange(e)}>
                        <option></option>
                            <option value='Verano'>Verano</option>
                            <option value='Invierno'>Invierno</option>
                            <option value='Otoño'>Otoño</option>
                            <option value='Primavera'>Primavera</option>
                        </select>  
                            <br/>
                            <br/>
                        <label>Duracion:</label>
                        <input type="number" name="number" min="1" max="1000" value={activity.number} onChange={(e) => handleChange(e)}/>
                        <select name="duration" value={activity.duration} onChange={(e) => handleChange(e)}>
                            <option>Seleccione...</option>
                            <option value='Dias'>Dias</option>
                            <option value='Horas'>Horas</option>
                            <option value='Minutos'>Minutos</option>
                        </select>
                            <br/>
                            <br/>
                        <label>Dificultad:</label>
                        <select name="difficulty" value={activity.difficulty} onChange={(e) => handleChange(e)}>
                            <option></option>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                        </select>  
                            <br/>
                            <br/>
                        <label>Paises:</label>
                        <select id='country'>
                            {countries.map((c) => {
                               return( <option>{c.name}</option>)
                            })}
                        </select>
                        <input type='button' value='+' onClick={addCountry}/>
                            <br/>
                            <br/>
                        <div id='countries-selected'>
                            {searchCountry.map((c) => {
                            return (
                                <div key={c}>
                                    <p>{c}</p>
                                    <input
                                        type="button"
                                        value="X"
                                        onClick={()=>deleteCountry(c)}
                                    />
                                </div>
                            );
                            })}
                         </div>
                         
                         <button type="submit">AGREGAR ACTIVIDAD</button>                       


                </fieldset>

            </form>
        </div>
    )
}

export default AddActivity;
import axios from 'axios';
import { useEffect, useState} from 'react';
import { connect, useDispatch } from 'react-redux';
import { COUNTRY_URL } from '../../constants';
import { getCountries } from '../../redux/actions/countries';
import { HelpGetCountries } from '../helper';
import './countries.css';

const CountryCards = ({countries, loading}) => {

    if(loading){
        return <h2>Loading...</h2>
    }

    return (
        <div class="body">
        <div class="container">
        {countries.map((c) => {
                return (
                    <div class="card">
                        <div class="face face1" style={{ backgroundImage: 'url(' + c.image + ')' }}>
                            <div class="content">
                            
                                <h3>{c.name}</h3>
                            </div>
                        </div>
                    
                        <div class="face face2" >
                            <div class="content">
                                <h4>{c.name}</h4>
                                <p>Capital: {c.capital}</p>
                                <p>Region: {c.region}</p>
                                <p>Area: {c.area}</p>
                                <p>Poblacion: {c.population}</p>
                                    <a href="#">Details</a>
                            </div>
                        </div>
                    </div>
                )
        })}
    </div>
    </div>
    /*
        <div class="container">
        <div class="card">
            <div class="face face1">
                <div class="content">
                   
                    <h3>Design</h3>
                </div>
            </div>
            <div class="face face2">
                <div class="content">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cum cumque minus iste veritatis provident at.</p>
                        <a href="#">Read More</a>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="face face1">
                <div class="content">
                    
                    <h3>Code</h3>
                </div>
            </div>
            <div class="face face2">
                <div class="content">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cum cumque minus iste veritatis provident at.</p>
                        <a href="#">Read More</a>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="face face1">
                <div class="content">
                    
                    <h3>Launch</h3>
                </div>
            </div>
            <div class="face face2">
                <div class="content">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cum cumque minus iste veritatis provident at.</p>
                        <a href="#">Read More</a>
                </div>
            </div>
        </div>
    </div>       */ 

        
    );
}

export default CountryCards;
/*

    
const mapStateToProps = state => {
    return {
        countries: state.countries
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getCountries: countries => {
            dispatch(getCountries(countries))
        } 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CountryCards);*/
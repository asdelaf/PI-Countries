import { NavLink } from 'react-router-dom';
import s from './countries.module.css';

const CountryCards = ({countries, loading}) => {

    if(loading){
        return <h2>Loading...</h2>
    }
    
    function separator(numb) {
        var str = numb.toString().split(".");
        str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return str.join(".");
    }

    return (
        <div class={s.body}>
        <div class={s.container}>
        {countries.map((c) => {
                return (
                    <div class={s.card}>
                        <div>
                            <img class={s.face} src={c.image}/>
                            <NavLink to={`/countries/${c.id}`}>
                                <a class={s.name} >{c.name} </a>
                            </NavLink>         
                        </div>

                    
                        <div class={s.face2} >
                            <div class={s.content}>
                                <p> {c.continent}</p>
                                <p class={s.text}>Population: {separator(c.population)}</p>
                                <p class={s.text1}>Capital: {c.capital}</p>
                                <NavLink to={`/countries/${c.id}`}>
                                   Details
                                </NavLink>
                            </div>
                        </div>
                    </div>
                )
        })}
    </div>
    </div>

        
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
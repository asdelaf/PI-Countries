import React, {useState, useEffect } from 'react';
import { HelpGetCountries } from '../helper';
import CountryCards from '../Countries/countries';
import Pagination from '../Pagination/pagination';
import Nav from '../Nav/nav';
import s from './home.module.css'

const Home = () => {
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [countriesPerPage] = useState(8)

    const [activities, setActivities] = useState([]);
    const [countries, setCountries] = useState([]);
    const [filter, setFilter] = useState({
        name:'',
        continent: '',
        order:''
    });

    function getCountries(name, continent){
        
        const fetchCountries = async () => {
            HelpGetCountries(`/countries/?name=${name}&continent=${continent}`).then((res) => {
                setLoading(true);
                setCountries(res.data);
                setLoading(false)
            });
        }
        fetchCountries();

    }

    useEffect(() => {
        getCountries("", "");

        const fetchActivities = async () => {
            HelpGetCountries(`/activities`).then((res) => {
                setLoading(true);
                setActivities(res.data);
                setLoading(false)
            });
        }
        fetchActivities();
    }, []);

    /*const coun = () =>{
        window.alert(countries[2])
        console.log(countries[2])
        const k = [];
        console.log(countries.length)
        for(var i=0; i<3; i++){
            var a = countries[i]
            k.push(a)
            //console.log(k)
        }
        console.log("k" + k)
        setCountries(k)
        console.log("AAAAAA")
        console.log("countries" + countries)
    }*/

    function handleChange(e) {
        let newFilter = {...filter}
        newFilter.name = e.target.value;
        setFilter(newFilter)
        
        getCountries(e.target.value, filter.continent);
        setCurrentPage(1);
        
    }

    function handleChange2(e) {
        if(e.target.value !== ''){document.getElementById("all").checked = false}
        if(e.target.value !== 'Asia'){document.getElementById("Asia").checked = false}
        if(e.target.value !== 'Europe'){document.getElementById("Europe").checked = false}
        if(e.target.value !== 'Americas'){document.getElementById("Americas").checked = false}
        if(e.target.value !== 'Antarctic'){document.getElementById("Antarctic").checked = false}
        if(e.target.value !== 'Africa'){document.getElementById("Africa").checked = false}
        if(e.target.value !== 'Oceania'){document.getElementById("Oceania").checked = false}

        let newFilter = {...filter}
        newFilter.continent = e.target.value;
        setFilter(newFilter);

        getCountries(filter.name, e.target.value);
        setCurrentPage(1);

    }

    function handleChange4(e){
        const fetchActivities = async () => {
            HelpGetCountries(`/activities/${e.target.value}`).then((res) => {
                setLoading(true);
                setCountries(res.data)
                setLoading(false)
            });
        }
        fetchActivities();
        setCurrentPage(1);
        
        //const newCountries = countries.filter(c => countriesFilter.includes(c));
    }
    
    function handleChange3(e) {
        let newFilter = {...filter}
        newFilter.order = e.target.value;
        setFilter(newFilter);
        setCurrentPage(1);
        
        if(e.target.value == 'desc'){
            countries.sort(function (a, b) {
                if (a.name < b.name) {
                  return 1;
                }
                if (a.name > b.name) {
                  return -1;
                }
                return 0;
              });
        }

        if(e.target.value == 'asc'){
            countries.sort(function (a, b) {
                if (a.name > b.name) {
                  return 1;
                }
                if (a.name < b.name) {
                  return -1;
                }
                return 0;
              });
        }

        if(e.target.value == 'poblacion-mayor'){
            countries.sort(function (a, b) {
                if (parseInt(a.population) < parseInt(b.population)) {
                  return 1;
                }
                if (parseInt(a.population) > parseInt(b.population)) {
                  return -1;
                }
                return 0;
              });
        }

        if(e.target.value == 'poblacion-menor'){
            countries.sort(function (a, b) {
                if (parseInt(a.population) > parseInt(b.population)) {
                  return 1;
                }
                if (parseInt(a.population) < parseInt(b.population)) {
                  return -1;
                }
                return 0;
              });
        }
    }
      


    const indexOfLastPost = currentPage * countriesPerPage;
    const indexOfFirstPost = indexOfLastPost - countriesPerPage;
    const currentCountries = countries.slice(indexOfFirstPost, indexOfLastPost); 

    const paginate = pageNumber => setCurrentPage(pageNumber);
    return (
        
        <div>
            <Nav/>
            <br/>
            <br/>

            <div className={s.containerSearch}>
                <input className={s.search} placeholder="Search..." type='text' id="country" name="country" value={filter.name} onChange={(e) => handleChange(e)}></input>
            </div>

            <br/>             

            <div class={s.container}>
                <div class={s.filters}>
                
                <p>Continentes:</p>
                <div>
                <input classname='input' type="radio" id="all" name="all" value="" onClick={(e) => handleChange2(e)} defaultChecked/>
                <label for="all">Todos</label><br/>
                <input classname='input' type="radio" id="Asia" name="Asia" value="Asia" onClick={(e) => handleChange2(e)}/>
                <label for="Asia">Asia</label><br/>
                <input classname='input' type="radio" id="Europe" name="Europe" value="Europe" onClick={(e) => handleChange2(e)}/>
                <label for="Europe">Europa</label><br/>
                <input classname='input' type="radio" id="Oceania" name="Oceania" value="Oceania" onClick={(e) => handleChange2(e)}/>
                <label for="Oceania">Oceania</label><br/>
                <input classname='input' type="radio" id="Africa" name="Africa" value="Africa" onClick={(e) => handleChange2(e)}/>
                <label for="Africa">Africa</label><br/>
                <input classname='input' type="radio" id="Americas" name="Americas" value="Americas" onClick={(e) => handleChange2(e)}/>
                <label for="Americas">America</label><br/>
                <input classname='input' type="radio" id="Antarctic" name="Antarctic" value="Antarctic" onClick={(e) => handleChange2(e)}/>
                <label for="Antarctic">Antartida</label>
                </div>

                <br/>
                <br/>                
                
                <div>
                <label>Actividades:</label>
                        <select id='activities' onChange={(e) => handleChange4(e)}>
                            <option></option>
                            {activities.map((c) => {
                               return( <option>{c.name}</option>)
                            })}
                        </select>
                </div>

                <br/>
                <br/>

                <div>
                <label>Order:</label>
                <select name="order" value={filter.order} onChange={(e) => handleChange3(e)}>
                    <option></option>
                    <option value='asc'>A-Z</option>
                    <option value='desc'>Z-A</option>
                    <option value='poblacion-mayor'>Mayor Poblacion</option>
                    <option value='poblacion-menor'>Menor Poblacion</option>
                </select>  
                </div>
                </div>
                <CountryCards countries={currentCountries} loading={loading}/>
            </div>
            
            <Pagination countriesPerPage={countriesPerPage} totalCountries={countries.length} paginate={paginate}/>
            
        </div>


    );
};

export default Home;
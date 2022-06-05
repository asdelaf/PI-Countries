import React, {useState, useEffect } from 'react';
import axios from 'axios';
import { useStore } from 'react-redux';
import { HelpGetCountries } from '../helper';
import CountryCards from '../Countries/countries';
import Pagination from '../Pagination/pagination';

const Home = () => {
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [countriesPerPage, setCountriesPerPage] = useState(12)

    const [countries, setCountries] = useState([]);


    useEffect(() => {
        const fetchCountries = async () => {
            HelpGetCountries('/countries').then((res) => {
                setLoading(true);
                setCountries(res.data);
                setLoading(false)
            });
        }

        fetchCountries();

    }, []);

    const indexOfLastPost = currentPage * countriesPerPage;
    const indexOfFirstPost = indexOfLastPost - countriesPerPage;
    const currentCountries = countries.slice(indexOfFirstPost, indexOfLastPost); 

    const paginate = pageNumber => setCurrentPage(pageNumber);
    return (
        <div>
            <CountryCards countries={currentCountries} loading={loading}/>
            <Pagination countriesPerPage={countriesPerPage} totalCountries={countries.length} paginate={paginate}/>
        </div>


    );
};

export default Home;
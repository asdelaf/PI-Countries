import React, {useState, useEffect } from 'react';
import axios from 'axios';
import { useStore } from 'react-redux';
import { HelpGetCountries } from '../helper';
import CountryCards from '../Countries/countries';

const Pagination = ({countriesPerPage, totalCountries, paginate}) => {

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalCountries / countriesPerPage); i++){
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul>
                {pageNumbers.map(number => (
                    <li key={number}>
                        <a onClick= {() => paginate(number)} href='!#'>
                            {number}
                        </a>
                    </li>
                ))}
            </ul> 
        </nav>
    )
};

export default Pagination;
import React from 'react';
import s from './pagination.module.css';


const Pagination = ({countriesPerPage, totalCountries, paginate}) => {

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalCountries / countriesPerPage); i++){
        pageNumbers.push(i);
    }

    return (
        <nav class= {s.nav}>
            <ul class={s.ul}>
                {pageNumbers.map(number => (
                    <li key={number} class={s.li}>
                        <b>
                            <a class={s.a} onClick= {() => paginate(number)}>
                                {number}
                            </a>
                        </b>
                    </li>
                ))}
            </ul> 
        </nav>
    )
};

export default Pagination;
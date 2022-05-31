import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {MdChevronLeft, MdChevronRight} from 'react-icons/md';
import Movie from './Movie';

const Row = ({ title, fetchURL }) => {
    const [movies, setMovies] = useState([]);


    useEffect(() => {
        try {
            axios.get(fetchURL).then((response) => {
                setMovies(response.data.results)
            })
        } catch(err) {
            console.log(err);
        }
        
    },[fetchURL])

    console.log(movies);

    return (
        <div>
            <h2 className='text-white font-bold md:text-xl p-4'>{title}</h2>
            <div className='relative flex items-center group'>
                <MdChevronLeft size={40} className='bg-white rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block'/>
                <div id={'slider'} className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative hidden group-hover:block'>
                    {movies.map((item, id) => (
                        <Movie key={id} item={item}/>
                    ))}
                </div>
                <MdChevronRight size={40} className='bg-white rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden'/>
            </div>
        </div>
    )
}

export default Row;
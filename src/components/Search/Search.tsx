import React from 'react';
import {SearchProps} from "@/types/types";

const Search = ({ search, setSearch, onSearch }: SearchProps) => {
    return (
        <div className='flex flex-row rounded-lg '>
            <input
                className='border rounded-lg w-full p-1 block bg-white'
                type='text'
                placeholder='Ara'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onBlur={() => onSearch(search)}
            />
        </div>
    );
};

export default Search;

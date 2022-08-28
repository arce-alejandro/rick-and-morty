import React from 'react'
import { useEffect, useState } from 'react'
import Character from './Character'

function NavPage(props) {
    return (
        <header className='d-flex justify-content-between align-items-center'>
            <p>Page : {props.page}</p>
            <button className='btn btn-primary btn-sm'
                onClick={() => {
                   props.setPage(props.page + 1)
                }}
            >
               go to page : {props.page + 1}</button>
        </header>
    )
}

function CharacterList() {
    const [characters, setCharacters] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)

    useEffect(() => {

        async function fetchData() {
            const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
            const data = await response.json()
            setCharacters(data.results)
            console.log(data.results)
            setLoading(false)
        }
        fetchData()
    }, [page])


    return (
        <div className='container '>

            <NavPage page={page} setPage={setPage}/>
            {
                loading ? (
                    <div>Loading</div>
                    ) : (<div className="row">
                    {characters.map((character) => (
                        <div className='col-md-4' key={character.id}>
                            <Character character={character} />
                        </div>
                    )
                    )}
                </div>)
            }
            <NavPage page={page} setPage={setPage}/>


        </div>
    )
}

export default CharacterList
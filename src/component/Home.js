import React, { useEffect, useState } from 'react'
import { auth } from '../Token';
import { NavLink } from 'react-router-dom'
import Search from './Search';

const URL = "https://api.spotify.com";

// api headers
const apiHeaders = new Headers();
apiHeaders.append("Authorization",`${auth.token}`);

// ajax header options
const reqOptions = {
    method: "GET",
    redirect: "follow",
    headers: apiHeaders,
}

function Home() {
    const [artist, setArtist] = useState([]);

    useEffect(() => {
        searchHandler("Arijit Singh")
    }, [])

    const searchHandler = (name) => {
        fetch(`${URL}/v1/search?q=${name}&type=artist`, reqOptions)
            .then(res => res.json())
            .then(output => {
                console.log('output =', output);
                setArtist(output.artists.items)
            }).catch(err => err.message);
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12 text-center">
                    <h3 className="display-3 text-info">Home</h3>
                </div>
            </div>

            <Search search={searchHandler} />

            <div className="row">
                {
                    artist.map((item, index) => {
                        const { id, name, images, popularity, genres, followers, type } = item;
                        return (
                            <div className="col-md-4 mt-2" key={index} >
                                <div className="card">
                                    <div className="card-header">
                                        <h4> {name} </h4>
                                    </div>
                                    <div className="card-body">
                                        <p>
                                            <strong>Popularity</strong>
                                            <span className="float-end"> {popularity} </span>
                                        </p>
                                        <p>
                                            <strong>Type</strong>
                                            <span className="float-end"> {type} </span>
                                        </p>
                                        <p>
                                            <strong>Genres</strong>
                                            <span className="float-end"> {genres} </span>
                                        </p>
                                        <p>
                                            <strong>followers</strong>
                                            <span className="float-end"> {followers.total} </span>
                                        </p>
                                    </div>
                                    <div className="card-footer">
                                        <NavLink to={`/track/${id}`} className="btn btn-primary">Track</NavLink>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Home
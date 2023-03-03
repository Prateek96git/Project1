import React, {useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { auth } from '../Token'

const URL = "https://api.spotify.com";
const apiHeaders = new Headers();
apiHeaders.append("Authorization", `${ auth.token }`);

const reqOptions = {
    method: "GET",
    headers: apiHeaders,
    redirect: "follow"
}

function Track() {
    const params = useParams();
    //console.log('params =', params);
    const [track,setTrack] = useState([])

    const [audio, setAudio] = useState(null); //create a custom audio player
    const [playing, setPlaying] = useState(false); //play /pause state
    const [preUrl, setPreUrl] = useState(null); // track url

    useEffect(() => {
        getTracks()
    },[])

    const getTracks = () => {
        fetch(`${URL}/v1/artists/${params.trackId}/top-tracks?market=IN`, reqOptions)
            .then(res => res.json())
            .then(data => {
              //  console.log('data =', data)
              setTrack(data.tracks)
            }).catch(err => console.log(err.message));
    };
     const playAudio=(url)=>{
        //create instance for an audio
        const myAudio=new Audio(url);
        if(!playing){
            myAudio.play();
            setAudio(myAudio);
            setPlaying(true);
            setPreUrl(url);
        }else{
            //play to pause state
            audio.pause();
            if(preUrl === url){
                setPlaying(false);
            }else{
                //pause to play
                myAudio.play();
                setAudio(myAudio);
                setPreUrl(url);
            }
        }
     }

     // track icon
     const trackIcon = (url) => {
        if (!url)
            return <span className="text-danger">No track found</span>
        if (playing && preUrl === url)
           return <button className="btn btn-sm btn-warning">Pause</button>
           return <button className="btn btn-sm btn-success">Play</button>
     }
      return(
        <div className="container">
            <div className="row">
                <div className="col-md-12 text-center">
                    <h3 className="display-3 text-info">Track</h3>
                </div>
            </div>

            <div className="row">
                {
                    track.map((item, index) => {
                        const {id, name, album, preview_url } = item
                        return (
                            <div className="col-md-3 mb-2 mt-2" key={index} >
                                
                                <div className="card"  onClick={()=> playAudio(preview_url)}  style={{cursor:'pointer'}}>
                                   
                                    <img src={album.images[1].url} alt="" className="card-img-top" />



                                    <div className="card-body">
                                        <h6 className="text-secondary"> {name} </h6>
                                    </div>


                                
                                <div className="card-footer">
                                    { trackIcon(preview_url) }
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
export default Track
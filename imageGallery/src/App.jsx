import React,{useState} from 'react'
import axios from 'axios';
import Gallery from './gallery';

const apiKey = "636e1481b4f3c446d26b8eb6ebfe7127";
const App = () => {
  const [search,setSearch] = useState("");
  const [data,setData] = useState([]);
  const changeHandler = (e) => {
    setSearch(e.target.value);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    axios.get(
            `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${search}&per_page=24&format=json&nojsoncallback=1`
    ).then(response => {
      console.log(response.data.photos.photo);
      setData(response.data.photos.photo);
    })
    .catch(error => {
      console.log("Error fetching and parsing data", error);
   });
  }
  return (
    <div>
      <center>
        <h2>Image Gallery</h2>
        <form onSubmit={submitHandler}>

          <input size="30" type="text" value={search} onChange={changeHandler} placeholder="Search for images..." /><br /><br />
          <button type="submit">Search</button>

        </form>
        <br />
        {data.length>=1?<Gallery data={data}/>:<h4>No images found</h4>}
      </center>
    </div>
  )
}

export default App

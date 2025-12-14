import React,{useState} from 'react'
import axios from 'axios';
import Gallery from './gallery';
import './App.css';

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
    <div className="app">
    <h2 className="title">Image Gallery</h2>

   <form className="search-form" onSubmit={submitHandler}>
      <input
        type="text"
        value={search}
        onChange={changeHandler}
        placeholder="Search for images..."
      />
      <button type="submit">Search</button>
    </form>

    {data.length >= 1 ? (
      <Gallery data={data} />
    ) : (
      <p className="empty-text">No images found</p>
    )}
  </div>
  )
}

export default App

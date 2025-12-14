import React from 'react';
import './gallery.css';
const Gallery = ({ data }) => {
  return (
    <div className='row'>
      {data.map((image) => (
        <div className="col-md-3" key={image.id}>
          <img
            src={`https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}_m.jpg`}
            height="200"
            width="250"
            alt=""
          />
        </div>
      ))}
    </div>
  );
};

export default Gallery;

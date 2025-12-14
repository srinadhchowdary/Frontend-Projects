import React from 'react';
import './gallery.css';
const Gallery = ({ data }) => {
  return (
   <div className="gallery">
    {data.map((image) => (
      <div className="gallery-item" key={image.id}>
        <img
          src={`https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}_m.jpg`}
          alt={image.title}
        />
      </div>
    ))}
  </div>
  );
}

export default Gallery;

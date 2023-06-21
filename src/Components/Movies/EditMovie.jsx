import React from 'react'
import { useParams } from 'react-router-dom';

const EditMovie = () => {
    const { movieId } = useParams();
  return (
    <div>EditMovie</div>
  )
}

export default EditMovie
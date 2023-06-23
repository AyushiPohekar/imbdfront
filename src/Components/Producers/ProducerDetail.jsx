import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getProducersById } from "../../redux/actions";
import Navbar from "../Navbar/Navbar";
import "../Actors/ActorDetail.css";

const ProducerDetail = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const singleMovie = location.state?.singleMovie;
  const producerId = singleMovie.producer._id;
  console.log(producerId);
  useEffect(() => {
    dispatch(getProducersById(producerId));
  }, [producerId]);

  const selectedProducer = useSelector((state) => state.producer);
  const singleProducer = selectedProducer?.selectedProducer;
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <button className="Backbtn" onClick={() => navigate(-1)}>
        Back
      </button>

      <div className="actordetailContainer">
        <div className="FieldDiv">
          <span className="Field">Name:</span>
          <h3>{singleProducer?.name}</h3>
        </div>
        <div className="FieldDiv">
          <span className="Field">Gender:</span>
          <span>{singleProducer?.gender}</span>
        </div>
        <div className="FieldDiv">
          <span className="Field">DOB:</span>
          <span>{singleProducer?.dob}</span>
        </div>
        <div className="FieldDiv">
          <span className="Field">Bio:</span>
          <span>{singleProducer?.bio}</span>
        </div>
        <div>
          <div className="Field">Movies Directed:</div>
          <div className="MoviesDivContainer">
            {singleProducer?.movies?.map((movie) => {
              return (
                <div className="MoviesDiv">
                  <img src={movie.poster_path} />
                  <div>{movie?.original_title}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div></div>
      </div>
    </>
  );
};

export default ProducerDetail;

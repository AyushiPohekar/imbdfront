import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { getActorsById } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import "./ActorDetail.css";

const ActorDetail = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const actor = location.state?.actor;
  console.log(actor);
  console.log(actor._id);
  let actorId = actor._id;
  useEffect(() => {
    dispatch(getActorsById(actorId));
  }, [actorId]);

  const selectedActor = useSelector((state) => state.actor);
  const singleActor = selectedActor?.selectedActor;

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
          <h3>{singleActor?.name}</h3>
        </div>
        <div className="FieldDiv">
          <span className="Field">Gender:</span>
          <span>{singleActor?.gender}</span>
        </div>
        <div className="FieldDiv">
          <span className="Field">DOB:</span>
          <span>{singleActor?.dob}</span>
        </div>
        <div className="FieldDiv">
          <span className="Field">Bio:</span>
          <span>{singleActor?.bio}</span>
        </div>
        <div>
          <div className="Field">Movies Acted In:</div>
          <div className="MoviesDivContainer">
            {singleActor?.movies?.map((movie) => {
              return (
                <div className="MoviesDiv">
                  <img src={movie.poster_path} />
                  <div>{movie?.original_title}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ActorDetail;

import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { API } from "../../global";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getallActors, getallProducers } from "../../redux/actions";

const CreateMovie = () => {

  const dispatch = useDispatch();
  let auth = localStorage.getItem("auth");
  let authuser = JSON.parse(auth);
  let token = authuser?.token;
  console.log(token);

  const [genres, setGenres] = useState([]);
  const [original_language, setoriginal_language] = useState("");
  const [originalTitle, setOriginalTitle] = useState("");
  const [overview, setOverview] = useState("");
  const [poster_path, setposter_path] = useState("");
  const [releaseDate, setreleaseDate] = useState("");
  const [vote_average, setvote_average] = useState();
  const [status, setstatus] = useState("");

  const [producerName, setProducerName] = useState("");
  const [producerGender, setProducerGender] = useState("");
  const [producerDOB, setProducerDOB] = useState("");
  const [producerBio, setProducerBio] = useState("");
  const [producer, setproducer] = useState([]);
  const [selectedProducer, setSelectedproducer] = useState({});
  const [existingproducer, setExistingproducer] = useState(null);
  //actorStates
  const [actors, setActors] = useState([]);

  const [selectedActor, setSelectedActor] = useState(null);
  const [actorName, setActorName] = useState("");
  const [actorGender, setActorGender] = useState("");
  const [actorDOB, setActorDOB] = useState("");
  const [actorBio, setActorBio] = useState("");
  const [existingActors, setExistingActors] = useState([]);

  //console.log("afterintializing",actors)
  //console.log("typeof",typeof(actors))
  useEffect(() => {
    dispatch(getallActors);
    dispatch(getallProducers);
  }, []);
  const allActors = useSelector((state) => state.actor.actors);
  const allProducers = useSelector((state) => state.producer.producers);

  // useEffect(() => {
  //   fetchActors();
  //   fetchProducers();
  //   //console.log("inside useEffect")
  // }, []);

  // const fetchActors = async () => {
  //   try {
  //     const response = await axios.get(`${API}/actors`);
  //     setExistingActors(response?.data?.actors);
  //   } catch (error) {
  //     console.log("Error:", error.message);
  //   }
  // };
  // const fetchProducers = async () => {
  //   try {
  //     const response = await axios.get(`${API}/producers`);
  //     setExistingproducer(response?.data?.producers);
  //     console.log(existingproducer);
  //   } catch (error) {
  //     console.log("Error:", error.message);
  //   }
  // };

  const handleAddActor = () => {
    if (!actorName || !actorGender || !actorDOB || !actorBio) {
      toast.error("Please fill in all the fields for the new actor.");
      return;
    }

    const newActor = {
      name: actorName,
      gender: actorGender,
      dob: actorDOB,
      bio: actorBio,
    };

    setActors((prevActors) => [...prevActors, newActor]);

    // Clear the form inputs
    // setActorName("");
    // setActorGender("");
    // setActorDOB("");
    // setActorBio("");
  };

  useEffect(() => {
    if (selectedActor) {
      const newActor = {
        name: selectedActor?.name,
        gender: selectedActor?.gender,
        dob: selectedActor?.dob,
        bio: selectedActor?.bio,
      };
      setActors((prevActors) => [...prevActors, newActor]);
    }
  }, [selectedActor]);

  const handleSelectedActorChange = (event) => {
    const selectedActorId = event.target.value;
    if (selectedActorId) {
      const selectedActor = allActors.find(
        (actor) => actor._id === selectedActorId
      );
      setSelectedActor(selectedActor);
    } else {
      setSelectedActor(null);
    }
  };

  //Producers
  useEffect(() => {
    if (selectedProducer) {
      setProducerName(selectedProducer?.name);
      setProducerGender(selectedProducer?.gender);
      setProducerDOB(selectedProducer?.dob);
      setProducerBio(selectedProducer?.bio);
    } else {
      setProducerName("");
      setProducerGender("");
      setProducerDOB("");
      setProducerBio("");
    }
    setproducer(selectedProducer);
    console.log("producer", producer);
  }, [selectedProducer]);

  const handleNewProducer = (event) => {
    event.preventDefault();
    if (!producerName || !producerGender || !producerDOB || !producerBio) {
      toast.error("Please fill in all the fields for the new producer.");
      return;
    }

    if (producer.length > 0) {
      toast.error("Only one producer can be added.");
      return;
    }

    const newProducer = {
      name: producerName,
      gender: producerGender,
      dob: producerDOB,
      bio: producerBio,
    };

    setproducer([newProducer]);
    console.log([newProducer]);
  };

  const handleExistingProducer = (event) => {
    const selectedProducerId = event.target.value;
    if (selectedProducerId) {
      const selectedProducer = allProducers.find(
        (producer) => producer._id === selectedProducerId
      );
      setSelectedproducer(selectedProducer);
    } else {
      setSelectedproducer(null);
    }
  };

  //Genere Function
  const handleGenreChange = (e) => {
    let selectedgenere = e.target.value;
    let generesOne = new Set([...genres, selectedgenere]);
    let generetwo = [...generesOne];
    setGenres(generetwo);
  };
  //original language
  const handleoriginal_language = (e) => {
    setoriginal_language(e.target.value);
  };

  //Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     
     
      const formData = {
        genres,
        original_language: original_language,
        original_title: originalTitle,
        overview,
        poster_path,
        releaseDate,
        status,
        vote_average,
        actors: actors,
        producer,
      };
     
      const res = await axios.post(`${API}/movies`, formData, {
        headers: {
          Authorization: token,
        },
      });
      toast( res.data.message);
      setTimeout(()=>{
        navigate("/")
      },2000)
      console.log(res.data)
    } catch (error) {
      toast.error("Error:", error.message);
    }
  };

  // console.log("originallanguage",original_language)
  //console.log("originalTitle",originalTitle)
  ///console.log("vote",vote_average)
  //console.log("release",releaseDate)
  //console.log("poster",poster_path)
  //console.log("status",status)
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <button className="Backbtn" onClick={() => navigate(-1)}>
        Back
      </button>
      <form onSubmit={handleSubmit} className="formcreate">
        {/* genere */}

        <div className="CreateFielDiv">
          <label htmlFor="genres" className="CreateField">
            Genres:
          </label>
          <select
            id="genres"
            name="genres"
            value={genres}
            onChange={handleGenreChange}
            className="SelectCreate"
          >
            <option value="">select Genres</option>
            <option value="adventure">Adventure</option>
            <option value="family">Family</option>
            <option value="drama">Drama</option>
            <option value="comedy">Comedy</option>
            <option value="fantasy">Fantasy</option>
          </select>
        </div>
        <div className="DisplayGenereDiv">
          {genres?.map((item) => {
            return <div className="generelist">{item}</div>;
          })}
        </div>

        <br />

        {/* OriginalLangauge */}
        <div>
          <label htmlFor="originalLanguage" className="CreateField">
            Original Language:
          </label>
          <select
            id="language"
            name="original_language"
            value={original_language}
            onChange={handleoriginal_language}
            className="SelectCreate"
            required
          >
            <option value="en">English</option>
            <option value="hindi">Hindi</option>
            <option value="tamil">Tamil</option>
            <option value="Marathi">Marathi</option>
          </select>
        </div>

        {/* OriginalTitle */}
        <div className="CreateFielDiv">
          <label htmlFor="originalTitle" className="CreateField">
            Original Title:
          </label>
          <input
            type="text"
            id="originalTitle"
            name="originalTitle"
            value={originalTitle}
            onChange={(e) => setOriginalTitle(e.target.value)}
            className="createInput"
            required
          />
        </div>
        <br />

        {/* PosterPath */}
        <div className="CreateFielDiv">
          <label htmlFor="poster_path" className="CreateField">
            Movie Poster:
          </label>
          <input
            type="text"
            id="poster_path"
            name="poster_path"
            value={poster_path}
            onChange={(e) => setposter_path(e.target.value)}
            className="createInput"
            required
          />
        </div>
        <br />

        {/* Overview */}
        <div className="CreateFielDiv">
          <label htmlFor="overview" className="CreateField">
            Overview:
          </label>
          <textarea
            id="overview"
            name="overview"
            value={overview}
            onChange={(e) => setOverview(e.target.value)}
            className="createInput"
            required
          />
        </div>
        <br />

        {/* ReleaseDate */}
        <div className="CreateFielDiv">
          <label htmlFor="releaseDAte" className="CreateField">
            releaseDate:
          </label>
          <input
            id="releaseDate"
            placeholder="01-01-2023"
            name="releaseDate"
            value={releaseDate}
            onChange={(e) => setreleaseDate(e.target.value)}
            className="createInputDate"
            required
          />
        </div>
        <br />

        {/* Vote */}
        <div className="CreateFielDiv">
          <label htmlFor="overview" className="CreateField">
            Rating:
          </label>
          <input
            type="number"
            id="vote_average"
            name="vote_average"
            value={vote_average}
            onChange={(e) => setvote_average(e.target.value)}
            placeholder="Enter out of 10"
            className="createInputDate"
            required
          />
        </div>
        <br />

        {/* Status */}
        <label htmlFor="status" className="CreateField">
          Status:
        </label>
        <select
          type="text"
          id="status"
          name="status"
          value={status}
          className="SelectCreate"
          onChange={(e) => setstatus(e.target.value)}
          required
        >
          <option value="en">Released</option>
          <option value="hindi">Not Released</option>
        </select>
        <br />

        <h3 className="AddTitle">Add Actors:</h3>
        <div className="Note">Note:You can add multiple Actors</div>

        <div className="AddActors">
          <h4>1.Select from Existing Actors:</h4>
          <select
            defaultValue=""
            value={selectedActor?._id}
            onChange={(e) => handleSelectedActorChange(e)}
            className="SelectCreate"
          >
            <option value="">Select Actor</option>
            {allActors?.map((item) => {
              return (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="note2">Please write all the field to enter new actor.</div>
        <div className="AddNewActor">
          <div className="AddNewField">
            <label htmlFor="actorName" className="CreateFieldNew">
              Name:
            </label>
            <input
              type="text"
              id="actorName"
              value={actorName}
              onChange={(event) => setActorName(event.target.value)}
              
            />
          </div>

          <div className="AddNewField">
            <label htmlFor="actorGender" className="CreateFieldNew">
              Gender:
            </label>
            <input
              type="text"
              id="actorGender"
              value={actorGender}
              onChange={(event) => setActorGender(event.target.value)}
             
            />
          </div>
          <div className="AddNewField">
            <label htmlFor="actorDOB" className="CreateFieldNew">
              Date of Birth:
            </label>
            <input
              type="text"
              id="actorDOB"
              value={actorDOB}
             
              onChange={(event) => setActorDOB(event.target.value)}
            />
          </div>

          <div className="AddNewField">
            <label htmlFor="actorBio" className="CreateFieldNew">
              Bio:
            </label>
            <textarea
              id="actorBio"
              value={actorBio}
              onChange={(event) => setActorBio(event.target.value)}
             
            ></textarea>
          </div>
        </div>
        <button onClick={handleAddActor} className="AddnewActor">
          Add New Actor
        </button>

        <h3>Selected Actors is Displayed Here</h3>

        <div className="DisplayGenereDiv">
          {actors?.map((actor, index) => (
            <li key={index} className="generelist">
              {actor.name}
            </li>
          ))}
        </div>

        {/* Producer */}

        <h3 className="AddTitle">Add Producer</h3>
        <div className="Note">
          Note:You can select only one producer for a movie
        </div>

        <h4>1.Select from Existing Producers</h4>

        <select
          value={selectedProducer?._id}
          onChange={handleExistingProducer}
          className="SelectCreate"
        >
          <option value="">Select Existing Producer</option>
          {allProducers?.map((producer) => (
            <option key={producer._id} value={producer._id}>
              {producer.name}
            </option>
          ))}
        </select>

        <h3>Or</h3>

        <div className="AddActors">Add New Producer</div>
        <div className="note2">Please write all the field to enter new actor.</div>
        <div className="AddNewActor">
          <div  className="AddNewField">
            <label htmlFor="producerName" className="CreateField">
              Name:
            </label>
            <input
              type="text"
              id="producerName"
              value={producerName}
              onChange={(event) => setProducerName(event.target.value)}
            />
          </div>
          <div  className="AddNewField">
            <label htmlFor="producerGender" className="CreateField">
              Gender:
            </label>
            <input
              type="text"
              id="producerGender"
              value={producerGender}
              onChange={(event) => setProducerGender(event.target.value)}
            />
          </div>
          <div  className="AddNewField">
            <label htmlFor="producerDOB" className="CreateField">
              Date of Birth:
            </label>
            <input
              type="text"
              id="producerDOB"
              value={producerDOB}
              onChange={(event) => setProducerDOB(event.target.value)}
            />
          </div>
          <div  className="AddNewField">
            <label htmlFor="producerBio" className="CreateField">
              Bio:
            </label>
            <textarea
              id="producerBio"
              value={producerBio}
              onChange={(event) => setProducerBio(event.target.value)}
            ></textarea>
          </div>
        </div>
       
        <button onClick={handleNewProducer}  className="AddnewActor">Add Producer</button>
        

        <button type="submit" className="AddMovie">Add Movie</button>
      </form>
      <ToastContainer />
    </>
  );
};

export default CreateMovie;

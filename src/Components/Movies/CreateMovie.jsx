import React, { useEffect, useState } from "react";
import {
  addnewMovie,
  getallActors,
  getallProducers,
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../../global";
import axios from "axios";
import Navbar from "../Navbar/Navbar";

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
  // useEffect(() => {
  //   dispatch(getallActors);
  //   dispatch(getallProducers);
  // }, []);
  // const allActors = useSelector((state) => state.actor.actors);
  // const allProducers = useSelector((state) => state.producer.producers);

  useEffect(() => {
    fetchActors();
    fetchProducers();
    //console.log("inside useEffect")
  }, []);

  const fetchActors = async () => {
    try {
      const response = await axios.get(`${API}/actors`);
      setExistingActors(response?.data?.actors);
    } catch (error) {
      console.log("Error:", error.message);
    }
  };
  const fetchProducers = async () => {
    try {
      const response = await axios.get(`${API}/producers`);
      setExistingproducer(response?.data?.producers);
      console.log(existingproducer);
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  const handleAddActor = () => {
    const newActor = {
      name: actorName,
      gender: actorGender,
      dob: actorDOB,
      bio: actorBio,
    };

    setActors((prevActors) => [...prevActors, newActor]);

    // Clear the form inputs
    setActorName("");
    setActorGender("");
    setActorDOB("");
    setActorBio("");
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
      const selectedActor = existingActors.find(
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
      alert("Please fill in all the fields for the new producer.");
      return;
    }

    if (producer.length > 0) {
      alert("Only one producer can be added.");
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
      const selectedProducer = existingproducer.find(
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
      console.log("typeof", typeof actors);
      console.log("actors", actors);
      console.log("ActorKeys", Object.keys(actors));
      console.log("ObjectValues", Object.values(actors));
      let actors1 = Object.values(actors);
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
      console.log("formData", formData);
      const res = await axios.post(
        `${API}/movies`,
        formData ,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("res.data", res.data.message);
      //dispatch(addnewMovie(formData));
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  // console.log("originallanguage",original_language)
  //console.log("originalTitle",originalTitle)
  ///console.log("vote",vote_average)
  //console.log("release",releaseDate)
  //console.log("poster",poster_path)
  //console.log("status",status)
  return (
    <>
      <Navbar />
      <form onSubmit={handleSubmit}>
        {/* genere */}

        <div>
          <label htmlFor="genres">Genres:</label>
          <select
            id="genres"
            name="genres"
            value={genres}
            onChange={handleGenreChange}
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
            return <>{item}</>;
          })}
        </div>

        <br />

        {/* OriginalLangauge */}
        <div>
          <label htmlFor="originalLanguage">Original Language:</label>
          <select
            id="language"
            name="original_language"
            value={original_language}
            onChange={handleoriginal_language}
            required
          >
            <option value="en">English</option>
            <option value="hindi">Hindi</option>
            <option value="tamil">Tamil</option>
            <option value="Marathi">Marathi</option>
          </select>
        </div>

        {/* OriginalTitle */}
        <label htmlFor="originalTitle">Original Title:</label>
        <input
          type="text"
          id="originalTitle"
          name="originalTitle"
          value={originalTitle}
          onChange={(e) => setOriginalTitle(e.target.value)}
          required
        />
        <br />

        {/* PosterPath */}
        <label htmlFor="poster_path">Movie Poster:</label>
        <input
          type="text"
          id="poster_path"
          name="poster_path"
          value={poster_path}
          onChange={(e) => setposter_path(e.target.value)}
          required
        />
        <br />

        {/* Overview */}
        <label htmlFor="overview">Overview:</label>
        <textarea
          id="overview"
          name="overview"
          value={overview}
          onChange={(e) => setOverview(e.target.value)}
          required
        />
        <br />

        {/* ReleaseDate */}
        <label htmlFor="overview">releaseDate:</label>
        <input
          id="releaseDate"
          name="releaseDate"
          value={releaseDate}
          onChange={(e) => setreleaseDate(e.target.value)}
          required
        />
        <br />

        {/* Vote */}
        <label htmlFor="overview">Vote:</label>
        <input
          type="number"
          id="vote_average"
          name="vote_average"
          value={vote_average}
          onChange={(e) => setvote_average(e.target.value)}
          required
        />
        <br />

        {/* Status */}
        <label htmlFor="status">Status:</label>
        <input
          type="text"
          id="status"
          name="status"
          value={status}
          onChange={(e) => setstatus(e.target.value)}
          required
        />
        <br />

        <h3>Add Actors:</h3>

        <select
          defaultValue=""
          value={selectedActor?._id}
          onChange={(e) => handleSelectedActorChange(e)}
        >
          <option value="">Select Actor</option>
          {existingActors?.map((item) => {
            return (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            );
          })}
        </select>

        <div>
          <label htmlFor="actorName">Name:</label>
          <input
            type="text"
            id="actorName"
            value={actorName}
            onChange={(event) => setActorName(event.target.value)}
          />

          <label htmlFor="actorGender">Gender:</label>
          <input
            type="text"
            id="actorGender"
            value={actorGender}
            onChange={(event) => setActorGender(event.target.value)}
          />

          <label htmlFor="actorDOB">Date of Birth:</label>
          <input
            type="text"
            id="actorDOB"
            value={actorDOB}
            onChange={(event) => setActorDOB(event.target.value)}
          />

          <label htmlFor="actorBio">Bio:</label>
          <textarea
            id="actorBio"
            value={actorBio}
            onChange={(event) => setActorBio(event.target.value)}
          ></textarea>
        </div>

        <button onClick={handleAddActor}>Add Actor</button>

        <h3>Selected Actors:</h3>
        <ul>
          {actors?.map((actor, index) => (
            <li key={index}>{actor.name}</li>
          ))}
        </ul>

        {/* Producer */}

        <h3>Add Producer</h3>
        <select value={selectedProducer?._id} onChange={handleExistingProducer}>
          <option value="">Select Existing Producer</option>
          {existingproducer?.map((producer) => (
            <option key={producer._id} value={producer._id}>
              {producer.name}
            </option>
          ))}
        </select>

        <h3>Or</h3>

        <p>Add New Producer</p>
        <div>
          <label htmlFor="producerName">Name:</label>
          <input
            type="text"
            id="producerName"
            value={producerName}
            onChange={(event) => setProducerName(event.target.value)}
          />

          <label htmlFor="producerGender">Gender:</label>
          <input
            type="text"
            id="producerGender"
            value={producerGender}
            onChange={(event) => setProducerGender(event.target.value)}
          />

          <label htmlFor="producerDOB">Date of Birth:</label>
          <input
            type="text"
            id="producerDOB"
            value={producerDOB}
            onChange={(event) => setProducerDOB(event.target.value)}
          />

          <label htmlFor="producerBio">Bio:</label>
          <textarea
            id="producerBio"
            value={producerBio}
            onChange={(event) => setProducerBio(event.target.value)}
          ></textarea>
        </div>
        <button onClick={handleNewProducer}>Add Producer</button>

        <button type="submit">Add Movie</button>
      </form>
    </>
  );
};

export default CreateMovie;

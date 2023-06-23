import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "../../global";

const AddMovie = () => {
  const [genres, setGenres] = useState([]);
  const [genreList, setGenreList] = useState([]);
  const [original_language, setoriginal_language] = useState("");
  const [originalTitle, setOriginalTitle] = useState("");
  const [overview, setOverview] = useState("");
  const [poster_path, setposter_path] = useState("");
  const [releaseDate, setreleaseDate] = useState("");
  const [vote_average, setvote_average] = useState();
  const [existingActors, setExistingActors] = useState([]);
  const [selectedActor, setSelectedActor] = useState(null);
  const [actorName, setActorName] = useState("");
  const [actorGender, setActorGender] = useState("");
  const [actorDOB, setActorDOB] = useState("");
  const [actorBio, setActorBio] = useState("");
  const [producerName, setProducerName] = useState("");
  const [producerGender, setProducerGender] = useState("");
  const [producerDOB, setProducerDOB] = useState("");
  const [producerBio, setProducerBio] = useState("");
  const [actors, setActors] = useState([]);
  const [producer, setproducer] = useState([]);
  const [existingproducer, setExistingproducer] = useState(null);
  const [selectedProducer, setSelectedproducer] = useState({});
  let selectedActor1={};


const[status,setstatus]=useState("")
  useEffect(() => {
    fetchActors();
    fetchProducers();
    //console.log("inside useEffect")
  }, []);

  let auth = localStorage.getItem("auth");
  let authuser = JSON.parse(auth);
  let token = authuser?.token;

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

  console.log("selectedActor:", typeof selectedActor);

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
        actors,
      producer,

        // Include other movie fields here
      };
      console.log(formData)
      const response = await axios.post(`${API}/movies`, formData, {
        headers: {
          Authorization: token,
        },
      });

      //console.log(response.data.message);
      // console.log("Added movie:", response.data.movie);

      // Reset form fields
      setGenres([]);
      setoriginal_language("");
      setOriginalTitle("");
      setOverview("");
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  const handleGenreChange = (e) => {
    let selectedgenere = e.target.value;
    let generesOne = new Set([...genres, selectedgenere]);
    let generetwo = [...generesOne];
    setGenres(generetwo);
  };
  console.log(genres);

  const handleoriginal_language = (e) => {
    setoriginal_language(e.target.value);
  };

  const handleAddActor = () => {
    const newActor = {
      name: actorName,
      gender: actorGender,
      dob: actorDOB,
      bio: actorBio,
    };

    setActors([...actors, newActor]);

    // Clear the form inputs
    setActorName("");
    setActorGender("");
    setActorDOB("");
    setActorBio("");
  };

  // const handleSelectedActorChange = (event) => {
  //   const selectedActorId = event.target.value;
  //   console.log("selectedActorId",selectedActorId)
  //   if (selectedActorId) {
  //     console.log("insidehandleselectactor");
      
  //     selectedActor1 = existingActors.find(
  //       (actor) => actor._id === selectedActorId
  //     );
  //     console.log("selectedActor1",selectedActor1)
      
  //     setSelectedActor(selectedActor1);
  //      console.log("selectedActor",selectedActor)
  //     const newActor = {
  //       name: selectedActor1?.name,
  //       gender: selectedActor1?.gender,
  //       dob: selectedActor1?.dob,
  //       bio: selectedActor1?.bio,
  //     };
  //     console.log("newActor",newActor)
  //     setActors([...actors, newActor]);
  //   console.log("actors",actors)
  //   } else {
  //     console.log("hello else");
  //     // Reset the selected actor in the component state
  //      setSelectedActor({});
  //   }
  // };
  // Define a useEffect hook outside of the component
// useEffect(() => {
//   if (selectedActor) {
//     const newActor = {
//       name: selectedActor.name,
//       gender: selectedActor.gender,
//       dob: selectedActor.dob,
//       bio: selectedActor.bio,
//     };
//     setActors([...actors, newActor]);
//     console.log("selectedActor", selectedActor);
//   }
// }, [selectedActor]);


// const handleSelectedActorChange = (event) => {
//   const selectedActorId = event.target.value;
//   console.log("selectedActorId", selectedActorId);

//   if (selectedActorId) {
//     console.log("insidehandleselectactor");

//     const selectedActor1 = existingActors.find(
//       (actor) => actor._id === selectedActorId
//     );
//     console.log("selectedActor1", selectedActor1);

//     setSelectedActor(selectedActor1);
    
//   } else {
//     console.log("hello else");
//     // Reset the selected actor in the component state
//     setSelectedActor(null);
//   }
// };
useEffect(() => {
  if (selectedActor) {
    const newActor = {
      name: selectedActor.name,
      gender: selectedActor.gender,
      dob: selectedActor.dob,
      bio: selectedActor.bio,
    };
    setActors([...actors, newActor]);
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
  let flag = 0;

  

  // useEffect(() => {
  //   if (selectedProducer) {
  //     // Set the producer state based on the selected producer's values
  //     const producerData = {
  //       name: selectedProducer.name,
  //       gender: selectedProducer.gender,
  //       dob: selectedProducer.dob,
  //       bio: selectedProducer.bio,
  //     };
      
  //     setproducer(producerData);
  
  //     console.log("selectedProducer", selectedProducer);
  //   } else {
  //     // Reset the producer state when no producer is selected
  //     setproducer({});
  //   }
  // }, [selectedProducer]);
  
  // const handleSelectedProducerChange = (event) => {
  //   const selectedProducerId = event.target.value;
  //   if (selectedProducerId) {
  //     const selectedProducer1 = existingproducer.find(
  //       (producer) => producer._id === selectedProducerId
  //     );
  
  //     setSelectedproducer(selectedProducer1);
  //   } else {
  //     setSelectedproducer(null);
  //   }
  // };
 
  useEffect(() => {
    if (selectedProducer) {
      const producerDOB = new Date(selectedProducer.dob);

      setProducerName(selectedProducer.name);
      setProducerGender(selectedProducer.gender);
      setProducerDOB(producerDOB);
      setProducerBio(selectedProducer.bio);
    } else {
      setProducerName('');
      setProducerGender('');
      setProducerDOB('');
      setProducerBio('');
    }
    setproducer(selectedProducer)
  }, [selectedProducer]);

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

  const handleNewProducer = (event) => {
    event.preventDefault();
    if (!producerName || !producerGender || !producerDOB || !producerBio) {
      alert('Please fill in all the fields for the new producer.');
      return;
    }

    if (selectedProducer) {
      alert('Only one producer can be added.');
      return;
    }

    const newProducer = {
      name: producerName,
      gender: producerGender,
      dob: producerDOB.toString(),
      bio: producerBio,
    };

    setSelectedproducer(newProducer);
    setproducer(selectedProducer)
  };
console.log("SelectedProducer:",selectedProducer)
console.log("producer",producer)
  // const isProducerInputDisabled = selectedProducer

  return (
    <form
      onSubmit={handleSubmit}
      style={{ color: "white", background: "blue" }}
    >
      <label htmlFor="genres">Genres:</label>
      <select
        id="genres"
        name="genres"
        value={genres}
        onChange={handleGenreChange}
        required
      >
        <option value="">select Genres</option>
        <option value="adventure">Adventure</option>
        <option value="family">Family</option>
        <option value="drama">Drama</option>
        <option value="comedy">Comedy</option>
        <option value="fantasy">Fantasy</option>
      </select>
      <br />

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
        <option value="Fantasy">Fantasy</option>
      </select>

      <br />

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

      <label htmlFor="overview">Overview:</label>
      <textarea
        id="overview"
        name="overview"
        value={overview}
        onChange={(e) => setOverview(e.target.value)}
        required
      />
      <br />
      <label htmlFor="overview">releaseDate:</label>
      <input
        id="releaseDate"
        name="releaseDate"
        value={releaseDate}
        onChange={(e) => setreleaseDate(e.target.value)}
        required
      />
      <br />
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

      {/* Adding Actors */}

      <h3>Add Actors:</h3>
      {/* <select value={selectedActor} onChange={handleSelectedActorChange}>
        <option value="">Select Existing Actor</option>
        {existingActors?.map((actor) => {
          return (
            <option key={actor._id} value={actor._id}>
              {actor.name}
            </option>
          );
        })}
      </select> */}

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
          type="date"
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

      <h3>Add Producer</h3>
      <select value={selectedProducer?._id} onChange={handleExistingProducer}>
        <option value="">Select Existing Producer</option>
        {existingproducer?.map((producer) => (
          <option key={producer?._id} value={producer?._id}>
            {producer?.name}
          </option>
        ))}
      </select>

      <h3>Or</h3>
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
          type="date"
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
  );
};

export default AddMovie;

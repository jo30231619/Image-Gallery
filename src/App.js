import React, { useState, useEffect } from "react";
import ImageCard from "./components/imageCard";
import ImageSearch from "./components/imageSearch";

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState("");

  useEffect(() => {
    fetch(
      `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}&image_type=photo&pretty=true`
    )
      .then((res) => res.json())
      .then((data) => {
        setImages(data.hits);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [term]);

  return (
    <div className="container mx-auto">
      <ImageSearch searchText={(text) => setTerm(text)} />

      {!isLoading && images.length === 0 && <h1 className="text-5xl text-center mx-auto mt-32">No Images Found</h1>}

      {isLoading ? (
        <h1 className="text-6xl text-center mx-auto mt-32">Loading...</h1>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {images.map((image) => (
            <ImageCard key={image.id} image={image} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;

//Line 35 - So now we have these cards with these utility classes so now we are going to start fetching
//our data and turning this into a component looping through all the images and outputting all the
//the cards
//Create an API key with pixabay. Create a seperate .env file and put the API key there
//Now we are going to implement state, going to set images to an empty array because it is going to
//be filled with images from the API when we make our call.
//Going to set isLoading to true, so once we are done fetching we set it to false
//Now we are going to useEffect and fetch the url from pixabay, replace the hardcode API key and insert
//.env file information using process.env
//set the hits array to the images to our state, setting our image state to data.hits which is the array
//setisloading to false because we already have the data
//loop through the images in our state and output a card for each one
//Put the images in a grid, line 22, will organize the images nicely
//line 25 - the image is being passed as a prop
//if we want to fetch the data again, we have to set term as a dependancy
//what this means is whenever term changes, fetch will be ran again

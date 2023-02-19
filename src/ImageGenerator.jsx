import React, { useState } from "react";
import axios from "axios";
import Loader from "./Loader";

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
      setIsLoading(true);
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/images/generations",
        {
          n: 2,
          prompt,
          size: "256x256",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          },
        }
      );
        setImageUrl(response.data.data[0].url);
        setIsLoading(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      {isLoading !== true ? <form onSubmit={handleSubmit} className="main">
        <label className="label">
          <input
            type="text"
            placeholder="Enter prompt here!"
            value={prompt}
            className="input"
            onChange={(event) => setPrompt(event.target.value)}
          />
        </label>
        <button type="submit" className="shadow__btn">
          Generate Image
        </button>
      </form> : <Loader/>}
      {imageUrl && <img src={imageUrl} alt="Generated Image" />}
    </div>
  );
};

export default ImageGenerator;

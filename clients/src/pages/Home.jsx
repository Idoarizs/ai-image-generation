import React, { useState } from 'react';

// Import Assets
import { preview } from '../assets/index';

// Import Components & Utils
import { FormField, Loader } from '../components/index';
import { getRandomPrompt } from '../utils/getRandomPrompt';

const Home = () => {
  const [generatingImg, setGeneratingImg] = useState(false);
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: ''
  });

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch('http://localhost:8080/api/v1/dalle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: form.prompt
          }),
        });

        const data = await response.json()
        console.log(data.photo)
        // setForm({ ...form, photo: `data:image/jpeg;url,${data.photo}` });
      } catch (err) {
        console.log(err)
      } finally {
        setGeneratingImg(false);
      }
    }

    else {
      alert('Please provide proper prompt');
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRandomPrompt = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  return (
    <section>
      <div>
        <h1 className='font-extrabold text-xl'>Create</h1>
        <p>Create imaginative and visually stunning images through DALL-E AI and share them with the community!</p>
      </div>

      <form>
        <FormField
          labelName='Prompt'
          name='prompt'
          type='text'
          value={form.prompt}
          handleChange={handleChange}
          placeholder='e.g An armchair in the shape of an avocado'
          isRandomPrompt={true}
          handleRandomPrompt={handleRandomPrompt}
        />

        <div className="relative mt-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
          {form.photo ? (
            <img
              src={form.photo}
              alt={form.prompt}
              className="w-full h-full object-contain"
            />
          ) : (
            <img
              src={preview}
              alt="preview"
              className="w-9/12 h-9/12 object-contain opacity-40"
            />
          )}

          {generatingImg && (
            <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
              <Loader />
            </div>
          )}
        </div>

        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className="text-white bg-green-700 hover:bg-green-600 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center transition-all duration-300 ease-out"
          >
            {generatingImg ? 'Generating...' : 'Generate'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Home;

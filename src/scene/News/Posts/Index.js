import React, { useState } from 'react';
import axios from 'axios';
import './index.css';

export default function Index() {
  const [isSubmit, setIsSubmit] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const formData = new FormData(e.target);
    const data = {
      picture: formData.get('images'),
      discription: formData.get('discription'),
    };

    console.log(data);

    await axios.post('http://localhost:5001/post', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        console.log("Data stored successfully");
        e.target.reset();

        setIsSubmit(true);
        
        setTimeout(() => {
          playSound();
        }, 1000);

        setTimeout(() => {
          setIsSubmit(false);
        }, 3000);
      })
      .catch(err => {
        console.error('Error storing data:', err);
      });
  };

  const playSound = () => {
    const sound = new Audio('http://localhost:5001/public/sound/send.mp3');
    sound.play().catch(error => console.error('Error playing sound:', error));
  };

  return (
    <form className='upload-post-container' onSubmit={handleSubmit}>
      <input type='file' name='images' required />
      <div style={{'display':'flex','alignItems':'center','gap':'20px','justifyContent':'center'}}>
        <textarea rows='3' cols='60' placeholder='Description about news' name='discription' required></textarea>
        <button type='submit'>Post</button>
      </div>

      {isSubmit && (
        <div className='data-posted'>
          <div className='data-posted-container'>
            <div className='tick-mark'></div>
            <p>Your news has been posted successfully</p>
          </div>
        </div>
      )}
    </form>
  );
}

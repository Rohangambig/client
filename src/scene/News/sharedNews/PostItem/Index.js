import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './index.css';

export default function Index() {
  const [sharedPost, setSharedPosts] = useState(null); 
  const { postId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`http://localhost:5001/news/sharedPost/${postId}`);
        const post = result.data.post;
        
        try {
          const userRes = await axios.get(`http://localhost:5001/user/${post.userId}`);
          const currentDate = new Date();
          const postDate = new Date(post.createdAt);
          const timeDifference = calculateTimeDifference(currentDate, postDate);

          setSharedPosts({
            ...post,
            userName: userRes.data.userName,
            userPicture: userRes.data.userPicture,
            timeDifference, 
          });
        } catch (err) {
          console.log("Error in fetching user data", err);
          setSharedPosts({
            ...post,
            userName: 'Unknown User',
            userPicture: 'default.jpg',
            timeDifference: 'Unknown time', 
          });
        }
      } catch (err) {
        console.log("Got an error", err);
      }
    };

    fetchData();
  }, [postId]);

  const calculateTimeDifference = (currentDate, postDate) => {
    const differenceInMs = currentDate - postDate;
    const differenceInMinutes = Math.floor(differenceInMs / 60000);
  
    if (differenceInMinutes < 60) {
      return `${differenceInMinutes} minute${differenceInMinutes !== 1 ? 's' : ''} ago`;
    } else if (differenceInMinutes < 1440) { 
      const hours = Math.floor(differenceInMinutes / 60);
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else if (differenceInMinutes < 43200) { 
      const days = Math.floor(differenceInMinutes / 1440);
      return `${days} day${days !== 1 ? 's' : ''} ago`;
    } else if (differenceInMinutes < 518400) { 
      const months = Math.floor(differenceInMinutes / 43200);
      return `${months} month${months !== 1 ? 's' : ''} ago`;
    } else { 
      const years = Math.floor(differenceInMinutes / 518400);
      return `${years} year${years !== 1 ? 's' : ''} ago`;
    }
  };

  if (!sharedPost) {
    return <div>Loading...</div>;
  }

  return (
    <div className='shared-container'>
        <div className='user-shareNews-profiles' >
            <div style={{'display':'flex','gap':'20px'}}>
                <img
                src={`http://localhost:5001/public/assets/${sharedPost.userPicture}`}
                alt='userProfile'
                className='profile-image'
              />
                <p>{sharedPost.userName}</p>
            </div>
            <p>{sharedPost.timeDifference}</p>
        </div>
      <img 
        src={`http://localhost:5001/public/news/${sharedPost.picture}`}
        alt='postImage'
        className='post-image'
      />
      <p><strong>Description:</strong> {sharedPost.discription}</p>
    </div>
  );
}

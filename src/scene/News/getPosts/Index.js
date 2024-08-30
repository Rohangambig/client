import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import MenuBar from '../MenuBar/Index'
import './index.css';
import CopiedGif from './copy.gif';

const socket = io('http://localhost:5001');

export default function Index() {
  const [allPosts, setAllPosts] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const [likedPosts, setLikedPosts] = useState(new Set()); 
  const [copiedLink, setCopyLink] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5001/post/allpost');
        const postsWithUserDetails = await Promise.all(
          res.data.allPost.reverse().map(async (post) => {
            try {
              const userRes = await axios.get(`http://localhost:5001/user/${post.userId}`);
              const currentDate = new Date();
              const postDate = new Date(post.createdAt);
              const timeDifference = calculateTimeDifference(currentDate, postDate);

              return {
                ...post,
                userName: userRes.data.userName,
                userPicture: userRes.data.userPicture,
                timeDifference,
              };
            } catch (err) {
              console.log("Error in fetching user data", err);
              return {
                ...post,
                userName: 'Unknown User',
                userPicture: 'default.jpg',
                timeDifference: 'Unknown time',
              };
            }
          })
        );
        setAllPosts(postsWithUserDetails);

        const likedPostsFromStorage = new Set(JSON.parse(localStorage.getItem('likedPosts')) || []);
        setLikedPosts(likedPostsFromStorage);
      } catch (err) {
        console.log("Error in fetching the data", err);
      }
    };

    fetchData();

    
    socket.on('newPost', (newPost) => {
      fetchData(); 
    });

    const intervalId = setInterval(() => {
      setAllPosts((prevPosts) =>
        prevPosts.map((post) => ({
          ...post,
          timeDifference: calculateTimeDifference(new Date(), new Date(post.createdAt)),
        }))
      );
    }, 1000);

    return () => {
      clearInterval(intervalId);
      socket.off('newPost');
    };

  }, []);

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

  const handleLikes = async (postId) => {
    try {
        const token = localStorage.getItem('token');
        const res = await axios.post(`http://localhost:5001/post/like/${postId}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

  
        setLikedPosts((prevLikedPosts) => {
            const newLikedPosts = new Set(prevLikedPosts);
            if (newLikedPosts.has(postId)) {
                newLikedPosts.delete(postId);
            } else {
                newLikedPosts.add(postId);
            }
            localStorage.setItem('likedPosts', JSON.stringify([...newLikedPosts]));
            return newLikedPosts;
        });

        setAllPosts((prevPosts) =>
            prevPosts.map((post) =>
                post._id === postId ? { ...post, likes: res.data.likes } : post
            )
        );
    } catch (err) {
        console.log("Error in liking the post", err);
    }
};



  const handleCopyLink = (id) => {
    navigator.clipboard.writeText(`http://localhost:3000/news/sharedPost/${id}`);
    setIsSubmit(true);
    setCopyLink(String(id))
    setTimeout(() => {
      setIsSubmit(false);
    }, 2500);
  };

  return (
    <div className='all-post-container'>
      {allPosts.map((post, index) => (
        <div key={index} className='post-item'>
          <div className='post-user-item'>
            <img
              src={`http://localhost:5001/public/assets/${post.userPicture}`}
              alt='userProfile'
            />
            <p>{post.userName}</p>
          </div>

          {post.picture.endsWith('.mp4') ? (
            <video className='all-user-post'
              src={`http://localhost:5001/public/news/${post.picture}`}
              alt='postVideo'
              controls
              onError={(e) => { e.target.poster = 'fallback-image.jpg'; }}
            >
              Sorry, your browser doesn't support embedded videos.
            </video>
          ) : (
            <img 
              className='all-user-post'
              src={`http://localhost:5001/public/news/${post.picture}`}
              alt='postImage'
            />
          )}

          <div className='likes-share-post'>
            <div style={{'display':'flex','gap':'10px','justifyContent':'center','alignItems':'center'}}>
              <i
                onClick={() => handleLikes(post._id)}
                className={`bx ${likedPosts.has(post._id) ? 'bxs-heart' : 'bx-heart'}`}
              ></i><p>{post.likes > 1000 ?(post.likes/1000)+"K":post.likes}</p>
              <i className={copiedLink === post._id ? "bx bx-copy-alt":"bx bx-link"} onClick={() => handleCopyLink(post._id)}></i>{copiedLink ===  post._id && <p>copied</p>}
            </div>
            <p>{post.timeDifference}</p> 
          </div>
          <p><strong>Description</strong>: {post.discription}</p>
        </div>
      ))}
      <span>Enjoy your day bud ..!</span>
      <MenuBar></MenuBar>

      {isSubmit && (
        <div className='data-posted'>
          <div className='data-link-container'>
            <img src={CopiedGif} alt='gifFile'></img>
            <p>Link copied</p>
          </div>
        </div>
      )}
    </div>
  );
}

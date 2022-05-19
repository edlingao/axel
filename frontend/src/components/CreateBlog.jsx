import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import axios from '../axios/axios';
import routes from '../axios/routes';
import { setAllBlogs } from '../store/blogsSlice';

const Container = styled.form`
  background: rgba(20, 33, 61, 0.5);
  box-shadow: inset 0px 0px 20px 5px rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  margin-top: 1.25rem;

  width: 60%;
  height: auto;
  padding: 1.25rem;

  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: stretch;
  position: relative;

  .comment,
  .title{
    width: 100%;
    outline: none;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 5px;
    border: 0;
    padding: 0.313rem;
    color: white;
    &::placeholder {
      color: white;
    }
  }
  .title { 
    font-size: 1.5rem;
    margin-bottom: 0.625rem;
    font-weight: 200;
    font-weight: 600;
  }
  .comment {
    resize: none;
    height: 6rem;
    font-size: 1rem;
    font-weight: 600;
  }

  .submit-button {
    position: absolute;
    background: #14213D;
    border: 0;
    color: white;
    width: 2.563rem;
    height: 2.563rem;
    border-radius: 50%;
    font-size: 0;

    bottom: .5rem;
    right: .5rem;
    cursor: pointer;
    outline: none;
  }
  @media screen and (max-width: 800px) {
    width: 100%;
  }
`;
export default function CreateBlog() {
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();

  const publishBlog = (e) => {
    if (title === '' || comment === '') return;
    e.preventDefault();
    axios.post(routes.createPosts, {
      title,
      body: comment,
      user_id: 1,
    }).then(() => {
      axios.get(routes.getPosts).then((response) => {
        dispatch(setAllBlogs(response.data));
      });
    });
  };
  return (
    <Container>
      <label htmlFor="title">
        <input onChange={(e) => setTitle(e.target.value)} className="title" type="text" placeholder="Tell the world what are you exposing" required />
      </label>
      <label htmlFor="comment">
        <textarea onChange={(e) => setComment(e.target.value)} className="comment" placeholder="Great! Now elaborate..." required />
      </label>
      <button className="submit-button" type="submit" onClick={publishBlog}>
        <i className="material-icons">send</i>
      </button>
    </Container>
  );
}

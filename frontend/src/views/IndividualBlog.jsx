/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import BlogComponent from '../components/Blog';
import axios from '../axios/axios';
import routes from '../axios/routes';
import NavBar from '../components/NavBar';

const MainBlogsContainer = styled.div`
width: 100%;
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
`;

export default function Blog({ match: { params: { id } } }) {
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');

  useEffect(async () => {
    // Your code here
    const response = await axios.get(routes.getPost(id));
    const { data: { body: postComment, title: postTitle } } = response;
    setTitle(postTitle);
    setComment(postComment);
  }, [title, comment]);
  return (
    <MainBlogsContainer>
      <NavBar />
      <BlogComponent title={title} id={parseInt(id, 10)} comment={comment} full />
    </MainBlogsContainer>
  );
}

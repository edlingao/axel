import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import propType from 'prop-types';
import { useHistory } from 'react-router-dom';
import ContentEditable from 'react-contenteditable';
import Button from './Button';
import axios from '../axios/axios';
import routes from '../axios/routes';
import toastr from '../toastr/toastr';

const Blog = styled.div`
  background: rgba(20, 33, 61, 0.5);
  box-shadow: inset 0px 0px 20px 5px rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  width: 60%;
  min-height: 20rem;
  margin: auto;
  margin-top: 1.25rem;
  padding: 0.5rem 1.875rem;
  position: relative;

  ${({ full }) => (!full ? 'cursor: pointer;' : '')}
  h1.title{
    text-align: center;
    font-size: 2.25rem;
    font-weight: 700;
  }
  .description {
    white-space: pre-wrap;
    font-weight: 400;
    font-size: 1.5rem;
    word-break: break-all;
    width: 100%;
  }
  .title,
  .description {
    color: white;
  }

  .controls-section {
    position: absolute;
    z-index: -1;
    top: -1rem;
    left: -1rem;

    display: flex;
    justify-content: space-between;
    align-items: center;

    width: calc(100% + 2rem);
  }

  @media screen and (max-width: 800px) {
    width: 100%;
    .controls-section {
      width: 99%;
      left: 0.25%;
    }
  }

`;

export default function BlogComponent({
  title,
  comment,
  full,
  id,
  controlls,
}) {
  const history = useHistory();
  const [edit, setEdit] = useState(false);
  const [editableTitle, setTitle] = useState(title);
  const [editableComment, setComment] = useState(comment);
  const titleRef = React.createRef();
  const showBlog = () => {
    if (!full) {
      history.push(`/blog/${id}`);
    }
  };
  const deletePost = async () => {
    await axios.delete(routes.deletePost(id));
    toastr.success('Post deleted succesfully');
    history.push('/');
  };
  const editPost = () => {
    setEdit(!edit);
    if (!edit) {
      // NOTE: This doesn't make any sense,I know. but some how it works?
      // here is the context if you want to laugh a little bit: https://stackoverflow.com/a/37162116
      const titleEl = titleRef.current;
      setTimeout(() => {
        titleEl.focus();
      }, 0);
    } else {
      axios.put(routes.editPost(id), {
        post: {
          title: editableTitle,
          comment: editableComment,
        },
      }).then(() => {
        history.push(`/blog/${id}`);
        toastr.success('Blog succesfully updated!');
      }).catch((err) => {
        toastr.error(err);
      });
    }
  };

  useEffect(async () => {
    setTitle(title);
    setComment(comment);
  }, [title, comment]);
  return (
    <Blog onClick={showBlog} full={full}>
      <h1 className="title">
        <ContentEditable
          html={editableTitle}
          disabled={!edit}
          onChange={(e) => setTitle(e.target.value)}
          innerRef={titleRef}
        />
      </h1>
      <div className="description">
        <ContentEditable
          html={editableComment}
          disabled={!edit}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      {controlls ? (
        <div className="controls-section">
          <Button circle bgColor="#D94E4E" height="3rem" width="3rem" onClick={deletePost}>
            <i className="material-icons" style={{ fontSize: 50 }}>delete</i>
          </Button>
          <Button circle height="3rem" width="3rem" bgColor="black" onClick={editPost}>
            {!edit
              ? <i className="material-icons" style={{ fontSize: 40, color: '#FCA311' }}>edit</i>
              : <i className="material-icons" style={{ fontSize: 40, color: '#FCA311' }}>save</i> }
          </Button>
        </div>
      ) : ''}
    </Blog>
  );
}

BlogComponent.defaultProps = {
  full: false,
  controlls: false,
};

BlogComponent.propTypes = {
  title: propType.string.isRequired,
  comment: propType.string.isRequired,
  full: propType.bool,
  id: propType.number.isRequired,
  controlls: propType.bool,
};

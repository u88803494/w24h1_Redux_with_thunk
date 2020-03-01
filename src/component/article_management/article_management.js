import React, { useState, useEffect } from 'react';
import DeleteWindow from './delete_window';
import EditingWindow from './editing_window';
import './article_management.css';


const ArticleManagement = props => {
  return (
    <>
      {
        props.method === 'delete' ?
          <DeleteWindow {...props} /> : < EditingWindow {...props} /> /** 之後可能要改一下，需要 unmount 才能清空內容 */
      }
    </>
  )
}

export default ArticleManagement;
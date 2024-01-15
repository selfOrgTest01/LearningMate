import axios from 'axios';
import { localDomain } from '../config/config';

const commentsApi = {
  getCommentList: async (course_id) => {
    try {
      const response = await axios.get(`${localDomain}/comments/lecture-comment-list/${course_id}`);
      return response;
    } catch (error) {
      return error;
    }
  },
  insertComment: async (submitData) => {
    try {
      const response = await axios.post('http://localhost:8000/comments/insert', submitData);
      return response;
    } catch (error) {
      return error;
    }
  },
  deleteComments: async (comment_id) => {
    try {
      const response = await axios.delete(`${localDomain}/comments/delete/${comment_id}`);
      return response;
    } catch (error) {
      return error;
    }
  },
};

export default commentsApi;

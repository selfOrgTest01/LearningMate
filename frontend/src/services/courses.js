import axios from 'axios';
import { localDomain } from '../config/config';

const coursesApi = {
  // 강의 전체 리스트 get
  getCourseList: async () => {
    try {
      const response = await axios.get(`${localDomain}/courses/courseList`);
      return response;
    } catch (error) {
      return error;
    }
  },
  // 강의 세부 정보 get
  getCourse: async (course_id, user_id) => {
    try {
      const response = await axios.get(`${localDomain}/courses/course/${course_id}`, {
        params: { userId: user_id },
      });
      return response;
    } catch (error) {
      return error;
    }
  },
  // 강의 삭제 delete통신
  deleteCourse: async (course_id) => {
    try {
      const response = await axios.delete(`${localDomain}/courses/delete/${course_id}`);
      return response;
    } catch (error) {
      return error;
    }
  },
};

export default coursesApi;

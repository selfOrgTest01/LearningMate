import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router';
import { localDomain } from '../../config/config';

export default function LectureDetail() {
  const course_id = useParams().courseid;
  const [videoPath, setVideoPath] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  const getLectureDetail = useCallback(async () => {
    try {
      const resp = await axios.get(`${localDomain}/courses/course/${course_id}`);
      console.log(resp.data.data[0]);
      setVideoPath(resp.data.data[0].attach_file_path);
      setTitle(resp.data.data[0].title);
      setContent(resp.data.data[0].content);
    } catch (error) {
      console.error('Error fetching lecture detail:', error);
    } finally {
      setLoading(false);
    }
  }, [course_id]);

  useEffect(() => {
    getLectureDetail();
  }, [getLectureDetail, course_id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Container style={{ width: '50%' }}>
        <h1 className='display-1 text-center' style={{ marginTop: 50 }}>
          {title}
        </h1>
        <video controls style={{ width: '100%' }}>
          <source src={videoPath} type='video/mp4' />
        </video>
        <Container style={{ width: '100%' }}>
          <h2>{content}</h2>
        </Container>
      </Container>
    </>
  );
}

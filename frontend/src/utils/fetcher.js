
import axios from 'axios';

const fetcher = async (url, options = {}) => {
  try {
    const response = await axios.get(url, { withCredentials: true, ...options });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Re-throw the error to be caught by the calling code
  }
};

export default fetcher;
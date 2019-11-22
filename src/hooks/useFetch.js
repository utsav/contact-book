import { useEffect, useState } from 'react';

const useFetch = (url) => {
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const resData = await response.json();
        setData(resData);
      } catch (e) {
        setErrors(e);
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);

  return {
    loading,
    data,
    errors,
  };
};

export default useFetch;

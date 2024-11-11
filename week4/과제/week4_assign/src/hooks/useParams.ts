import React, { useState } from 'react';

interface props {
  initParams: object;
}

export const useParams = ({ initParams }: props) => {
  const [params, setParams] = useState(initParams);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParams({
      ...params,
      [e.target.name]: e.target.value,
    });
  };

  return { params, handleChange };
};

import React, { useState } from 'react';

export const useParams = <T extends object>(initialValues: T) => {
  const [params, setParams] = useState<T>(initialValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParams({
      ...params,
      [e.target.name]: e.target.value,
    });
  };

  return { params, handleChange };
};

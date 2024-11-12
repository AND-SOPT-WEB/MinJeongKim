import React, { useState } from 'react';

export const useParams = <T extends object>(initialValues: T) => {
  const [params, setParams] = useState<T>(initialValues);

  const handleEventChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParams({
      ...params,
      [e.target.name]: e.target.value,
    });
  };

  const handleChange = (key: string, value: string) => {
    setParams({
      ...params,
      [key]: value,
    });
  };

  return { params, handleEventChange, handleChange };
};

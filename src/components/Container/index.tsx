import React, { FunctionComponent } from 'react';

type TContainer = {
  classValue?: string;
  children: React.ReactNode;
};

const Container: FunctionComponent<TContainer> = ({
  children,
  classValue = '',
}) => {
  return (
    <div className={`p-10 lg:px-40 shadow-xl grid ${classValue}`}>
      {children}
    </div>
  );
};

export default Container;

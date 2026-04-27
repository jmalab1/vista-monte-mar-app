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
    <div className="section-frame">
      <div className={`sunset-panel flex flex-col gap-8 p-6 sm:p-8 lg:p-10 ${classValue}`}>
        {children}
      </div>
    </div>
  );
};

export default Container;

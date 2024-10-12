import React from 'react';
import { FunctionComponent } from 'react';

type TSectionHeader = {
  title: string;
  children?: React.ReactNode;
  centerText?: boolean;
};

const SectionHeader: FunctionComponent<TSectionHeader> = ({
  title,
  children,
  centerText,
}) => {
  return (
    <>
      <div className={centerText ? 'place-content-center text-center' : ''}>
        <h1 className="text-secondary text-4xl font-bold mt-10">{title}</h1>
        {children}
      </div>
    </>
  );
};

export default SectionHeader;

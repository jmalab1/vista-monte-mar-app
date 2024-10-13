import React from 'react';
import { FunctionComponent } from 'react';

type TSectionHeader = {
  title: string;
  children?: React.ReactNode;
  centerText?: boolean;
  textSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
};

const SectionHeader: FunctionComponent<TSectionHeader> = ({
  title,
  children,
  centerText,
  textSize,
}) => {
  return (
    <>
      <div className={centerText ? 'place-content-center text-center' : ''}>
        <h1
          className={`text-secondary ${textSize ? 'text-' + textSize : 'text-4xl'} font-bold mt-10 font-pacifico`}
        >
          {title}
        </h1>
        {children}
      </div>
    </>
  );
};

export default SectionHeader;

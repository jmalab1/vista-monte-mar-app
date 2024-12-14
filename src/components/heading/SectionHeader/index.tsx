import React from 'react';
import { FunctionComponent } from 'react';
import HorizontalLine from '../../HorizontalLine';

type TSectionHeader = {
  title: string;
  children?: React.ReactNode;
  centerText?: boolean;
  textSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  horizontalLine?: boolean;
};

const SectionHeader: FunctionComponent<TSectionHeader> = ({
  title,
  children,
  centerText,
  textSize,
  horizontalLine,
}) => {
  return (
    <>
      <div className={centerText ? 'place-content-center text-center' : ''}>
        <h1
          className={`text-secondary ${textSize ? 'text-' + textSize : 'text-4xl'} font-bold mt-14 font-pacifico`}
        >
          {title}
        </h1>
        {horizontalLine && <HorizontalLine />}
        {children}
      </div>
    </>
  );
};

export default SectionHeader;

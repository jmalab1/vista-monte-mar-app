import React from 'react';
import { FunctionComponent } from 'react';
import HorizontalLine from '../../HorizontalLine';

type TSectionHeader = {
  title: string;
  children?: React.ReactNode;
  centerText?: boolean;
  textSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  horizontalLine?: boolean;
  classValue?: string;
  headerPadding?: number;
};

const SectionHeader: FunctionComponent<TSectionHeader> = ({
  title,
  children,
  centerText,
  textSize,
  horizontalLine,
  classValue,
  headerPadding = 14,
}) => {
  let classNamePlus = classValue ? classValue : '';

  if (centerText) {
    classNamePlus += ' place-content-center text-center';
  }

  return (
    <>
      <div className={`mt-${headerPadding} ${classNamePlus} ${classValue}`}>
        <h1
          className={`text-secondary ${textSize ? 'text-' + textSize : 'text-4xl'} font-bold font-pacifico`}
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

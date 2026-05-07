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
  contentClassValue?: string;
};

const SectionHeader: FunctionComponent<TSectionHeader> = ({
  title,
  children,
  centerText,
  textSize,
  horizontalLine,
  classValue,
  headerPadding = 14,
  contentClassValue = 'mt-5',
}) => {
  let classNamePlus = classValue ? classValue : '';

  if (centerText) {
    classNamePlus += ' place-content-center text-center';
  }

  return (
    <>
      <div
        className={classNamePlus}
      >
        <h1
          className={`font-pacifico text-[#d48a58] ${textSize ? 'text-' + textSize : 'text-4xl sm:text-5xl'}`}
        >
          {title}
        </h1>
        {horizontalLine && <HorizontalLine />}
        {children && <div className={contentClassValue}>{children}</div>}
      </div>
    </>
  );
};

export default SectionHeader;

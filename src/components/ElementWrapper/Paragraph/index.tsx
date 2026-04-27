import { FunctionComponent } from 'react';

type TParagraph = {
  children: React.ReactNode;
  classValue?: string;
};

const Paragraph: FunctionComponent<TParagraph> = ({ children, classValue }) => {
  return (
    <>
      <p className={`my-3 text-base leading-7 text-slate-600 ${classValue}`}>{children}</p>
    </>
  );
};

export default Paragraph;

import { FunctionComponent } from 'react';

type TParagraph = {
  children: React.ReactNode;
  classValue?: string;
};

const Paragraph: FunctionComponent<TParagraph> = ({ children, classValue }) => {
  return (
    <>
      <p className={`text-md mt-3 mb-3 ${classValue}`}>{children}</p>
    </>
  );
};

export default Paragraph;

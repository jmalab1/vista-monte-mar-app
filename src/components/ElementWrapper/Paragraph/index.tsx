import { FunctionComponent } from 'react';

type TParagraph = {
  children: React.ReactNode;
};

const Paragraph: FunctionComponent<TParagraph> = ({ children }) => {
  return (
    <>
      <p className={`text-md mt-5`}>{children}</p>
    </>
  );
};

export default Paragraph;

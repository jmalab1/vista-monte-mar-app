import { FunctionComponent } from 'react';

type TButton = {
  title: string;
  classValue: string;
  type: "submit" | "button";
};

const ButtonItem: FunctionComponent<TButton> = ({ title, classValue, type }) => {
  return (
    <button type={type} className={`btn btn-sm ${classValue}`} >
      {title}
    </button>
  );
};

export default ButtonItem;

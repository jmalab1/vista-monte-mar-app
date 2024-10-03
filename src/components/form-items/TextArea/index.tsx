import { ChangeEventHandler, FunctionComponent } from 'react';

type TTextArea = {
  title: string;
  id: string;
  placeholder: string;
  callback: ChangeEventHandler;
};

const TextArea: FunctionComponent<TTextArea> = ({ title, id, placeholder, callback }) => {
  return (
    <label className="form-control col-span-full">
      <div className="label">
        <span className="label-text">{title}</span>
        <span className="label-text-alt"></span>
      </div>
      <textarea
        className="textarea textarea-bordered h-32"
        id={id}
        name={id}
        placeholder={placeholder}
        onChange={callback}
      ></textarea>
      <div className="label">
        <span className="label-text-alt"></span>
        <span className="label-text-alt"></span>
      </div>
    </label>
  );
};

export default TextArea;

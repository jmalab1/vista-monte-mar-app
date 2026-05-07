import React, { FunctionComponent } from 'react';

type TConnectedButtons = {
  children: React.ReactNode;
};

const ConnectedButtons: FunctionComponent<TConnectedButtons> = ({
  children,
}) => {
  return <ul className="flex flex-col min-w-screen mb-4">{children}</ul>;
};

export default ConnectedButtons;

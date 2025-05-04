import React from "react";

export const createContext = <T extends {}>() => {
  const Context = React.createContext<T | undefined>(undefined);

  const useContext = () => {
    const context = React.useContext(Context);

    if (context === undefined) {
      throw Error("Context has undefined value. Value must be provided.");
    }

    return context;
  };

  return [useContext, Context.Provider] as const;
};

"use client";

import { store } from "@/redux/store";
import { ReactNode } from "react";
import { Provider as ReduxProvider } from "react-redux";

interface Props {
  children: ReactNode;
}

export const Provider = ({ children }: Props) => {
  return <ReduxProvider store={store}>{children}</ReduxProvider>;
};

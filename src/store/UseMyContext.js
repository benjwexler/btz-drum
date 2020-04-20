
import React, {useContext} from 'react';
import { Context } from "./Context";

export default function useMyContext() {
  return useContext(Context)
}
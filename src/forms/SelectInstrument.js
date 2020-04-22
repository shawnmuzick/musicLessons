import React from "react";
import { instrumentList } from "./instrumentList";
export default function SelectInstrument({ fn }) {
  const renderInstruments = () => {
    return instrumentList.map((i) => (
      <option name="instrument" value={i}>
        {i}
      </option>
    ));
  };
  return (
    <select name="instrument" onChange={fn}>
      <option value="">Select An Instrument</option>
      {renderInstruments()}
    </select>
  );
}

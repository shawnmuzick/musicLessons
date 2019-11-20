import React from "react";

export default function VIEW({ children, name, view }) {
  if (view === name) {
    return <>{children}</>;
  } else {
    return null;
  }
}

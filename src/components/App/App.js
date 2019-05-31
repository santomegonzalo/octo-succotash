import React from "react";

import Chats from "../Chats";
import ErrorBoundary from "../ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <Chats />
    </ErrorBoundary>
  );
}

export default App;

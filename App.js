import { useEffect, useState } from "react";
import axios from 'axios'
import UsersComp from "./Components/users";

function App() {
  return (
    <div >
      {<UsersComp/>}
    </div>
  );
}

export default App;

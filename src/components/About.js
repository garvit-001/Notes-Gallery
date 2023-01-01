import React, { useContext, useEffect } from "react";
import NoteContext from "../context/notes/NoteContext";

function About() {
  const a = useContext(NoteContext);
  useEffect(() => {
    a.updater();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      About {a.first.state} and about {a.first.update}
    </div>
  );
}

export default About;

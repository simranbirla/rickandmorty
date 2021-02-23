import React, { useState, useEffect, useRef } from "react";
import Card from "./Card";
import Search from "./Search";
import Modal from "./Modal";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [char, setChar] = useState();
  const photosRef = useRef();

  const onScrolling = () => {
    if (
      photosRef.current.getBoundingClientRect().bottom <= window.innerHeight
    ) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", onScrolling);
    return () => {
      document.removeEventListener("scroll", onScrolling);
    };
  }, [page]);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
      .then((data) => data.json())
      .then((res) => setData([...data, ...res.results]));
    return () => {
      setData();
    };
  }, [page]);

  return (
    <div className="App" ref={photosRef}>
      <Search setData={setData} data={data} page={page} setPage={setPage} />
      {data
        ? data.map((res) => {
            return (
              <Card
                id={res.id}
                card={res}
                setChar={setChar}
                setOpen={setOpen}
              />
            );
          })
        : null}
      <Modal open={open} setOpen={setOpen} char={char} setChar={setChar} />
    </div>
  );
}

export default App;

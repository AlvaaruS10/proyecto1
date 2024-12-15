import axios from "axios";
import { useEffect, useState } from "react";
import Form from "./components/Form";
import Post from "./components/Post";

const urlBaseServer = "http://localhost:3000";

function App() {
  const [titulo, setTitulo] = useState("");
  const [imgSrc, setImgSRC] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  const getPosts = async () => {
    try {
      const { data: posts } = await axios.get(urlBaseServer + "/posts");
      setPosts([...posts]);
    } catch (err) {
      console.error("Error al obtener los posts:", err);
    }
  };

  const agregarPost = async () => {
    try {
      const post = { titulo, url: imgSrc, descripcion };
      await axios.post(urlBaseServer + "/posts", post);
      setError(""); 
      getPosts();
    } catch (err) {
      if (err.response && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("Ocurrió un error al intentar agregar el post.");
      }
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="App">
      <h2 className="py-5 text-center">&#128248; Like Me &#128248;</h2>
      <div className="row m-auto px-5">
        <div className="col-12 col-sm-4">
          <Form
            setTitulo={setTitulo}
            setImgSRC={setImgSRC}
            setDescripcion={setDescripcion}
            agregarPost={agregarPost}
            error={error} 
          />
        </div>
        <div className="col-12 col-sm-8 px-5 row posts align-items-start">
          {posts.map((post, i) => (
            <Post
              key={i}
              post={post}
              like={() => console.log("Like!")} // Esto es para el siguiente desafío
              eliminarPost={() => console.log("Eliminar!")} // Esto es para el siguiente desafío
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;


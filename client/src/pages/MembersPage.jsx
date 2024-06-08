import { useContext, useState } from "react";
import Article from "../components/common/Article";
import { AuthContext } from "../context/AuthContext";

const MembersPage = () => {
  const { isAuthenticated } = useContext(AuthContext);

  const [articles, setArticles] = useState([
    {
      id: 1,
      title: "Reunión de la Asociación",
      author: "Maria Gonzalez",
      date: "2024-06-05",
      content: `
        Queridos miembros,

        Nos complace anunciar que tendremos una reunión de la asociación el próximo lunes. En esta reunión, discutiremos los avances recientes en la investigación de la ELA y compartiremos experiencias y consejos para mejorar la calidad de vida de nuestros seres queridos. La reunión se llevará a cabo en el salón principal del centro comunitario a las 18:00. ¡Esperamos verlos a todos allí!

        Saludos,
        Maria Gonzalez
      `,
    },
    {
      id: 2,
      title: "Excursión al Parque Natural",
      author: "Juan Perez",
      date: "2024-06-04",
      content: `
        Hola a todos,

        Estamos organizando una excursión al Parque Natural para todos los miembros de la asociación y sus familias. Será una excelente oportunidad para disfrutar de la naturaleza, relajarse y fortalecer los lazos entre nosotros. La excursión será el próximo sábado a las 9:00. Por favor, confirmen su asistencia antes del jueves para que podamos coordinar el transporte y las actividades.

        Un abrazo,
        Juan Perez
      `,
    },
  ]);

  const [newArticle, setNewArticle] = useState({
    title: "",
    author: "",
    date: "",
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewArticle((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newId = articles.length ? articles[articles.length - 1].id + 1 : 1;
    const articleToAdd = { id: newId, ...newArticle };
    setArticles((prevArticles) => [...prevArticles, articleToAdd]);
    setNewArticle({ title: "", author: "", date: "", content: "" });
  };

  return (
    <div>
      <h1 className="text-center mt-2 font-serif text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to bg-white">
        Información de los Miembros de la Asociación
      </h1>
      <div className="space-y-8 mt-2">
        {articles.map((article) => (
          <Article
            key={article.id}
            title={article.title}
            author={article.author}
            date={article.date}
            content={article.content}
          />
        ))}
      </div>
      {isAuthenticated && (
        <div className="mt-4">
          <h2 className="text-center mt-2 font-serif text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to bg-white">
            Crear Nuevo Artículo
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="title"
              value={newArticle.title}
              onChange={handleChange}
              placeholder="Título"
              className="w-full p-2 border rounded text-black"
              required
            />
            <input
              type="text"
              name="author"
              value={newArticle.author}
              onChange={handleChange}
              placeholder="Autor"
              className="w-full p-2 border rounded text-black"
              required
            />
            <input
              type="date"
              name="date"
              value={newArticle.date}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
              required
            />
            <textarea
              name="content"
              value={newArticle.content}
              onChange={handleChange}
              placeholder="Contenido"
              className="w-full p-2 border rounded text-black"
              rows="5"
              required
            />
            <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                Agregar Artículo
              </span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default MembersPage;

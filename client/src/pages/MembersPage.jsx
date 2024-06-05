import Article from "../components/common/Article";

const members = () => {
  const articles = [
    {
      Id: 1,
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
  ];
  return (
    <div>
      <h1 className=" text-center  mt-2 font-serif text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to bg-white ">
        Informacion de los Miembros de la Asociacion
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
    </div>
  );
};

export default members;

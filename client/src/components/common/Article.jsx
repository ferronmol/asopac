const Article = ({ title, author, date, content }) => {
  return (
    <div
      className="p-6 bg-slate-300
     shadow-md rounded-lg mb-4"
    >
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600 mb-4">
        Por {author} el {date}
      </p>
      <p className="text-gray-800 whitespace-pre-line">{content}</p>
    </div>
  );
};

export default Article;

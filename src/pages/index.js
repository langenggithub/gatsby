const IndexPage = ({ comments }) => {
  return (
    <main>
      <h1>文章標題</h1>
      <p>這是一篇部落格文章。</p>

      <h2>評論區</h2>
      {comments.length > 0 ? (
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>
              <strong>{comment.name}</strong> ({new Date(comment.created_at).toLocaleDateString()}):<br />
              {comment.message}
            </li>
          ))}
        </ul>
      ) : (
        <p>還沒有評論，成為第一個留言的人吧！</p>
      )}
    </main>
  );
};

// ✅ Only one default export
export default IndexPage;

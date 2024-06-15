import { useState } from 'react';
import { ArticleInput, ArticleOutput, ExportExcel, Header } from './components';

const App = () => {
  const [article, setArticle] = useState('');
  const [tags, setTags] = useState([]);

  return (
    <main className="relative flex min-h-screen flex-col bg-background">
      <Header />
      <section className="flex h-full w-full flex-1 flex-row p-2 max-md:flex-col">
        <ArticleInput
          article={article}
          setArticle={setArticle}
          setTags={setTags}
        />
        <ArticleOutput article={article} tags={tags} />
      </section>
      <section>
        <ExportExcel tags={tags} />
      </section>
    </main>
  );
};

export default App;

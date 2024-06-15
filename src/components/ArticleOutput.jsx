import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useEffect, useState } from 'react';

const ArticleOutput = ({ article, tags }) => {
  const [taggedText, setTaggedText] = useState('');

  useEffect(() => {
    tags.forEach((tag) => {
      article = article.replace(tag.articleText, tag.taggedText);
    });
    setTaggedText(article);
  }, [tags]);

  return (
    <div className="bg-card-background flex flex-1">
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Tagged Article:</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            id="taggedArticle"
            rows={22}
            placeholder="Tagged Article will be shown here..."
            className="text-lg"
            readOnly={true}
            value={taggedText}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ArticleOutput;

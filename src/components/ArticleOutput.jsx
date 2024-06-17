import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useEffect, useState } from 'react';

const ArticleOutput = ({ article, tags }) => {
  const [taggedArticle, setTaggedArticle] = useState('');

  useEffect(() => {
    let taggedText = article;
    tags.forEach((tag) => {
      let firstPart = taggedText.slice(0, tag.selection.start);
      let lastPart = taggedText.slice(tag.selection.end, article.length);
      taggedText = firstPart + tag.taggedSelection + lastPart;
    });
    setTaggedArticle(taggedText);
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
            value={taggedArticle}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ArticleOutput;

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useEffect, useState } from 'react';

const ArticleOutput = ({ article, tags }) => {
  const [taggedArticle, setTaggedArticle] = useState('');

  useEffect(() => {
    const applyTags = () => {
      let taggedText = article;

      // Apply tags to the article
      tags.forEach((tag) => {
        const { start, end } = tag.selection;
        const tagType = tag.tagType;
        // Insert end tag
        taggedText =
          taggedText.slice(0, end) + `</${tagType}>` + taggedText.slice(end);
        // Insert start tag
        taggedText =
          taggedText.slice(0, start) + `<${tagType}>` + taggedText.slice(start);
      });
      setTaggedArticle(taggedText);
    };
    applyTags();
  }, [article, tags]);

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

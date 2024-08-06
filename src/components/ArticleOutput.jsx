import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useEffect, useState } from 'react';

const ArticleOutput = ({ article, tags }) => {
  const [taggedArticle, setTaggedArticle] = useState('');

  useEffect(() => {
    const applyTags = () => {
      let taggedText = article;
      let offset = 0;

      tags.forEach((tag) => {
        const { start, end } = tag.selection;
        const openTag = `<${tag.tagType}>`;
        const closeTag = `</${tag.tagType}>`;

        const adjustedEnd = end + offset;

        taggedText =
          taggedText.slice(0, start + offset) +
          openTag +
          taggedText.slice(start + offset, adjustedEnd) +
          closeTag +
          taggedText.slice(adjustedEnd);

        offset += openTag.length + closeTag.length;
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

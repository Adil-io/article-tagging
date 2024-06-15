import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { TECHNIQUES } from '@/constants/TECHNIQUES';
import { useState } from 'react';
import Select from 'react-select';

const ArticleInput = ({ article, setArticle, setTags }) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [highlight, setHighlight] = useState('');

  const handleContextMenu = (e) => {
    e.preventDefault();
    resetState();
  };

  const handleMouseUp = (e) => {
    setPosition({
      top: e.pageY,
      left: e.pageX,
    });
    setHighlight(window.getSelection().toString());
  };

  const handleOnChange = (e) => {
    const tag = {
      articleText: highlight,
      taggedText: `<${e.value}>${highlight}</${e.value}>`,
    };
    setTags((prevTags) => [...prevTags, tag]);
    resetState();
  };

  const resetState = () => {
    setHighlight('');
    setPosition({ top: 0, left: 0 });
  };

  return (
    <>
      <div className="bg-card-background flex flex-1">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Input Article:</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              id="inputArticle"
              rows={22}
              placeholder="Paste Article here..."
              className="text-lg"
              value={article}
              onChange={(e) => setArticle(e.target.value)}
              onMouseUp={handleMouseUp}
              onContextMenu={handleContextMenu}
            />
          </CardContent>
        </Card>
      </div>
      {highlight && (
        <div
          className="fixed z-10 w-[200px] rounded-md border-2 border-black bg-primary-foreground p-1"
          style={position}
        >
          <Select
            placeholder="Technique..."
            options={TECHNIQUES}
            autoFocus={true}
            onChange={handleOnChange}
          />
          <p className="mt-1 text-center text-sm font-medium text-accent-foreground">
            Right-click to cancel
          </p>
        </div>
      )}
    </>
  );
};

export default ArticleInput;

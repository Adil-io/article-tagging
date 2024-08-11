import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { TECHNIQUES } from '@/constants/TECHNIQUES';
import { useEffect, useRef, useState } from 'react';
import Select from 'react-select';

const ArticleInput = ({ article, setArticle, setTags }) => {
  const textAreaRef = useRef(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [selection, setSelection] = useState({ text: '', start: 0, end: 0 });

  useEffect(() => {
    const textArea = textAreaRef.current;

    const handleSelection = () => {
      const selectedText = textArea.value.substring(
        textArea.selectionStart,
        textArea.selectionEnd,
      );

      const startPos = textArea.selectionStart;
      const endPos = textArea.selectionEnd;
      setSelection({
        text: selectedText,
        start: startPos,
        end: endPos,
      });
    };

    textArea.addEventListener('mouseup', handleSelection);

    return () => {
      textArea.removeEventListener('mouseup', handleSelection);
    };
  }, []);

  const handleContextMenu = (e) => {
    e.preventDefault();
    resetState();
  };

  const handleOnChange = (e) => {
    const tag = {
      selection,
      tagType: e.value,
    };
    setTags((prevTags) => {
      const sortedTags = [...prevTags, tag].sort(
        (a, b) => a.selection.start - b.selection.start,
      );
      return sortedTags;
    });
    resetState();
  };

  const resetState = () => {
    setSelection({ text: '', start: 0, end: 0 });
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
              ref={textAreaRef}
              rows={22}
              placeholder="Paste Article here..."
              className="text-lg"
              value={article}
              onChange={(e) => setArticle(e.target.value)}
              onMouseUp={(e) =>
                setPosition({
                  top: e.pageY,
                  left: e.pageX,
                })
              }
              onContextMenu={handleContextMenu}
            />
          </CardContent>
        </Card>
      </div>
      {selection.text && (
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

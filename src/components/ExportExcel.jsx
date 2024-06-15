import { Button } from './ui/button';

const ExportExcel = ({ tags }) => {
  return (
    <div className="flex items-center justify-center p-3">
      {tags.length > 0 ? (
        <Button>Export to Excel</Button>
      ) : (
        <Button disabled>Export to Excel</Button>
      )}
    </div>
  );
};

export default ExportExcel;

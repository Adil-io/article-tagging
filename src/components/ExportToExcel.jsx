import { useState } from "react";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { Snackbar, Alert, Button } from "@mui/material";

export const ExportToExcel = ({ apiData, fileName, resetState }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const exportToCSV = (apiData, fileName) => {
    try {
      const ws = XLSX.utils.json_to_sheet(apiData);
      const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const data = new Blob([excelBuffer], { type: fileType });
      FileSaver.saveAs(data, fileName + fileExtension);
    } catch (error) {
      setError(error);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError("");
    resetState();
  };

  return (
    <>
      <Button
        className="box-button"
        type="submit"
        fullWidth
        variant="outline"
        color="primary"
        sx={{ mt: 3, mb: 2 }}
        size="md"
        onClick={(e) => {
          e.preventDefault();
          exportToCSV(apiData, fileName);
        }}
      >
        Export Tags to Excel
      </Button>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={error.length > 0 ? "error" : "success"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {error.length > 0
            ? `Export to Excel FAILED: error = ${error}`
            : `Excel exported successfully! with File Name: ${
                fileName + fileExtension
              }`}
        </Alert>
      </Snackbar>
    </>
  );
};

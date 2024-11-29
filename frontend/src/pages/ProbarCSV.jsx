import { useState } from "react";
import { Button, Container, Typography, Box } from "@mui/material";
import MUIDataTable from "mui-datatables";
import * as XLSX from "xlsx";

const cols = [
  { name: "Sexo", label: "Sexo", options: { filter: true, sort: true }},
  { name: "Somatización", label: "Somatización", options: { filter: true, sort: true } },
  { name: "Sen. Emocio.", label: "Sensibilidad Emocional", options: { filter: true, sort: true } },
  { name: "Obsesión/com", label: "Obsesión Compulsión", options: { filter: true, sort: true } },
  { name: "Depresión", label: "Depresión", options: { filter: true, sort: true } },
  { name: "Ansiedad", label: "Ansiedad", options: { filter: true, sort: true } },
  { name: "Hostilidad", label: "Hostilidad", options: { filter: true, sort: true } },
  { name: "Ans. Fóbica", label: "Ansiedad Fóbica", options: { filter: true, sort: true } },
  { name: "Ideación Paran.", label: "Ideación Paranoide", options: { filter: true, sort: true } },
  { name: "Psicoticismo", label: "Psicoticismo", options: { filter: true, sort: true } },
  { name: "SA45", label: "SA-45", options: { filter: true, sort: true } },
  { name: "Agotamiento", label: "Agotamiento", options: { filter: true, sort: true } },
  { name: "Predicción", label: "Predicción", options: { filter: true, sort: true } },
];

const options = {
  selectableRows: "none",
  filterType: "checkbox",
};

const ProbarCSV = () => {
  const [data, setData] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      // Obtener la primera hoja de trabajo
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // Convertir los datos a JSON
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      const sexoMap = {
        1: 'Hombre',
        2: 'Mujer'
      }
      // Seleccionar la primera columna y las últimas 11 columnas
      const selectedColumns = jsonData.map((row) => {
        const sexo = sexoMap[row[0]] || row[0]
        return [sexo, ...row.slice(-11)]
      })


      // Configurar las filas para MUIDataTable (excluyendo la fila de encabezados)
      setData(selectedColumns.slice(1));
    };

    reader.readAsArrayBuffer(file);
  };

  const handleSendData = async () => {
    // Formatear los datos al formato solicitado
    const formattedData = data.map((row) => {
      const formattedRow = {};
      cols.forEach((col, index) => {
        formattedRow[col.name] = row[index];
      });
      return formattedRow;
    });

    console.log(JSON.stringify(formattedData))
    try {
      const response = await fetch("http://localhost:8000/excel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
      });

      if (response.ok) {
        console.log("Datos enviados correctamente");
      } else {
        console.error("Error al enviar los datos");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };
  
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "10px",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Subir y Mostrar Excel
      </Typography>
      {data.length == 0 && (
        <Button variant="contained" component="label">
          Subir Archivo
          <input type="file" hidden accept=".xlsx, .xls" onChange={handleFileUpload} />
        </Button>
      )}

      {data.length > 0 && (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSendData}
            sx={{ marginTop: 2 }}
          >
            Enviar Datos
          </Button>
          <Box sx={{ height: 400, width: "100%", marginTop: 2 }}>
            <MUIDataTable title="Datos Subidos" data={data} columns={cols} options={options} />
          </Box>
          
        </>
      )}
    </Container>
  );
};

export default ProbarCSV;

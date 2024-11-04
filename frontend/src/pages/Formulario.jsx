import { useState } from 'react';
import { preguntas } from './preguntas';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Typography, Button, Box } from '@mui/material';

const Formulario = () => {
    const [respuestas, setRespuestas] = useState(
        preguntas.reduce((acc, pregunta, index) => ({ ...acc, [index]: '' }), {})
    );

    const handleChange = (index) => (event) => {
        setRespuestas({
            ...respuestas,
            [index]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Respuestas seleccionadas:', respuestas);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, margin: 'auto' }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Evaluación de Preguntas
            </Typography>
            {preguntas.map((pregunta, index) => (
                <FormControl key={index} component="fieldset" sx={{ marginBottom: 2, width: '100%' }}>
                    <FormLabel component="legend">{pregunta}</FormLabel>
                    <RadioGroup
                        value={respuestas[index]}
                        onChange={handleChange(index)}
                        row
                    >
                        <FormControlLabel value="bajo" control={<Radio />} label="Bajo" />
                        <FormControlLabel value="promedio" control={<Radio />} label="Promedio" />
                        <FormControlLabel value="alto" control={<Radio />} label="Alto" />
                        <FormControlLabel value="en riesgo" control={<Radio />} label="En Riesgo" />
                    </RadioGroup>
                </FormControl>
            ))}
            <Button type="submit" variant="contained" color="primary">
                Enviar
            </Button>
        </Box>
    );
};

export default Formulario;

import React, { useContext, useState } from 'react';
import { ModalContext } from '../context/ModalContext';
// Install npm i @material-ui/core
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

function getModalStyle() {
    const top = 50;
    const left = 50;
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        width: 450,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const Receta = ({ receta }) => {
    // Configuracion del modal de materiaul-ui
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    // Configuracion del modal de materiaul-ui

    const { guardarIdReceta, infoReceta, guardarReceta } = useContext(ModalContext);
    // Muestra y formatea los ingredientes
    const mostrarIngredientes = informacion => {
        let ingredientes = [];
        for (let i = 1; i < 16; i++) {
            if (informacion[`strIngredient${i}`]) {
                ingredientes.push(
                    <li key={i}> {informacion[`strIngredient${i}`]}  {informacion[`strMeasure${i}`]}</li>
                )
            }
        }
        return ingredientes;
    }

    return (
        <div className="col-md-4 mb-3">
            <div className="card">
                <h2 className="card-header">{receta.strDrink}</h2>
                <img className="card-img-top" src={receta.strDrinkThumb} alt={receta.strDrink} />
                <div className="card-body">
                    <button
                        type="button"
                        className="btn btn-block btn-primary"
                        onClick={() => {
                            guardarIdReceta(receta.idDrink);
                            handleOpen();
                        }}>
                        Ver receta
                    </button>
                    <Modal
                        open={open}
                        onClose={() => {
                            guardarIdReceta(null);
                            guardarReceta({})
                            handleClose();
                        }}
                    >
                        <div style={modalStyle} className={classes.paper}>
                            <h2>{infoReceta.strDrink}</h2>
                            <h3 className="mt-4">Instrucciones</h3>
                            <p>
                                {infoReceta.strInstructions}
                            </p>

                            <img className="img-fluid my-4" src={infoReceta.strDrinkThumb} alt={infoReceta.strDrink} />

                            <h3>Ingredientes y cantidades</h3>
                            <ul>
                                {mostrarIngredientes(infoReceta)}
                            </ul>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    );
}

export default Receta;
import {useParams} from "react-router-dom";
import React, {ChangeEvent, useState} from "react";
import {Product} from "./Product";
import {toast} from "react-toastify";
import {Category} from "./Category";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, MenuItem,
    TextField
} from "@mui/material";
import SingleProduct from "./SingleProduct";
import "./SingleProduct.css";

type ProductDetailsProps = {
    products: Product[],
    editProduct: (product: Product) => void,
}

export default function ProductDetails(props: ProductDetailsProps) {

    const [productName, setProductName] = useState('');
    const [itemNumber, setItemNumber] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState<Category>();
    const [open, setOpen] = React.useState(false);
    const {id} = useParams();

    const product: Product | undefined = props.products.find(element => element.id === id);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleEditProduct = () => {
        if (props.products && product) {
            const updatedProduct: Product = {
                id: product.id,
                productName: productName,
                itemNumber: itemNumber,
                description: description,
                category: category,
            };
            props.editProduct(updatedProduct)
            toast.success("Die Änderungen wurden gespeichert.");
            setOpen(false);
        } else {

            toast.error("Änderung fehlgeschlagen!")
        }
    }

    function editProductName(event: ChangeEvent<HTMLInputElement>) {
        setProductName(event.target.value)
    }

    function editItemNumber(event: ChangeEvent<HTMLInputElement>) {
        setItemNumber(event.target.value)
    }

    function editDescription(event: ChangeEvent<HTMLInputElement>) {
        setDescription(event.target.value)

    }

    return (
        <>
            <SingleProduct product={product}/>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': {m: 1, width: '25ch'},
                }}
                noValidate
                autoComplete="off"
            >
                <div>
                    <Button sx={{backgroundColor: '#1d721d'}} variant="contained" size={"small"} onClick={handleClickOpen}>Produkt ändern</Button>
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle sx={{backgroundColor: '#9CA3AF'}}>Produktdetails ändern</DialogTitle>
                        <DialogContent sx={{backgroundColor: '#9CA3AF'}}>
                            <DialogContentText>
                                Please enter here the new Data
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Produkt"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={editProductName}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Artikelnummer"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={editItemNumber}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Beschreibung"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={editDescription}
                            />
                            <TextField
                                id="Category"
                                select
                                label="Select"
                                defaultValue={product?.category}
                                onChange={event => {
                                    const {value} = event.target;
                                    setCategory(value as Category)
                                }}
                                helperText="Bitte Kategorie wählen"
                                variant={"standard"}
                            >
                                <MenuItem key={"Obst"} value={Category.OBST}> OBST </MenuItem>
                                <MenuItem key={"Gemuese"} value={Category.GEMUESE}> GEMUESE </MenuItem>
                                <MenuItem key={"Kraeuter"} value={Category.KRAEUTER}> KRAUTER </MenuItem>
                                <MenuItem key={"Trockensortiment"} value={Category.TROCKENSORTIMENT}> TROCKENSORTIMENT </MenuItem>
                            </TextField>
                        </DialogContent>
                        <DialogActions sx={{backgroundColor: '#9CA3AF'}}>
                            <Button onClick={handleClose} sx={{color: '#4B5563'}}>Zurück</Button>
                            <Button onClick={handleEditProduct} sx={{color: '#4B5563'}}>Speichern</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </Box>
        </>
    )
}

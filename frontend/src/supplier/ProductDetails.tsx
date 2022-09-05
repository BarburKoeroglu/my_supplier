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
    deleteProduct: (productId:string) =>void,
    fetchAllProducts: (product:Product) =>void,
}

export default function ProductDetails(props: ProductDetailsProps) {

    const [productName, setProductName] = useState('');
    const [itemNumber, setItemNumber] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState<Category>();
    const [open, setOpen] = React.useState(false);
    const {productId} = useParams();

    const product: Product = props.products.find(element => element.productId === productId)!;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleEditProduct = () => {
        if (props.products && product) {
            const updatedProduct: Product = {
                productId: product.productId,
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
                    <Button sx={{backgroundColor: '#1d721d', marginLeft: '20px'}} variant="contained" size={"small"} onClick={handleClickOpen}>Produkt bearbeiten</Button>
                    <Button sx={{backgroundColor: '#1d721d', marginLeft: '20px'}} variant="contained" size={"small"} onClick={() => props.deleteProduct(product.productId)}>Produkt löschen</Button>
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle sx={{backgroundColor: '#e8e9ec'}} color={'#1d721d'} fontSize={"big"}>Produktdetails bearbeiten</DialogTitle>
                        <DialogContent sx={{backgroundColor: '#e8e9ec'}}>
                            <DialogContentText sx={{color: '#000'}}>Bitte geben Sie die Änderungen ein.</DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Produkt"
                                type="text"
                                fullWidth
                                variant="standard"
                                defaultValue={product?.productName}
                                onChange={editProductName}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Artikelnummer"
                                type="text"
                                fullWidth
                                variant="standard"
                                defaultValue={product?.itemNumber}
                                onChange={editItemNumber}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Beschreibung"
                                type="text"
                                fullWidth
                                variant="standard"
                                defaultValue={product?.description}
                                onChange={editDescription}
                            />
                            <TextField
                                margin="dense"
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
                                <MenuItem key={"Obst"} value={Category.OBST}>Obst</MenuItem>
                                <MenuItem key={"Gemuese"} value={Category.GEMUESE}>Gemüse</MenuItem>
                                <MenuItem key={"Kraeuter"} value={Category.KRAEUTER}>Kräuter</MenuItem>
                                <MenuItem key={"Trockensortiment"} value={Category.TROCKENSORTIMENT}>Trockensortiment</MenuItem>
                            </TextField>
                        </DialogContent>
                        <DialogActions sx={{backgroundColor: '#1d721d'}}>
                            <Button onClick={handleClose} sx={{color: '#e8e9ec'}}>Zurück</Button>
                            <Button onClick={handleEditProduct} sx={{color: '#e8e9ec'}}>Speichern</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </Box>
        </>
    )
}

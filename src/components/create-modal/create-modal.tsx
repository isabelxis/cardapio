import { useEffect, useState } from 'react';

import "./modal.css";
import { useFoodDataMutate } from '../../hooks/useFoodDataMutate';
import type { FoodData } from '../../interface/FoodData';


interface InputProps {
    label: string,
    value: string | number,
    updateValue(value: any): void
}   

interface ModalProps {
    closeModal(): void
}

const Input = ({ label, value, updateValue }: InputProps) => {
    return (
        <>
            <label>{label}</label>
            <input value={value} onChange={event => updateValue(event.target.value)}></input>
        </>
    )
}

export function CreateModal({ closeModal }: ModalProps){
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const { mutate, isSuccess, isPending } = useFoodDataMutate();

    const submit = () => {
        const foodData: FoodData = {
            title, 
            price,
            image
        }
        mutate(foodData)
    }

    const cancel = () => {
    }

    useEffect(() => {
        if(!isSuccess) return 
        closeModal();
    }, [isSuccess])

    return(
        <div className="modal-overlay">
            <div className="modal-body">
                <h2>Cadastre um novo item no cardápio</h2>
                <form className="input-container">
                    <Input label="Nome" value={title} updateValue={setTitle}/>
                    <Input label="Preço" value={price} updateValue={setPrice}/>
                    <Input label="Imagem" value={image} updateValue={setImage}/>
                </form>
                <div className="btn-secondary">
                    <button onClick={cancel} >
                        {'Cancelar'}
                    </button>                 
                    <button onClick={submit} >
                        {isPending ? 'Postando...' : 'Postar'}
                    </button>
                </div>
            </div>
        </div>
    )
}
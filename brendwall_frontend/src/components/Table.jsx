import styles from '../assets/css/modules/main.module.css'
import {useEffect, useState} from "react";
import {createInstance, getAllInstances} from "../services/crud";
import Swal from "sweetalert2";

function Table() {
    const [productData, setProductData] = useState([{}])
    const [newProduct, setNewProduct] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            const result = await getAllInstances()
            if (result.status === 200) {
                setProductData(result.data)
                return;
            }
            setProductData([])

        }
        fetchData()
    }, []);

    useEffect(() => {
        setProductData(prevState => [...prevState, newProduct])
    }, [newProduct]);

    const handleClick = () => {
        // This functionality is more difficult to implement than additional page with form, that's why I chose
        // this type of creation instances. One more reason why - I'm using React as my frontend framework and I
        // want to use it properly to show you my skills in frontend development.
        Swal.fire({
            title: 'Создать новую запись',
            html: `
                <input type="text" id="name" class="swal2-input" placeholder="Product Name">
                <input type="text" id="description" class="swal2-input" placeholder="Product Description">
                <input type="number" step=".01" id="price" class="swal2-input" placeholder="Product Price">
            `,
            confirmButtonText: 'Создать',
            showCloseButton: true,
            preConfirm() {
                const name = document.getElementById("name").value
                const description = document.getElementById("description").value
                const price = document.getElementById("price").value
                if (!name || !description || !price) {
                    Swal.showValidationMessage(`Заполните все поля`)
                    return;
                }
                if (price < 0){
                    Swal.showValidationMessage(`Цена не может быть отрицательной`)
                    return;
                }
                if (name.length < 2){
                    Swal.showValidationMessage(`Название должно содержать более 2х символов`)
                    return;
                }
            }
        }).then(result => {
            if (result.isConfirmed) {
                const name = document.getElementById("name").value
                const description = document.getElementById("description").value
                const price = document.getElementById("price").value
                const data = {
                    name: name,
                    description: description,
                    price: price
                }
                const result = createInstance(data)
                result.then(response => {
                    console.log(response)
                    if (response.status === 201){
                        Swal.fire({
                            icon: 'success',
                            timer: 1500,
                        })
                        setNewProduct(response.data)
                        return;
                    }
                    Swal.fire({
                        icon: 'error',
                        timer: 1500,
                        title: 'Oops...',
                        text: 'Something went wrong! Bla-bla-bla...' // here could be ErrorValidator to show user
                        // detailed info about error, but it is not necessary
                    })
                })
            }
        })
    }

    if (productData.length === 0) {
        return <h1 className={styles.emptyLabel}>Загрузка...</h1>
    }

    return (
        <>
            <div className={styles.main}>
                <h1>Все записи</h1>
                {/*  In my pet-projects I have functionality to autogenerate tables with labels and values received
                 from API, but here I will hard-code labels to make my life easier because your task is not require
                  me to write such functionality.
               */}
                <div className={styles.labels}>
                    <div className={styles.label}>
                        <p>Product Name</p>
                    </div>
                    <div className={styles.label}>
                        <p>Product Description</p>
                    </div>
                    <div className={styles.label}>
                        <p>Product Price</p>
                    </div>
                </div>
                <div className={styles.values}>
                    {productData.map((product, index) => {
                        return (
                            <div className={styles.value} key={index}>
                                <p>{product.name}</p>
                                <p>{product.description}</p>
                                <p>{new Intl.NumberFormat('ru-RU', {
                                    currency: 'RUB',
                                    style: 'currency'
                                }).format(product.price)}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className={styles.footer}>
                <button className='btn' onClick={handleClick}>Добавить запись</button>
            </div>
        </>
    )
}

export default Table
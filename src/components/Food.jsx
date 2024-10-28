import React, {useState, useEffect} from "react";
export const Food = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState([]); //de una tener el estado de la orden actual dentro de mi componente
    const[showOrder, setShowOrder] = useState(false); //ver si se ve mi orden o no
    const [payment, setPayment] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://api-menu-9b5g.onrender.com/menu");
                const result = await response.json();
                console.log(result)
                setData(result);
                setLoading(false);
            } catch {
                console.log("Error fetching data", error);
                setLoading(false);
            }
        }

        fetchData();
    }, []); // Este hook solo se ejecutará una vez

    const anadirOrden = (item) => {
        setOrder((prevOrder) => [...prevOrder, item]); //recuerda que ... es un operador que copia el array pasado con tus items y le agrega el nuevo item que deseas
    };

    const visibleOrden = () => {
        setShowOrder(!showOrder);
    };

    const calcTotal = () => {
        return order.reduce((total, item) => total + item.price, 0);
    }

    const pago = () => {
        setPayment(true);
        setShowOrder(false);
        setOrder([]); //limpia la orden después de que se pagó
    }
    
    if (payment) {
        return (
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl w-full mx-auto text-center">
                <h1 className="text-2xl font-bold">Pago realizado</h1>
            </div>
        );
    }




// todo esto basado en el ejercicio API de dragonBALL + nuevas funciones

return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl w-full mx-auto">
        <h1 className="text-2xl font-bold text-center mb-4">Menú de comida</h1>
        {loading ? (
            <p>Cargando...</p>
        ) : showOrder ? ( // Mostrar la orden si el estado es true
            <div>
                <h2 className="text-xl font-bold">Orden Actual</h2>
                <ul>
                    {order.map((item, index) => (
                        <li key={index} className="ticket-item">
                            {item.name} - ${item.price}
                        </li>
                    ))}
                </ul>
                <h3 className="font-bold mt-2">Total: ${calcTotal()}</h3>
                <button onClick={visibleOrden}>
                    Volver al Menú
                </button>
                <button onClick={pago}>
                        Pagar
                </button>
            </div>
        ) : (
            <ul className="grid grid-cols-2 gap-4">
                {data.map((item) => (
                    <li key={item.id} className="bg-gray-200 p-4 rounded-lg">
                        <h2 className="text-lg font-bold text-center mt-2">{item.name}</h2>
                        <p className="text-center">{item.description}</p>
                        <p className="text-center font-semibold">${item.price}</p>
                        <button onClick={() => anadirOrden(item)}>
                            Añadir
                        </button>
                    </li>
                ))}
                <div className="col-span-2 mt-4">
                    <button onClick={visibleOrden}>
                        Ver Orden
                    </button>
                </div>
            </ul>
        )}
    </div>
);
}

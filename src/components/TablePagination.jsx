import { useState } from "react";

const TablePagination = ({ columns, data, fetchData, total, page, handleEdit, handleShow, handleDelete }) => {

    const [itemPerPage, setItemPerPage] = useState(3);
    const [buscar, setBuscar] = useState('');

    const buscador = (val) => {
        fetchData(1, 5, val)
    }

    return (<>
        <input type="text" onChange={(e) => buscador(e.target.value)} />
        <button onClick={() => fetchData(1, 5, buscar)} onKeyUp={() => fetchData(1, 5, buscar)} className="py-1 px-2 bg-orange-500 text-white hover:bg-orange-600 rounded">buscar</button>
        <table className="w-full divide-y divide-gray-200">
            <thead>
                <tr>
                    {columns.map((columna, index) => (
                        <th className="py-2 px-4 text-left text-sm font-medium uppercase" key={index}>{columna.label}</th>
                    ))}
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {data.map((row, index) => (
                    <tr key={row.id}>
                        {columns.map((columna, index) => (
                            <td className="py-2 px-4 text-sm text-gray-500" key={index}>{eval('row.' + columna.key)}</td>
                        ))}
                        <td>
                            {handleEdit &&
                                <button className="py-1 px-2 bg-orange-500 text-white hover:bg-orange-600 rounded" onClick={() => handleEdit(row)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                    </svg>
                                </button>
                            }
                            {handleShow &&
                                <button className="py-1 px-2 bg-green-500 text-white hover:bg-green-600 rounded" onClick={() => handleShow(row)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>

                                </button>
                            }
                            {handleDelete &&
                                <button className="py-1 px-2 bg-red-500 text-white hover:bg-red-600 rounded">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" onClick={() => handleDelete(row.id)} strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>

                                </button>
                            }
                        </td>

                    </tr>
                ))}

            </tbody>
        </table>
        <div className="flex justify-center mt-4">
            <nav className="inline-flex rounded-md shadow">
                <button onClick={() => fetchData(page-1)} disabled={page==1} className="py-2 px-4 bg-gray-200 text-gray-500 hover:bg-gray-300 rounded-l-md">anterior</button>
                    
                    { total > itemPerPage && (
                        <div className="flex">
                            {Array.from({ length: Math.ceil(total/itemPerPage)}).map((_, index) => (
                                <button key={index} onClick={() => fetchData(index+1)} className={`${page === index+1? 'bg-blue-500 text-white': 'bg-gray-200 text-gray-700'} py-2 px-4 mx-1 rounded-md focus:outline-none`}>{index+1}</button>
                            ))}
                        </div>
                    )

                    }
                <button onClick={() => fetchData(page+1)} disabled={page==Math.ceil(total / itemPerPage)} className="py-2 px-4 bg-gray-200 text-gray-500 hover:bg-gray-300 rounded-r-md">siguiente</button>
                
            </nav>

        </div>
    </>)
}

export default TablePagination;
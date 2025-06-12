import { useEffect, useState } from "react"
import BookTable from "../components/book/book.table"
import { fetchAllBookAPI } from "../services/api.service"
import BookForm from "../components/book/book.form"

const BookPage = () => {
    return (
        <>
            <div style={{ padding: "20px" }}>

                <BookForm />

                <BookTable />
            </div>
        </>
    )
}

export default BookPage;
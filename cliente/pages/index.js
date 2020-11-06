import React from 'react'
import Header from '../components/Header'

export default function index() {
    return (
        <div className="container">
            <Header />
            <div className="p-4 text-sm">
                <p>Información diaria proporcionada por <b><a href="https://www.ficeda.com.mx/" target="_blank" >ficeda.com.mx</a></b></p>
            </div>
        </div>
    )
}

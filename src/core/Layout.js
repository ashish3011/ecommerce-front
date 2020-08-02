import React from 'react';
import Menu from "./Menu";
import '../styles.css';
const Layout=({title='Title', description="Description",className,children})=>(
    <div>
        <Menu/>
        <div className="jumbotron">
            <h1 className="text-center">{title}</h1>
            <p className="lead text-center">{description}</p>
        </div>
        <div className={className}>{children}</div>
        <footer className="footerJumbotron ">
            <p className="text-center ">&copy; copyright 2020</p>
            <p className="text-center">Developed by: Ashish sharma and Aman Ghatiya</p>
        </footer>
    </div>
    )

export default Layout;

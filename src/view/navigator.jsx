import { useEffect, useState } from 'react'
import styles from '../css/navigator.module.css'
import { Routes, Route, NavLink } from "react-router-dom"

function PageButton({ title, route, activeId}) {
    const id = route.replace('#', '')
    return (
        // <NavLink to={route} className={({ isActive }) => 
        //     `${styles.pageLink} ${isActive ? styles.active : ''}`}>
        //     {title}
        // </NavLink>
        <a className={`${id === activeId ? styles.active : ''} ${styles.pageLink}`} href={route}>{title}</a>
    )
}

function Navigator() {
    const [activeId, setActiveId] = useState('home')
    useEffect(() => {
        const sections = document.querySelectorAll('section')
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveId(entry.target.id)
                }
            })
        }, {
            threshold: 0.6
        })
        sections.forEach(section => observer.observe(section))
        return () => observer.disconnect()
    })
    return (
        <nav className={`${activeId !== 'home' ? styles.contentHighlight : ''} ${styles.content}`}>
            <PageButton title='Trang chủ' route='#home' activeId={activeId} />
            <PageButton title='Về tôi' route='#about' activeId={activeId} />
            <PageButton title='Dự án' route='#projects' activeId={activeId} />
            <PageButton title='Liên lạc' route='#contact' activeId={activeId} />
        </nav>
    )
}

export default Navigator
import { useContext, useEffect, useState } from 'react'
import styles from '../css/navigator.module.css'
import { LangContext } from '../App'

function PageButton({ title, route, activeId }) {
    const id = route.replace('#', '')
    return (
        <a className={`${id === activeId ? styles.active : ''} ${styles.pageLink}`} href={route}>
            {title}
        </a>
    )
}

function Navigator() {
    const { lang } = useContext(LangContext)
    const [activeId, setActiveId] = useState('home')

    useEffect(() => {
        const handleScroll = () => {


            const sections = document.querySelectorAll('section[id]');
            if (sections.length === 0) return;

            let current = 'home';

            const triggerPoint = window.innerHeight / 4;

            sections.forEach(section => {
                const rect = section.getBoundingClientRect();

                if (rect.top <= triggerPoint && rect.bottom >= triggerPoint) {
                    current = section.id;
                }
            });
            setActiveId((prevId) => prevId !== current ? current : prevId);
        };
        window.addEventListener('scroll', handleScroll, true);

        setTimeout(handleScroll, 500);

        return () => window.removeEventListener('scroll', handleScroll, true);
    }, [])

    return (
        <nav className={`${activeId !== 'home' ? styles.contentHighlight : ''} ${activeId === 'projects' ? styles.projectsHighlight : ''} ${styles.content}`}>
            <PageButton title={`${lang === 'vi' ? "Trang chủ" : "Home"}`} route='#home' activeId={activeId} />
            <PageButton title={`${lang === 'vi' ? "Về tôi" : "About"}`} route='#about' activeId={activeId} />
            <PageButton title={`${lang === 'vi' ? "Dự án" : "Projects"}`} route='#projects' activeId={activeId} />
        </nav>
    )
}

export default Navigator
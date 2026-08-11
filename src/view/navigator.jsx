import { useContext, useEffect, useState } from 'react'
import { LangContext } from '../App'

function PageButton({ title, route, activeId }) {
    const id = route.replace('#', '')
    const isActive = id === activeId
    return (
        <a 
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ease-in-out ${
                isActive 
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
            }`} 
            href={route}
        >
            {title}
        </a>
    )
}

function Navigator() {
    const { lang } = useContext(LangContext)
    const [activeId, setActiveId] = useState('home')

    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll('section[id]')
            if (sections.length === 0) return

            let current = 'home'
            const triggerPoint = window.innerHeight / 4

            sections.forEach(section => {
                const rect = section.getBoundingClientRect()
                if (rect.top <= triggerPoint && rect.bottom >= triggerPoint) {
                    current = section.id
                }
            })
            setActiveId((prevId) => prevId !== current ? current : prevId)
        }
        window.addEventListener('scroll', handleScroll, true)
        setTimeout(handleScroll, 300)
        return () => window.removeEventListener('scroll', handleScroll, true)
    }, [])

    return (
        <header className="sticky top-4 z-50 w-full flex justify-center px-4 pointer-events-none">
            <nav className="pointer-events-auto flex items-center gap-1 p-1.5 rounded-full bg-white/85 backdrop-blur-xl border border-slate-200/90 shadow-xl shadow-indigo-500/5 ring-1 ring-slate-900/5">
                <PageButton title={lang === 'vi' ? "Trang chủ" : "Home"} route='#home' activeId={activeId} />
                <PageButton title={lang === 'vi' ? "Giới thiệu" : "About"} route='#about' activeId={activeId} />
                <PageButton title={lang === 'vi' ? "Kinh nghiệm" : "Experience"} route='#experience' activeId={activeId} />
                <PageButton title={lang === 'vi' ? "Dự án" : "Projects"} route='#projects' activeId={activeId} />
            </nav>
        </header>
    )
}

export default Navigator
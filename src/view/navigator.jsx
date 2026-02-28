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
            // 1. Quét DOM trực tiếp bên trong lúc cuộn. 
            // Dù Home có render chậm cỡ nào thì cuộn chuột là nó sẽ quét lại và tìm thấy!
            const sections = document.querySelectorAll('section[id]');
            if (sections.length === 0) return;

            let current = 'home';
            // 2. Điểm tia laser: Lấy tọa độ 1/3 màn hình tính từ trên xuống làm mốc kích hoạt
            const triggerPoint = window.innerHeight / 4;

            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                // 3. Nếu Đỉnh của section đã vượt qua tia laser VÀ Đáy của nó chưa qua khỏi tia laser
                if (rect.top <= triggerPoint && rect.bottom >= triggerPoint) {
                    current = section.id;
                }
            });

            // Chỉ update state nếu có sự thay đổi để tránh re-render thừa
            setActiveId((prevId) => prevId !== current ? current : prevId);
        };

        // CHÌA KHÓA VÀNG: Tham số 'true' (useCapture).
        // Nó ép trình duyệt phải bắt sự kiện scroll xuyên qua mọi component, 
        // bất chấp thanh cuộn đang nằm ở window hay thẻ div nào!
        window.addEventListener('scroll', handleScroll, true);
        
        // Chạy mồi 1 lần sau khi load nửa giây để bắt DOM nếu người dùng đang ở giữa trang
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
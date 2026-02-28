import { useContext } from 'react'
import styles from '../css/bottom_navigator.module.css'
// Nhớ import LangContext từ đúng đường dẫn file gốc của bạn (ví dụ App.jsx)
import { LangContext } from '../App.jsx' 

function BottomNavigator() {
    // Lấy biến lang từ Context
    const { lang } = useContext(LangContext);
    const isEn = lang === 'en';

    return (
        <footer style={{ width: '100%' }}>
            <section id='contact' className={styles.mainContent}>
                <p className='normalT' style={{ color: 'white', fontWeight: '600', marginBottom: '16px' }}>
                    {isEn ? 'Have a question? Contact me via:' : 'Bạn có câu hỏi? Liên hệ với tôi qua:'}
                </p>
                
                <div className={styles.contactArea}>
                    <a href='https://www.facebook.com/ngoc.hoan.290402' rel='noopener noreferrer' target='_blank'>
                        <img className={styles.contactIcon} alt='Facebook' src='https://upload.wikimedia.org/wikipedia/commons/b/b9/2023_Facebook_icon.svg' />
                    </a>
                    <a href='https://zalo.me/0362858590' rel='noopener noreferrer' target='_blank'>
                        <img className={styles.contactIcon} alt='Zalo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Icon_of_Zalo.svg/480px-Icon_of_Zalo.svg.png' />
                    </a>
                    <a href='https://github.com/hoansdz' rel='noopener noreferrer' target='_blank'>
                        <img className={styles.contactIcon} alt='GitHub' src='/portfolio/images/github.svg' />
                    </a>
                </div>

                <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
                    <p className='normalT' style={{ color: 'white', margin: 0 }}>
                        Email: <a href="mailto:luonghoan.dev@gmail.com" style={{ color: '#4eb09b', textDecoration: 'none', fontWeight: '500', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = 'white'} onMouseOut={(e) => e.target.style.color = '#4eb09b'}>
                            luonghoan.dev@gmail.com
                        </a>
                    </p>
                    <p className='normalT' style={{ color: 'white', margin: 0 }}>
                        {isEn ? 'Phone:' : 'Điện thoại:'} <a href="tel:+84362858590" style={{ color: '#4eb09b', textDecoration: 'none', fontWeight: '500', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = 'white'} onMouseOut={(e) => e.target.style.color = '#4eb09b'}>
                            +84 362858590
                        </a>
                    </p>
                </div>
            </section>
        </footer>
    )
}

export default BottomNavigator
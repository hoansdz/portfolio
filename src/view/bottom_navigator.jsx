import styles from '../css/bottom_navigator.module.css'

function BottomNavigator() {
    return (
        <footer style={{width: '100%'}}>
            <section id='contact' className={styles.mainContent}>
                <p className='normalT' style={{ color: 'white' }}>Bạn có câu hỏi ? Liên hệ</p>
                <div className={styles.contactArea}>
                    <a href='https://www.facebook.com/ngoc.hoan.290402' rel='noopener noreferrer' target='_blank'><img className={styles.contactIcon} alt='Facebook' src='https://upload.wikimedia.org/wikipedia/commons/b/b9/2023_Facebook_icon.svg' /></a>
                    <a href='https://zalo.me/0362858590' rel='noopener noreferrer' target='_blank'><img className={styles.contactIcon} alt='Zalo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Icon_of_Zalo.svg/480px-Icon_of_Zalo.svg.png' /></a>
                </div>
            </section>
        </footer>
    )
}

export default BottomNavigator
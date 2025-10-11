import styles from '../css/home.module.css'

function Project({ title, target, feature, imgUrl }) {
    return (
        <div className={styles.project}>
            <div className={styles.projectSummary}>
                <img src={imgUrl} alt={`Title ${title}`}></img>
                <div>
                    <p className='largeT boldT'>{title}</p>
                    <p className='normalT'>
                        <b>{'Mục tiêu: '}   </b>
                        {`${target}`}
                    </p>
                    <p className='normalT boldT'>{'Tính năng:'}</p>
                    <ul style={{ paddingLeft: '32px' }}>
                        {feature.map((e) => (
                            <li className='normalT'>
                                {e}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <p className='normalT boldT'>
                Xem thêm
            </p>
        </div>
    )
}

function Home() {
    return (
        <div className={styles.content}>
            <section id='home' className={styles.home}>
                <p className='largeT' style={{ color: 'white' }}>XIN CHÀO</p>
                <p className='largestT boldT' style={{ color: 'white' }}>Tôi là Lương Ngọc Hoàn</p>
                <p className='normalT' style={{ color: '#e5e5e5ff' }}>Tôi là một freelancer</p>
            </section>
            <section id='about' className={styles.mainInformation}>
                <img src='src/assets/user.png' alt='my avatar' className={styles.avatar} />
                <div>
                    <p className="normalT">
                        Xin chào! Tôi là một lập trình viên trẻ, yêu thích công nghệ và xây dựng các sản phẩm số đơn giản, hiệu quả.<br /><br />
                        Tôi có kinh nghiệm làm việc với:<br />
                        - Web: HTML, CSS, JavaScript, React.<br />
                        - Mobile: Java Kotlin Android (XML), Flutter.<br />
                        - Backend & Database: Firebase, REST API.<br /><br />
                        Tôi mong muốn nhận các dự án nhỏ về:<br />
                        - Xây dựng landing page, website giới thiệu sản phẩm/dịch vụ.<br />
                        - Thiết kế và lập trình ứng dụng mobile.<br />
                        - Fix bug, tối ưu code hoặc thêm tính năng nhỏ cho website/app.<br /><br />
                        Với sự tập trung và tinh thần học hỏi, tôi cam kết:<br />
                        - Giao hàng đúng hạn.<br />
                        - Sản phẩm gọn nhẹ, dễ mở rộng.<br />
                        - Hỗ trợ khách hàng nhiệt tình sau khi bàn giao.<br />
                        - Trong quá trình sử dụng nếu khách hàng có lỗi tôi sẽ hỗ trợ sửa miễn phí.<br /><br />
                    </p>
                </div>
            </section>
            <section id='projects' className={styles.projects}>
                <p className='largeT boldT'>Dự án freelance</p>
                <Project imgUrl='src/assets/t-lighting.png'
                    title='T-Lighting'
                    target='Lập trình mạch điều khiển đèn led và tạo ứng dụng mobile kết nối qua bluetooth'
                    feature={[
                        'Người dùng có thể bật/tắt hoặc thay đổi chế độ sáng, màu sắc, hiệu ứng của đèn LED thông qua ứng dụng trên điện thoại Android và iOS',
                        'Kết nối mạch với điện thoại qua Bluetooth (BLE).',
                        'Bật/tắt đèn LED',
                        'Điều chỉnh độ sáng',
                        'Thay đổi màu (LED RGB)',
                        'Chọn hiệu ứng (nhấp nháy, đổi màu tự động)',
                        'Ứng dụng hoạt động trên cả Android và iOS'
                    ]} />
            </section>
        </div>
    )
}

export default Home
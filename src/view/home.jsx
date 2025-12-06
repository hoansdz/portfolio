import { useState, useContext, createContext, useId } from 'react'
import { createPortal } from 'react-dom'
import styles from '../css/home.module.css'

const DialogContext = createContext()

function Dialog({ children }) {
    const { setCurrentShowDetail } = useContext(DialogContext)
    const id = useId()
    return createPortal(
        <div id={id} className={styles.dialog} onClick={(e) => {
            if (e.target.id === id) {
                setCurrentShowDetail(null)
            }
        }}>
            <div className={styles.dialogContent}>
                <img onClick={() => setCurrentShowDetail(null)} className={styles.dialogClose} src='/portfolio/images/close.png' alt='Close icon' />
                {children}
            </div>
        </div>,
        document.body
    )
}

function DetailProject(
    { title, target, feature, imgUrl, langOrFramework, status, role, result, link, images }
) {
    return (
        <Dialog >
            <div className={styles.project} >
                <div className={styles.projectSummary}>
                    <img src={imgUrl} alt={`Title ${title}`}></img>
                    <div>
                        <p className='largeT boldT'>{title}</p>
                        <p className='normalT'>
                            <b>{'Mục tiêu: '}   </b>
                            {`${target}`}
                        </p>
                        <p className='normalT boldT'>{'Tính năng nổi bật:'}</p>
                        <ul style={{ paddingLeft: '32px' }}>
                            {feature.map((e) => (
                                <li className='normalT'>
                                    {e}
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
                <div style={{
                    display: 'flex',
                    gap: '8px',
                    flexWrap: 'wrap'
                }}>
                    {langOrFramework.map(e => (
                        <p className={`normalT ${styles.langOrFramework}`}>{e}</p>
                    ))}
                </div>
                <p className='normalT'><b>Thời gian thực hiện: </b>{status}</p>
                <p className='normalT'><b>Vai trò: </b>{role}</p>
                <p className='normalT boldT'>Kết quả</p>
                <ul style={{ paddingLeft: '32px' }}>
                    {result.map((e) => (
                        <li className='normalT'>
                            {e}
                        </li>
                    ))}
                </ul>
                {Object.entries(link).map(([key, value]) => (
                    <p className='normalT'>
                        Liên kết: <a className={`normalT ${styles.projectLink}`} href={value} target='_blank' rel='noopener noreferrer' >
                            {key}
                        </a>
                    </p>
                ))}
                {images && (<div className={styles.projectImages}>
                    {images.map(e => (
                        <img className={styles.projectImage} src={e} alt='Images' />
                    ))}
                </div>)}
            </div>
        </Dialog>
    )
}

function Project(params) {
    const { setCurrentShowDetail } = useContext(DialogContext)
    const { title, target, feature, imgUrl, langOrFramework } = params
    return (
        <div className={`${styles.projectAnimation} ${styles.project}`} onClick={() => setCurrentShowDetail(params)}>
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
            <div style={{
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap'
            }}>
                {langOrFramework.map(e => (
                    <p className={`normalT ${styles.langOrFramework}`}>{e}</p>
                ))}
            </div>
            <p className={`normalT boldT ${styles.projectMore}`}>
                Xem thêm
            </p>
        </div>
    )
}

function Home() {
    const [currentShowDetail, setCurrentShowDetail] = useState(null)
    return (
        <div className={styles.content}>
            <section id='home' className={styles.home} >
                <p className='largeT' style={{ color: 'white' }}>XIN CHÀO</p>
                <p className='largestT boldT' style={{ color: 'white' }}>Tôi là Lương Ngọc Hoàn</p>
                <p className='normalT' style={{ color: '#e5e5e5ff' }}>Tôi là một freelancer</p>
            </section>
            <section id='about' className={styles.mainInformation}>
                <img src='/portfolio/images/user.png' alt='my avatar' className={styles.avatar} />
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
            <DialogContext.Provider value={{ setCurrentShowDetail }}>
                <section id='projects' className={styles.projects}>
                    <p className='largeT boldT'>Dự án freelance</p>
                    <Project imgUrl='/portfolio/images/t-lighting.png'
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
                        ]}
                        langOrFramework={[
                            'C++',
                            'Dart / Flutter',
                            'Bluetooth Low Energy'
                        ]}
                        status='31/7/2025 - nay'
                        role='Fullstack Developer'
                        result={[
                            'Ứng dụng đã hoàn thiện phiên bản đầu tiên, đang được phát triển tiếp và hiện tại được thử nghiệm với lượng người dùng nhỏ',
                            'Ứng dụng đang hoàn thiện các phiên bản khác nhau hỗ trợ đa dạng nhu cầu của người dùng'
                        ]}
                        link={{
                            'Google Play': 'https://play.google.com/store/apps/details?id=com.ngocthai.tlighting&hl=vi',
                            'Appstore': 'https://apps.apple.com/app/t-lighting/id6749724474'
                        }}
                        images={Array.from({ length: 7 }, (_, i) => `/portfolio/images/tlighting/${i+1}.jpg`)}
                    />
                    <p className='largeT boldT'>Dự án cá nhân</p>
                    <Project imgUrl='/portfolio/images/autolang.png'
                        title='Autolang'
                        target='Xây dựng một interpreter nhỏ gọn, hiệu năng cao cho ngôn ngữ kịch bản.'
                        feature={[
                            'Hỗ trợ tạo biến, điều kiện, vòng lặp, và lập trình hướng đối tượng.',
                            'Tự động quản lý bộ nhớ bằng reference counting.',
                            'Dễ mở rộng, có thể tích hợp vào các dự án khác',
                            'Nhẹ, hiệu năng cao, chạy mượt trên nhiều nền tảng.',
                        ]}
                        langOrFramework={[
                            'C++',
                        ]}
                        status='1/7/2025 - nay'
                        role='Nhà phát triển chính (Fullstack/Interpreter Developer)'
                        result={[
                            'Đang hoàn thiện phiên bản đầu tiên của interpreter Autolang, tối ưu về hiệu suất, dung lượng nhẹ (~10KB).',
                            'Quản lý bộ nhớ bằng reference counting, tránh rò rỉ và giữ tốc độ cao.',
                            'Hiện tại đang hỗ trợ tạo biến, lập trình hướng đối tượng, điều kiện, vòng lặp với cú pháp đơn giản, trực quan.',
                            'Hiệu suất đạt mức tương đương Python 3.10'
                        ]}
                        link={{
                            'Github': 'https://play.google.com/store/apps/details?id=com.ngocthai.tlighting&hl=vi',
                        }}
                        //images={Array.from({ length: 0 }, (_, i) => `/portfolio/images/autolang/${i+1}.jpg`)}
                    />
                    <Project imgUrl='/portfolio/images/gddp.png'
                        title='Ứng dụng giáo dục địa phương'
                        target='Xây dựng ứng dụng giáo dục địa phương tỉnh Thái Bình'
                        feature={[
                            'Tạo bài viết',
                            'Tạo liên kết tới bài kiểm tra',
                            'Quản lý bài viết',
                            'Tạo câu hỏi'
                        ]}
                        langOrFramework={[
                            'Java / AndroidX', 'Html', 'Css', 'Xml', 'Firebase'
                        ]}
                        status='1/11/2024 - 1/2/2025'
                        role='Fullstack Developer'
                        result={[
                            'Ứng dụng có giao diện đẹp, dễ sử dụng'
                        ]}
                        link={{
                            'Github': 'https://play.google.com/store/apps/details?id=com.ngocthai.tlighting&hl=vi',
                        }}
                        //images={Array.from({ length: 0 }, (_, i) => `/portfolio/images/autolang/${i+1}.jpg`)}
                    />
                </section>
                {currentShowDetail && (
                    <DetailProject {...currentShowDetail} />
                )}
            </DialogContext.Provider>
        </div>
    )
}

export default Home
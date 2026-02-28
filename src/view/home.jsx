import { useState, useEffect, useContext, createContext, useId } from 'react'
import { createPortal } from 'react-dom'
import styles from '../css/home.module.css'
import { LangContext } from '../App'

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

function DetailProject(props) {
    const { lang, title, target, feature, imgUrl, langOrFramework, status, role, result, link, images } = props;
    const isEn = lang === 'en';

    return (
        <Dialog >
            <div className={styles.project} style={{ backgroundColor: 'rgba(240, 252, 255, 0.95)', color: '#333' }}>
                <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: '700', marginBottom: '8px', color: '#1a5a4f' }}>{title}</h2>
                <div className={styles.projectSummary}>
                    <img src={imgUrl} alt={`Title ${title}`}></img>
                    <div>
                        <div style={{ marginBottom: '16px' }}>
                            <p style={{ fontSize: '0.95rem', color: '#666', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
                                {isEn ? 'Goal & Architecture' : 'Mục tiêu & Kiến trúc'}
                            </p>
                            <p className='normalT' style={{ lineHeight: '1.6', color: '#333' }}>
                                {`${target}`}
                            </p>
                        </div>
                        <div>
                            <p style={{ fontSize: '0.95rem', color: '#666', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>
                                {isEn ? 'Key Technical Features' : 'Điểm nhấn kỹ thuật'}
                            </p>
                            <ul style={{ paddingLeft: '20px', margin: '0' }}>
                                {feature.map((e, idx) => (
                                    <li key={idx} className='normalT' style={{ lineHeight: '1.6', color: '#333', marginBottom: '6px' }}>
                                        {e}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '12px' }}>
                    {langOrFramework.map((e, idx) => (
                        <p key={idx} className={`normalT ${styles.langOrFramework}`}>{e}</p>
                    ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '24px', paddingTop: '24px', borderTop: '1px solid rgba(78, 176, 155, 0.2)' }}>
                    <div>
                        <p style={{ fontSize: '0.95rem', color: '#4eb09b', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
                            {isEn ? 'Timeline' : 'Thời gian thực hiện'}
                        </p>
                        <p className='normalT' style={{ fontWeight: '500', color: '#333' }}>{status}</p>
                    </div>
                    <div>
                        <p style={{ fontSize: '0.95rem', color: '#4eb09b', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
                            {isEn ? 'Role' : 'Vai trò'}
                        </p>
                        <p className='normalT' style={{ fontWeight: '500', color: '#333' }}>{role}</p>
                    </div>
                </div>

                <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid rgba(78, 176, 155, 0.2)' }}>
                    <p style={{ fontSize: '0.95rem', color: '#4eb09b', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>
                        {isEn ? 'Results & Benchmarks' : 'Kết quả & Benchmark'}
                    </p>
                    <ul style={{ paddingLeft: '20px', margin: '0' }}>
                        {result.map((e, idx) => (
                            <li key={idx} className='normalT' style={{ lineHeight: '1.6', color: '#333', marginBottom: '8px' }}>
                                {e}
                            </li>
                        ))}
                    </ul>
                </div>

                <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid rgba(78, 176, 155, 0.2)' }}>
                    <p style={{ fontSize: '0.95rem', color: '#4eb09b', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>
                        {isEn ? 'Links' : 'Liên kết'}
                    </p>
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        {link && Object.entries(link).map(([key, value], idx) => (
                            <a key={idx} className={styles.projectLink} href={value} target='_blank' rel='noopener noreferrer' style={{
                                padding: '10px 20px',
                                backgroundColor: 'rgba(78, 176, 155, 0.1)',
                                borderRadius: '8px',
                                textDecoration: 'none',
                                fontWeight: '500',
                                transition: 'all 0.3s ease'
                            }}>
                                {key} →
                            </a>
                        ))}
                    </div>
                </div>

                {images && images.length > 0 && (<div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid rgba(78, 176, 155, 0.2)' }}>
                    <p style={{ fontSize: '0.95rem', color: '#4eb09b', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '16px' }}>
                        {isEn ? 'Project Gallery' : 'Hình ảnh dự án'}
                    </p>
                    <div className={styles.projectImages}>
                        {images.map((e, idx) => (
                            <img key={idx} className={styles.projectImage} src={e} alt={`Project ${idx + 1}`} />
                        ))}
                    </div>
                </div>)}
            </div>
        </Dialog>
    )
}

function Project(params) {
    const { setCurrentShowDetail } = useContext(DialogContext)
    const { lang, title, target, feature, imgUrl, langOrFramework } = params
    const isEn = lang === 'en';

    return (
        <div className={`${styles.projectAnimation} ${styles.project}`} onClick={() => setCurrentShowDetail(params)}>
            <div className={styles.projectSummary}>
                <img src={imgUrl} alt={`Title ${title}`}></img>
                <div>
                    <p className='largeT boldT'>{title}</p>
                    <p className='normalT'>
                        <b>{isEn ? 'Goal: ' : 'Mục tiêu: '}   </b>
                        {`${target}`}
                    </p>
                    <p className='normalT boldT mt-2'>{isEn ? 'Highlights:' : 'Điểm nhấn:'}</p>
                    <ul style={{ paddingLeft: '32px' }} className="list-disc">
                        {feature.map((e, i) => (
                            <li className='normalT' key={`${title} ${i}`}>
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
                {langOrFramework.map((e, i) => (
                    <p className={`normalT ${styles.langOrFramework}`} key={`${title}l ${i}`}>{e}</p>
                ))}
            </div>
            <p className={`normalT boldT ${styles.projectMore}`}>
                {isEn ? 'View Details' : 'Xem chi tiết'}
            </p>
        </div>
    )
}

// ==============================
// GIAO DIỆN TIẾNG VIỆT
// ==============================
function HomeVI() {
    return (
        <>
            <section id='home' className={styles.home} >
                <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                    <p className='largeT' style={{ color: 'rgba(255, 255, 255, 0.9)', marginBottom: '12px', letterSpacing: '1px' }}>Hi, I'm a Developer</p>
                    <p style={{ fontSize: 'clamp(1.8rem, 5vw, 3.5rem)', fontWeight: '700', color: 'white', marginBottom: '16px', lineHeight: '1.2' }}>Lương Ngọc Hoàn</p>
                    <p className='normalT' style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: 'clamp(1rem, 1.5vw, 1.3rem)' }}>Systems • Fullstack • Mobile Engineer</p>
                </div>
            </section>
            
            <section id='about' className={styles.mainInformation}>
                <img src='/portfolio/images/my_face.jpg' alt='my avatar' className={'rounded-full w-24 h-24 lg:w-32 lg:h-32 self-center'} />
                <div>
                    <p className="normalT">
                        Xin chào! Tôi là một lập trình viên trẻ đam mê công nghệ, có khả năng xây dựng các hệ thống từ cấp độ lõi (C++, Compiler, Vi điều khiển) cho đến các ứng dụng đầu cuối (Web/Mobile App thực tế).<br /><br />
                        
                        <b>Kinh nghiệm & Kỹ năng cốt lõi:</b><br />
                        - <b>Systems / Embedded:</b> C++, Compiler Design, Virtual Machines, lập trình vi điều khiển mạch Bluetooth (BLE).<br />
                        - <b>Mobile App:</b> Native Android (Java, XML, ViewBinding), Flutter (Dart).<br />
                        - <b>Web & Backend:</b> React, Next.js, HTML/CSS/JS, Tailwind, Firebase, Supabase.<br /><br />
                        
                        <b>Định hướng công việc:</b><br />
                        1. <b>Tìm kiếm cơ hội thực tập/làm việc:</b> Ở vị trí Fresher/Junior trong các mảng <b>C++, Embedded Systems, Backend hoặc Mobile App</b> tại các môi trường chuyên nghiệp.<br />
                        2. <b>Nhận dự án Freelance:</b> Xây dựng Website giới thiệu, Landing page, Ứng dụng Web/Mobile Fullstack, lập trình IoT/mạch điều khiển và fix bug tối ưu hiệu suất với tiêu chí: Nhẹ, Mượt, Dễ mở rộng và Hỗ trợ tận tâm.<br />
                    </p>
                </div>
            </section>

            <section id='projects' className={styles.projects}>
                <p className='largeT boldT'>Dự án Hệ Thống Lõi (Core Systems)</p>
                <Project lang='vi' imgUrl='/portfolio/images/autolang.png'
                    title='Autolang Compiler & Virtual Machine'
                    target='Thiết kế và phát triển từ con số 0 một ngôn ngữ kịch bản (scripting language) nhúng hoàn toàn bằng C++. Hướng tới triết lý "Smart Compiler, Dumb VM" để ép tối đa tốc độ thực thi.'
                    feature={[
                        'Kiến trúc VM siêu tốc: Loại bỏ hoàn toàn các class OOP (như Instruction, Bytecode) ở tầng thực thi. VM chạy dưới dạng State Machine thuần túy để tối ưu Cache Locality.',
                        'Quản trị bộ nhớ tuỳ chỉnh: Không sử dụng Tracing GC. Tự implement hệ thống Arena Allocator kết hợp Reference Counting để kiểm soát Memory Leak.',
                        'Zero-overhead Generics & RTTI: Giải quyết Generics bằng macro __CLASS__ ngay lúc compile-time, truyền Type IDs tĩnh xuống C++ VM để loại bỏ chi phí reflection lúc runtime.',
                        'Stdlib Decoupling: Tách biệt hoàn toàn thư viện chuẩn ra User-land thông qua hệ thống pointer @native.'
                    ]}
                    langOrFramework={['C++', 'Compiler Design', 'AST', 'Memory Layout', 'Next.js']}
                    status='7/2025 - Hiện tại'
                    role='Compiler Engineer'
                    result={[
                        'Tại các bài benchmark nội bộ AutoLang thường chậm hơn Lua 2-5x lần.',
                        'Tốc độ cấp phát 1.000.000 objects nhanh gấp 1.5 - 2 lần so với các ngôn ngữ nhúng phổ biến (Lua).',
                        'Một trình biên dịch mạnh mẽ có thể biên dịch vài chục nghìn class trong vài trăm ms',
                        'Cú pháp hiện đại đầy mạnh mẽ',
                        'Xử lý thành công việc nhúng (embed) an toàn vào ứng dụng C++ mà không phụ thuộc framework ngoài.'
                    ]}
                    images={[
                        '/portfolio/images/a_compiler_tricks.png',
                        '/portfolio/images/example_1.png',
                        '/portfolio/images/example_2.png',
                    ]}
                    link={{
                        'Source code': 'https://github.com/hoansdz/Autolang',
                        'Official Documentation': 'https://autolang.vercel.app',
                    }}
                />

                <p className='largeT boldT mt-8'>Sản Phẩm Đầu Cuối & Ứng Dụng (Fullstack/Mobile)</p>
                <Project lang='vi' imgUrl='/portfolio/images/t-lighting.png'
                    title='T-Lighting (App Điều khiển Đèn xe độ)'
                    target='Xây dựng trọn gói hệ thống điều khiển hệ thống đèn LED RGB cho xe độ, bao gồm lập trình mạch vi điều khiển (C++) và ứng dụng kết nối qua Bluetooth (BLE).'
                    feature={[
                        'Firmware C++: Lập trình vi điều khiển nhận tín hiệu và điều khiển mạch LED, giao tiếp qua Bluetooth Low Energy (BLE).',
                        'Ứng dụng Mobile (Flutter): Giao diện trực quan cho phép người dùng bật/tắt, điều chỉnh dải màu RGB, độ sáng và chọn các chế độ nhấp nháy/hiệu ứng đổi màu theo thời gian thực.',
                        'Kết nối ổn định: Xử lý các luồng kết nối Bluetooth liên tục giữa điện thoại và phần cứng trên xe.'
                    ]}
                    langOrFramework={['C++ (Embedded)', 'Dart', 'Flutter', 'Bluetooth Low Energy (BLE)']}
                    status='7/2025 - Hiện tại'
                    role='Fullstack IoT Developer (Hardware + Mobile App)'
                    result={[
                        'Hoàn thiện toàn bộ luồng kết nối phần cứng - phần mềm.',
                        'Đưa ứng dụng thành công lên cả 2 chợ ứng dụng Google Play và App Store, hiện đang phục vụ nhóm người dùng thực tế.'
                    ]}
                    link={{
                        'Google Play Store': 'https://play.google.com/store/apps/details?id=com.ngocthai.tlighting&hl=vi',
                        'Apple App Store': 'https://apps.apple.com/app/t-lighting/id6749724474'
                    }}
                    images={Array.from({ length: 7 }, (_, i) => `/portfolio/images/tlighting/${i + 1}.jpg`)}
                />

                <Project lang='vi' imgUrl='/portfolio/images/gddp.png'
                    title='Ứng dụng Giáo dục Địa phương tỉnh Thái Bình'
                    target='Xây dựng ứng dụng Android Native hỗ trợ học tập và quản lý tài liệu giáo dục địa phương, tích hợp hệ thống kiểm duyệt và làm bài kiểm tra.'
                    feature={[
                        'Hệ thống tài liệu: Quản lý, hiển thị và đọc tài liệu học tập dưới dạng file PDF được xử lý nhúng trực tiếp vào app.',
                        'Đa phương tiện & Tương tác: Hỗ trợ tích hợp Video và Audio vào bài viết. Cung cấp tính năng gửi góp ý/bình luận cho từng tài liệu.',
                        'Quản lý nội dung (CMS/Admin): Phân quyền tài khoản. Hệ thống kiểm duyệt chặt chẽ các bài viết trước khi được phép hiển thị public.',
                        'Kiểm tra & Đánh giá: Tạo câu hỏi, liên kết bài viết với các bài kiểm tra trực tuyến.'
                    ]}
                    langOrFramework={['Java', 'AndroidX', 'XML (ViewBinding)', 'Firebase']}
                    status='11/2024 - 2/2025'
                    role='Mobile Developer'
                    result={[
                        'Xây dựng thành công hệ thống luồng dữ liệu quản lý tài liệu và phân quyền tài khoản chặt chẽ.',
                        'Đạt giải Nhất trong Cuộc thi Sáng tạo Thanh, Thiếu niên, Nhi đồng tỉnh Hưng Yên lần thứ I năm 2024-2025.'
                    ]}
                    images={[
                        '/portfolio/images/gddp_anh_1.png',
                        '/portfolio/images/gddp_anh_2.png',
                        '/portfolio/images/gddp_anh_3.jpg',
                        '/portfolio/images/bang_khen_chu_tich_tinh.jpg',
                        '/portfolio/images/giay_chung_nhan_nhat_tinh.jpg'
                    ]}
                />
            </section>
        </>
    )
}

// ==============================
// GIAO DIỆN TIẾNG ANH
// ==============================
function HomeEN() {
    return (
        <>
            <section id='home' className={styles.home} >
                <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                    <p className='largeT' style={{ color: 'rgba(255, 255, 255, 0.9)', marginBottom: '12px', letterSpacing: '1px' }}>Hi, I'm a Developer</p>
                    <p style={{ fontSize: 'clamp(1.8rem, 5vw, 3.5rem)', fontWeight: '700', color: 'white', marginBottom: '16px', lineHeight: '1.2' }}>Luong Ngoc Hoan</p>
                    <p className='normalT' style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: 'clamp(1rem, 1.5vw, 1.3rem)' }}>Systems • Fullstack • Mobile Engineer</p>
                </div>
            </section>
            
            <section id='about' className={styles.mainInformation}>
                <img src='/portfolio/images/my_face.jpg' alt='my avatar' className={'rounded-full w-24 h-24 lg:w-32 lg:h-32 self-center'} />
                <div>
                    <p className="normalT">
                        Hello! I am a passionate software engineer capable of building systems from the core level (C++, Compilers, Microcontrollers) to end-user applications (Web/Mobile Apps).<br /><br />
                        
                        <b>Core Skills & Experience:</b><br />
                        - <b>Systems / Embedded:</b> C++, Compiler Design, Virtual Machines, Bluetooth Low Energy (BLE) microcontrollers.<br />
                        - <b>Mobile App:</b> Native Android (Java, XML, ViewBinding), Flutter (Dart).<br />
                        - <b>Web & Backend:</b> React, Next.js, HTML/CSS/JS, Tailwind, Firebase, Supabase.<br /><br />
                        
                        <b>Career Objectives:</b><br />
                        1. <b>Seeking Internship/Full-time Opportunities:</b> Actively looking for Fresher/Junior roles in <b>C++, Embedded Systems, Backend, or Mobile App development</b> within professional environments.<br />
                        2. <b>Available for Freelance Projects:</b> Building landing pages, Fullstack Web/Mobile applications, IoT/Hardware programming, and performance optimization. My focus: Lightweight, Smooth, Scalable, and Dedicated Support.<br />
                    </p>
                </div>
            </section>

            <section id='projects' className={styles.projects}>
                <p className='largeT boldT'>Core Systems Projects</p>
                <Project lang='en' imgUrl='/portfolio/images/autolang.png'
                    title='Autolang Compiler & Virtual Machine'
                    target='Designed and developed an embeddable scripting language entirely in C++ from scratch. Follows the "Smart Compiler, Dumb VM" philosophy to maximize execution speed.'
                    feature={[
                        'Ultra-fast VM Architecture: Completely eliminated OOP classes (like Instruction, Bytecode) in the execution phase. The VM runs as a pure State Machine to optimize CPU Cache Locality.',
                        'Custom Memory Management: Bypassed traditional Tracing GC. Implemented a custom Arena Allocator paired with Reference Counting to strictly control memory leaks.',
                        'Zero-overhead Generics & RTTI: Resolved Generics using a __CLASS__ macro at compile-time, passing static Type IDs down to the native C++ VM to eliminate runtime reflection costs.',
                        'Stdlib Decoupling: Fully isolated the standard library into user-land via a @native pointer system.'
                    ]}
                    langOrFramework={['C++', 'Compiler Design', 'AST', 'Memory Layout', 'Next.js']}
                    status='July 2025 - Present'
                    role='Compiler Engineer'
                    result={[
                        'In internal benchmarks, AutoLang execution speed is roughly 2-5x slower than Lua (a highly optimized industry standard).',
                        'Object allocation speed (1,000,000 objects) is 1.5 - 2x faster than Lua.',
                        'A robust compiler capable of compiling tens of thousands of classes in just a few hundred milliseconds.',
                        'Features a modern, highly expressive syntax.',
                        'Successfully embedded safely into C++ applications with zero external dependencies.'
                    ]}
                    images={[
                        '/portfolio/images/a_compiler_tricks.png',
                        '/portfolio/images/example_1.png',
                        '/portfolio/images/example_2.png',
                    ]}
                    link={{
                        'Source code': 'https://github.com/hoansdz/Autolang',
                        'Official Documentation': 'https://autolang.vercel.app',
                    }}
                />

                <p className='largeT boldT mt-8'>End-to-End Products (Fullstack/Mobile)</p>
                <Project lang='en' imgUrl='/portfolio/images/t-lighting.png'
                    title='T-Lighting (Custom Vehicle LED Controller)'
                    target='Built an end-to-end RGB LED control system for custom vehicles, including C++ microcontroller firmware and a BLE-connected mobile app.'
                    feature={[
                        'C++ Firmware: Programmed the microcontroller to handle hardware signals and Bluetooth Low Energy (BLE) communication.',
                        'Mobile App (Flutter): Intuitive UI allowing users to toggle power, adjust RGB color bands, brightness, and select real-time flashing/color-changing effects.',
                        'Stable Connectivity: Handled continuous BLE connection streams between the smartphone and the vehicle hardware.'
                    ]}
                    langOrFramework={['C++ (Embedded)', 'Dart', 'Flutter', 'Bluetooth Low Energy (BLE)']}
                    status='July 2025 - Present'
                    role='Fullstack IoT Developer (Hardware + Mobile App)'
                    result={[
                        'Successfully delivered the complete hardware-software communication flow.',
                        'Successfully published on both Google Play and Apple App Store, currently serving an active user base.'
                    ]}
                    link={{
                        'Google Play Store': 'https://play.google.com/store/apps/details?id=com.ngocthai.tlighting&hl=vi',
                        'Apple App Store': 'https://apps.apple.com/app/t-lighting/id6749724474'
                    }}
                    images={Array.from({ length: 7 }, (_, i) => `/portfolio/images/tlighting/${i + 1}.jpg`)}
                />

                <Project lang='en' imgUrl='/portfolio/images/gddp.png'
                    title='Thai Binh Local Education Application'
                    target='Built a Native Android app to support local education, featuring document management, an approval workflow, and an integrated quiz system.'
                    feature={[
                        'Document System: Manage, display, and read educational materials using directly embedded PDF processing.',
                        'Multimedia & Interaction: Integrated Video and Audio support. Provided a feedback/comment system for individual documents.',
                        'CMS/Admin Workflow: Role-based access control. Strict moderation system for articles before public display.',
                        'Assessment: Quiz creation and linking articles to online tests.'
                    ]}
                    langOrFramework={['Java', 'AndroidX', 'XML (ViewBinding)', 'Firebase']}
                    status='Nov 2024 - Feb 2025'
                    role='Mobile Developer'
                    result={[
                        'Successfully built a robust data flow for document management and strict access control.',
                        'Won First Prize in the 1st Hung Yen Province Youth and Children\'s Creative Contest (2024-2025).'
                    ]}
                    images={[
                        '/portfolio/images/gddp_anh_1.png',
                        '/portfolio/images/gddp_anh_2.png',
                        '/portfolio/images/gddp_anh_3.jpg',
                        '/portfolio/images/bang_khen_chu_tich_tinh.jpg',
                        '/portfolio/images/giay_chung_nhan_nhat_tinh.jpg'
                    ]}
                />
            </section>
        </>
    )
}

// ==============================
// XỬ LÝ LOGIC ĐỔI NGÔN NGỮ
// ==============================
export default function Home() {
    const { lang, setLang } = useContext(LangContext);
    const [currentShowDetail, setCurrentShowDetail] = useState(null);

    return (
        <div className={styles.content}>
            {/* Nút chuyển đổi ngôn ngữ trôi nổi ở góc dưới */}
            <div style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 9999 }}>
                <button
                    onClick={() => {
                        setLang(lang === 'vi' ? 'en' : 'vi');
                        setCurrentShowDetail(null); // Đóng Dialog nếu đang mở
                    }}
                    style={{
                        padding: '10px 18px',
                        borderRadius: '30px',
                        border: '2px solid #4eb09b',
                        backgroundColor: '#fff',
                        color: '#1a5a4f',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    {lang === 'vi' ? '🇻🇳 VN' : '🇬🇧 EN'}
                </button>
            </div>

            <DialogContext.Provider value={{ setCurrentShowDetail }}>
                
                {/* Render nội dung tùy theo state lang */}
                {lang === 'vi' ? <HomeVI /> : <HomeEN />}

                {/* Render Dialog nếu có */}
                {currentShowDetail && (
                    <DetailProject {...currentShowDetail} />
                )}

            </DialogContext.Provider>
        </div>
    )
}
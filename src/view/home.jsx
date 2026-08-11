import { useState, useEffect, useContext, createContext, useId } from 'react'
import { createPortal } from 'react-dom'
import { LangContext } from '../App'

const DialogContext = createContext()

function Dialog({ children }) {
    const { setCurrentShowDetail } = useContext(DialogContext)
    const id = useId()

    return createPortal(
        <div
            id={id}
            className="fixed inset-0 z-[1000] bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-4"
            onClick={(e) => {
                if (e.target.id === id) {
                    setCurrentShowDetail(null)
                }
            }}
        >
            <div className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl bg-white border border-slate-200 p-6 md:p-8 shadow-2xl text-slate-800">
                <button
                    onClick={() => setCurrentShowDetail(null)}
                    aria-label="Đóng"
                    className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-all duration-200 active:scale-95 flex items-center justify-center"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                {children}
            </div>
        </div>,
        document.body
    )
}

function DetailProject(props) {
    const { lang, title, target, feature, imgUrl, langOrFramework, status, role, result, link, images, award, codeSnippet, motivation, pipeline } = props;
    const isEn = lang === 'en';

    return (
        <Dialog>
            <div className="space-y-6">
                <div>
                    <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-800 bg-clip-text text-transparent pr-8">{title}</h2>
                </div>

                {award && (
                    <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-900">
                        <span className="font-bold text-xs uppercase tracking-wider text-amber-700 block mb-0.5">
                            {isEn ? 'Award Highlight' : 'Giải thưởng Nổi bật'}
                        </span>
                        <p className="text-xs md:text-sm font-semibold text-amber-900">{award}</p>
                    </div>
                )}

                {pipeline && (
                    <div className="space-y-1.5">
                        <p className="text-indigo-600 font-semibold uppercase tracking-wider text-[11px]">
                            {isEn ? 'Technical Pipeline' : 'Luồng Xử lý Kỹ thuật'}
                        </p>
                        <div className="p-3 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto border border-slate-800 leading-relaxed">
                            {pipeline}
                        </div>
                    </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 items-start bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <img src={imgUrl} alt={title} className="w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover border border-slate-200 flex-shrink-0 shadow-sm" />
                    <div className="space-y-3 flex-1 text-xs md:text-sm">
                        {motivation && (
                            <div>
                                <p className="text-indigo-600 font-semibold uppercase tracking-wider text-[11px] mb-1">
                                    {isEn ? 'Problem & Motivation' : 'Bài toán & Động lực'}
                                </p>
                                <p className="text-slate-700 leading-relaxed">{motivation}</p>
                            </div>
                        )}
                        <div>
                            <p className="text-indigo-600 font-semibold uppercase tracking-wider text-[11px] mb-1">
                                {isEn ? 'Architecture & Solution' : 'Mục tiêu & Giải pháp'}
                            </p>
                            <p className="text-slate-700 leading-relaxed">{target}</p>
                        </div>
                    </div>
                </div>

                {codeSnippet && (
                    <div className="space-y-2">
                        <p className="text-indigo-600 font-semibold uppercase tracking-wider text-[11px]">
                            {isEn ? 'Code Snippet Example' : 'Ví dụ Mã nguồn minh họa'}
                        </p>
                        <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-xs font-mono overflow-x-auto border border-slate-800 leading-relaxed">
                            <code>{codeSnippet}</code>
                        </pre>
                    </div>
                )}

                {feature && feature.length > 0 && (
                    <div className="space-y-2">
                        <p className="text-indigo-600 font-semibold uppercase tracking-wider text-[11px]">
                            {isEn ? 'Technical Highlights' : 'Điểm nhấn Kỹ thuật'}
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-xs md:text-sm text-slate-700">
                            {feature.map((e, idx) => (
                                <li key={idx} className="leading-relaxed">{e}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="flex flex-wrap gap-1.5">
                    {langOrFramework.map((e, idx) => (
                        <span key={idx} className="px-3 py-1 text-[11px] font-semibold rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                            {e}
                        </span>
                    ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200 text-xs md:text-sm">
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                        <p className="text-indigo-600 font-semibold uppercase tracking-wider text-[11px] mb-1">
                            {isEn ? 'Timeline' : 'Thời gian thực hiện'}
                        </p>
                        <p className="text-slate-900 font-semibold">{status}</p>
                    </div>
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                        <p className="text-indigo-600 font-semibold uppercase tracking-wider text-[11px] mb-1">
                            {isEn ? 'Role' : 'Vai trò'}
                        </p>
                        <p className="text-slate-900 font-semibold">{role}</p>
                    </div>
                </div>

                {result && result.length > 0 && (
                    <div className="pt-4 border-t border-slate-200 text-xs md:text-sm">
                        <p className="text-indigo-600 font-semibold uppercase tracking-wider text-[11px] mb-2">
                            {isEn ? 'Results & Outcome' : 'Kết quả & Đo lường'}
                        </p>
                        <ul className="list-disc list-inside space-y-1.5 text-slate-700">
                            {result.map((e, idx) => (
                                <li key={idx} className="leading-relaxed">{e}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {link && Object.keys(link).length > 0 && (
                    <div className="pt-4 border-t border-slate-200">
                        <p className="text-indigo-600 font-semibold uppercase tracking-wider text-[11px] mb-3">
                            {isEn ? 'Links' : 'Liên kết'}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {Object.entries(link).map(([key, value], idx) => (
                                <a
                                    key={idx}
                                    href={value}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    role="button"
                                    className="px-3.5 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-600 hover:text-white text-xs font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-sm flex items-center gap-1.5"
                                >
                                    <span>{key}</span>
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </div>
                )}

                {images && images.length > 0 && (
                    <div className="pt-4 border-t border-slate-200">
                        <p className="text-indigo-600 font-semibold uppercase tracking-wider text-[11px] mb-3">
                            {isEn ? 'Project Media' : 'Hình ảnh dự án'}
                        </p>
                        <div className="flex gap-3 overflow-x-auto pb-2">
                            {images.map((e, idx) => (
                                <img
                                    key={idx}
                                    src={e}
                                    alt={`Chi tiết dự án ${idx + 1}`}
                                    className="h-44 md:h-52 w-auto rounded-xl border border-slate-200 object-cover flex-shrink-0 shadow-md hover:scale-[1.02] transition-transform duration-200"
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </Dialog>
    )
}

function Project(params) {
    const { setCurrentShowDetail } = useContext(DialogContext)
    const { lang, title, subtitle, problem, solution, technicalDepth, outcome, imgUrl, langOrFramework, award } = params
    const isEn = lang === 'en';

    return (
        <div
            onClick={() => setCurrentShowDetail(params)}
            className="group relative p-6 rounded-2xl bg-white/90 border border-slate-200/90 backdrop-blur-xl shadow-lg shadow-slate-200/50 hover:shadow-2xl hover:shadow-indigo-500/10 hover:border-indigo-300 transition-all duration-300 ease-out hover:-translate-y-1 cursor-pointer flex flex-col justify-between gap-5"
        >
            <div className="space-y-4">
                {/* Header Badge & Title */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-3">
                        <img src={imgUrl} alt={title} className="w-12 h-12 rounded-xl object-cover border border-slate-200 flex-shrink-0 group-hover:border-indigo-400 group-hover:scale-[1.05] transition-all duration-300 shadow-sm" />
                        <div>
                            <h3 className="text-lg md:text-xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors tracking-tight">{title}</h3>
                            {subtitle && <p className="text-xs font-semibold text-indigo-600">{subtitle}</p>}
                        </div>
                    </div>
                    {award && (
                        <div className="inline-flex items-center self-start sm:self-auto px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-900 text-[11px] font-bold">
                            <span>{award}</span>
                        </div>
                    )}
                </div>

                {/* Structured Narrative Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1 bg-slate-50/80 p-3.5 rounded-xl border border-slate-200/70">
                        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{isEn ? 'Problem' : 'Bài toán'}</p>
                        <p className="text-slate-700 leading-relaxed">{problem}</p>
                    </div>
                    <div className="space-y-1 bg-indigo-50/40 p-3.5 rounded-xl border border-indigo-100">
                        <p className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider">{isEn ? 'Solution' : 'Giải pháp'}</p>
                        <p className="text-slate-700 leading-relaxed">{solution}</p>
                    </div>
                </div>

                {/* Technical Depth & Outcome */}
                <div className="space-y-2 text-xs">
                    <div>
                        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">{isEn ? 'Technical Depth' : 'Độ sâu Kỹ thuật'}</p>
                        <p className="text-slate-700 leading-relaxed bg-slate-50/60 p-3 rounded-xl border border-slate-200/60">{technicalDepth}</p>
                    </div>
                    <div>
                        <p className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider mb-1">{isEn ? 'Key Outcome / Proof' : 'Kết quả Thực tế'}</p>
                        <p className="text-slate-800 font-semibold leading-relaxed bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-200/60">{outcome}</p>
                    </div>
                </div>
            </div>

            {/* Footer Tech Tags & Action Button */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
                <div className="flex flex-wrap gap-1.5">
                    {langOrFramework.map((e, i) => (
                        <span key={i} className="px-2.5 py-0.5 text-[10px] font-semibold rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                            {e}
                        </span>
                    ))}
                </div>
                <button
                    type="button"
                    className="px-4 py-2 text-xs font-semibold rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-500 hover:shadow-indigo-500/40 transition-all duration-200 active:scale-95 flex items-center gap-1.5 flex-shrink-0"
                >
                    <span>{isEn ? 'See how it works' : 'Xem cách vận hành'}</span>
                    <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

function HomeVI() {
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto space-y-14 px-4">
            {/* Header Hero Section */}
            <section id='home' className="relative py-12 md:py-20 text-center flex flex-col items-center justify-center">
                <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden">
                    <div className="w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl" />
                    <div className="w-80 h-80 rounded-full bg-violet-500/10 blur-3xl -ml-20" />
                </div>

                <span className="inline-flex items-center rounded-full bg-indigo-50 px-4 py-1.5 text-xs font-semibold text-indigo-700 ring-1 ring-indigo-200 mb-5 tracking-wider uppercase shadow-sm">
                    Technical MVP Engineer · Systems & AI Software Engineer
                </span>

                <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-800 bg-clip-text text-transparent mb-4 tracking-tight leading-tight py-1">
                    Lương Ngọc Hoàn
                </h1>

                <h2 className="text-lg md:text-xl font-bold text-indigo-950 max-w-2xl leading-snug mb-3">
                    Tôi xây dựng các MVP và hệ thống phần mềm kỹ thuật phức tạp — từ AI & Backend đến Mobile, IoT và Core Systems.
                </h2>

                <p className="text-xs md:text-sm text-slate-600 font-medium tracking-wide max-w-2xl leading-relaxed mb-6">
                    Biến các bài toán kỹ thuật phức tạp thành sản phẩm hoạt động thực tế với cam kết bàn giao trọn gói từ kiến trúc hệ thống, mã nguồn, tài liệu kỹ thuật đến triển khai sản phẩm. Sẵn sàng đảm nhận các bài toán khó mà framework thông thường chưa hỗ trợ.
                </p>

                {/* Available for Services Bar */}
                <div className="w-full max-w-3xl p-4 rounded-2xl bg-indigo-900/5 border border-indigo-200/80 backdrop-blur-md mb-8">
                    <p className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider mb-2">DỊCH VỤ & BÀI TOÁN SẴN SÀNG NHẬN DỰ ÁN</p>
                    <div className="flex flex-wrap justify-center gap-2">
                        {['AI Systems & Pipelines', 'Backend & APIs', 'Mobile & IoT Solutions', 'Technical MVPs', 'C++ & Custom Runtimes', 'Bài toán khó ngoài Framework'].map((service, idx) => (
                            <span key={idx} className="px-3 py-1 rounded-full bg-white text-indigo-900 border border-indigo-200 text-xs font-bold shadow-sm">
                                {service}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Call-To-Action Buttons */}
                <div className="flex flex-wrap justify-center gap-3">
                    <button
                        onClick={() => scrollToSection('contact')}
                        className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold text-xs md:text-sm shadow-lg shadow-indigo-500/30 hover:bg-indigo-500 hover:shadow-indigo-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center gap-2"
                    >
                        <span>Gửi bài toán kỹ thuật & Trao đổi giải pháp</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                    <button
                        onClick={() => scrollToSection('workflow')}
                        className="px-5 py-3 rounded-xl bg-white border border-slate-300 text-slate-700 font-semibold text-xs md:text-sm hover:border-indigo-400 hover:bg-slate-50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                    >
                        <span>Xem quy trình làm việc</span>
                    </button>
                </div>

                {/* Proof of Work Bar - 4 Pillars */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 w-full max-w-4xl mt-12">
                    <div className="p-4 rounded-2xl bg-white/90 border border-slate-200/90 backdrop-blur-xl shadow-md shadow-slate-200/50 flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-indigo-500/10">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Depth of Systems</span>
                        <span className="text-base font-black text-indigo-600 tracking-tight">32K+ LOC C++</span>
                        <span className="text-xs font-semibold text-slate-700 mt-0.5">Autolang Compiler & VM</span>
                        <span className="text-[11px] text-slate-500 mt-0.5">Tự phát triển từ con số 0</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/90 border border-slate-200/90 backdrop-blur-xl shadow-md shadow-slate-200/50 flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-indigo-500/10">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Production Delivery</span>
                        <span className="text-base font-black text-indigo-600 tracking-tight">2 APP STORES</span>
                        <span className="text-xs font-semibold text-slate-700 mt-0.5">T-Lighting IoT</span>
                        <span className="text-[11px] text-slate-500 mt-0.5">Google Play & App Store</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/90 border border-slate-200/90 backdrop-blur-xl shadow-md shadow-slate-200/50 flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-indigo-500/10">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Certified Outcome</span>
                        <span className="text-base font-black text-indigo-600 tracking-tight">GIẢI NHẤT</span>
                        <span className="text-xs font-semibold text-slate-700 mt-0.5">Cuộc thi sáng tạo thanh thiếu niên nhi đồng tỉnh hưng yên lần thứ nhất</span>
                        <span className="text-[11px] text-slate-500 mt-0.5">Ứng dụng Giáo dục Địa phương</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/90 border border-slate-200/90 backdrop-blur-xl shadow-md shadow-slate-200/50 flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-indigo-500/10">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Production Experience</span>
                        <span className="text-base font-black text-indigo-600 tracking-tight">SOFTWARE ENGINEER</span>
                        <span className="text-xs font-semibold text-slate-700 mt-0.5">adagroup</span>
                        <span className="text-[11px] text-slate-500 mt-0.5">Backend & AI Integration</span>
                    </div>
                </div>
            </section>

            {/* Service Mapping Section ("WHAT I CAN BUILD FOR YOU") */}
            <section id='services' className="p-6 md:p-8 rounded-2xl bg-white/90 border border-slate-200/90 backdrop-blur-xl shadow-xl shadow-slate-200/50 space-y-6">
                <div className="space-y-2 border-b border-slate-200/80 pb-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                        <h2 className="text-base md:text-lg font-extrabold text-slate-900 border-l-4 border-indigo-600 pl-3 tracking-tight">
                            DỊCH VỤ & GIẢI PHÁP TÔI CÓ THỂ XÂY DỰNG (WHAT I CAN BUILD FOR YOU)
                        </h2>
                        <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-[11px] font-extrabold">
                            Sẵn sàng xử lý bài toán khó ngoài giới hạn Framework
                        </span>
                    </div>
                    <p className="text-xs text-slate-600 pl-4">
                        Giải quyết các yêu cầu sản phẩm từ bài toán AI, backend, ứng dụng di động/IoT đến việc sẵn sàng đảm nhận những bài toán kỹ thuật phức tạp mà các framework thông thường chưa hỗ trợ.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Service 1: AI Systems */}
                    <div className="p-5 rounded-xl bg-slate-50/90 border border-slate-200/90 space-y-3 flex flex-col justify-between hover:border-indigo-300 transition-all duration-200">
                        <div className="space-y-2">
                            <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-indigo-100 text-indigo-800 uppercase tracking-wider">01. AI Systems</span>
                            <h3 className="text-sm font-bold text-slate-900">Luồng Dữ liệu & Hệ thống AI (AI Pipelines)</h3>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                Trích xuất nội dung văn bản CV/tài liệu không cấu trúc, tạo Vector Embeddings, tìm kiếm ngữ nghĩa tốc độ cao trên Vector Database và tự động đối sánh/đánh giá bằng mô hình AI.
                            </p>
                        </div>
                        <div className="space-y-2 pt-2 border-t border-slate-200/60">
                            <p className="text-[11px] font-bold text-indigo-700">Dự án minh chứng: TALENTLENS AI</p>
                            <div className="flex flex-wrap gap-1">
                                {['LLM Integration', 'Vector Search', 'Document Parsing', 'pgvector'].map((tag, i) => (
                                    <span key={i} className="px-2 py-0.5 text-[10px] font-semibold rounded bg-white border border-slate-200 text-slate-700">{tag}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Service 2: Backend & Data */}
                    <div className="p-5 rounded-xl bg-slate-50/90 border border-slate-200/90 space-y-3 flex flex-col justify-between hover:border-indigo-300 transition-all duration-200">
                        <div className="space-y-2">
                            <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-indigo-100 text-indigo-800 uppercase tracking-wider">02. Backend & Data</span>
                            <h3 className="text-sm font-bold text-slate-900">Hệ thống Backend & Cơ sở Dữ liệu</h3>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                Thiết kế giao diện lập trình REST APIs, kiến trúc cơ sở dữ liệu PostgreSQL, cơ chế phân quyền tài khoản, bảo mật và dịch vụ backend tích hợp AI.
                            </p>
                        </div>
                        <div className="space-y-2 pt-2 border-t border-slate-200/60">
                            <p className="text-[11px] font-bold text-indigo-700">Dự án minh chứng: Backends sản phẩm thực tế</p>
                            <div className="flex flex-wrap gap-1">
                                {['REST APIs', 'PostgreSQL', 'Auth & Security', 'Data Pipelines'].map((tag, i) => (
                                    <span key={i} className="px-2 py-0.5 text-[10px] font-semibold rounded bg-white border border-slate-200 text-slate-700">{tag}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Service 3: Mobile & IoT */}
                    <div className="p-5 rounded-xl bg-slate-50/90 border border-slate-200/90 space-y-3 flex flex-col justify-between hover:border-indigo-300 transition-all duration-200">
                        <div className="space-y-2">
                            <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-indigo-100 text-indigo-800 uppercase tracking-wider">03. Mobile & IoT</span>
                            <h3 className="text-sm font-bold text-slate-900">Ứng dụng Di động & Kết nối Phần cứng IoT</h3>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                Phát triển ứng dụng Website, ứng dụng hiệu suất cao, lập trình giao tiếp, kết nối Bluetooth, Wifi, vi điều khiển.
                            </p>
                        </div>
                        <div className="space-y-2 pt-2 border-t border-slate-200/60">
                            <p className="text-[11px] font-bold text-indigo-700">Dự án minh chứng: T-Lighting & Giáo dục Địa phương</p>
                            <div className="flex flex-wrap gap-1">
                                {['Flutter', 'Android (Java)', 'BLE Protocol', 'App Store Deployment'].map((tag, i) => (
                                    <span key={i} className="px-2 py-0.5 text-[10px] font-semibold rounded bg-white border border-slate-200 text-slate-700">{tag}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Service 4: Systems & Custom Runtimes (Framework-Exceeding Engineering) */}
                    <div className="p-5 rounded-xl bg-indigo-900/5 border border-indigo-300/80 space-y-3 flex flex-col justify-between hover:border-indigo-500 transition-all duration-200">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between gap-1">
                                <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-indigo-600 text-white uppercase tracking-wider">04. Custom Systems & Runtimes</span>
                                <span className="text-[10px] font-extrabold text-indigo-700 uppercase">Beyond Frameworks</span>
                            </div>
                            <h3 className="text-sm font-bold text-slate-900">Bài toán Kỹ thuật Khó ngoài giới hạn Framework</h3>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                Sẵn sàng nghiên cứu và tự tay thiết kế các vấn đề mà các thư viện/framework có sẵn gặp giới hạn hoặc không hỗ trợ.
                            </p>
                        </div>
                        <div className="space-y-2 pt-2 border-t border-indigo-200/60">
                            <p className="text-[11px] font-bold text-indigo-700">Dự án minh chứng: Autolang (32.000+ LOC C++ tự xây dựng từ đầu)</p>
                            <div className="flex flex-wrap gap-1">
                                {['C++', 'Custom Runtime', 'Bytecode VM', 'Native Bindings', 'Sandboxed Execution'].map((tag, i) => (
                                    <span key={i} className="px-2 py-0.5 text-[10px] font-semibold rounded bg-white border border-indigo-200 text-indigo-900">{tag}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Workflow & Deliverables Section */}
            <section id='workflow' className="p-6 md:p-8 rounded-2xl bg-white/90 border border-slate-200/90 backdrop-blur-xl shadow-xl shadow-slate-200/50 space-y-8">
                <div className="space-y-1 border-b border-slate-200/80 pb-4">
                    <h2 className="text-base md:text-lg font-extrabold text-slate-900 border-l-4 border-indigo-600 pl-3 tracking-tight">
                        QUY TRÌNH LÀM VIỆC & CAM KẾT BÀN GIAO (WORKFLOW & DELIVERABLES)
                    </h2>
                    <p className="text-xs text-slate-600 pl-4">
                        Minh bạch quy trình thực hiện dự án từ phân tích ban đầu đến bàn giao sản phẩm hoàn chỉnh cho khách hàng.
                    </p>
                </div>

                {/* 6 Step Workflow Grid */}
                <div className="space-y-3">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">01. QUY TRÌNH HỢP TÁC 6 BƯỚC</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                            <span className="text-[11px] font-extrabold text-indigo-600">01 — Trao đổi & Xác định Yêu cầu</span>
                            <p className="text-xs text-slate-700 leading-relaxed">Lắng nghe bài toán, phân tích mục tiêu sản phẩm và xác định phạm vi kỹ thuật cần thực hiện.</p>
                        </div>
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                            <span className="text-[11px] font-extrabold text-indigo-600">02 — Thiết kế Kiến trúc & Đề xuất</span>
                            <p className="text-xs text-slate-700 leading-relaxed">Lập đề xuất kiến trúc kỹ thuật, mô hình dữ liệu và lộ trình phát triển phù hợp nhất.</p>
                        </div>
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                            <span className="text-[11px] font-extrabold text-indigo-600">03 — Kế hoạch & Ước lượng Tiến độ</span>
                            <p className="text-xs text-slate-700 leading-relaxed">Phân chia các mốc bàn giao cụ thể, thống nhất chi phí và mốc thời gian hoàn thành.</p>
                        </div>
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                            <span className="text-[11px] font-extrabold text-indigo-600">04 — Phát triển & Tối ưu hóa</span>
                            <p className="text-xs text-slate-700 leading-relaxed">Lập trình mã nguồn sạch, tối ưu hiệu năng và cập nhật tiến độ định kỳ cho khách hàng.</p>
                        </div>
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                            <span className="text-[11px] font-extrabold text-indigo-600">05 — Kiểm thử & Đảm bảo Chất lượng</span>
                            <p className="text-xs text-slate-700 leading-relaxed">Kiểm thử toàn diện luồng dữ liệu, giao diện người dùng và kịch bản thực tế trước khi bàn giao.</p>
                        </div>
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                            <span className="text-[11px] font-extrabold text-indigo-600">06 — Triển khai & Bàn giao Sản phẩm</span>
                            <p className="text-xs text-slate-700 leading-relaxed">Đóng gói triển khai hệ thống, bàn giao mã nguồn, tài liệu vận hành và hỗ trợ sau bàn giao.</p>
                        </div>
                    </div>
                </div>

                {/* Deliverables Commitments Grid */}
                <div className="space-y-3 pt-2">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">02. KẾT QUẢ BÀN GIAO CAM KẾT (WHAT YOU GET)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        <div className="p-3.5 rounded-xl bg-indigo-50/50 border border-indigo-100 flex items-start gap-3">
                            <div className="space-y-0.5">
                                <p className="font-bold text-indigo-950">Mã nguồn Hoàn chỉnh (Clean Codebase)</p>
                                <p className="text-slate-600 leading-relaxed">Mã nguồn gốc được cấu trúc chuẩn mực, tuân thủ nguyên tắc thiết kế, có chú thích đầy đủ và dễ mở rộng.</p>
                            </div>
                        </div>
                        <div className="p-3.5 rounded-xl bg-indigo-50/50 border border-indigo-100 flex items-start gap-3">
                            <div className="space-y-0.5">
                                <p className="font-bold text-indigo-950">Tài liệu Kỹ thuật & APIs</p>
                                <p className="text-slate-600 leading-relaxed">Tài liệu kiến trúc hệ thống, hướng dẫn vận hành và tài liệu các điểm truy cập API rõ ràng.</p>
                            </div>
                        </div>
                        <div className="p-3.5 rounded-xl bg-indigo-50/50 border border-indigo-100 flex items-start gap-3">
                            <div className="space-y-0.5">
                                <p className="font-bold text-indigo-950">Thiết kế Cơ sở Dữ liệu & AI Pipeline</p>
                                <p className="text-slate-600 leading-relaxed">Sơ đồ cơ sở dữ liệu chuẩn hóa, cấu hình truy vấn và luồng xử lý AI tối ưu cho bài toán.</p>
                            </div>
                        </div>
                        <div className="p-3.5 rounded-xl bg-indigo-50/50 border border-indigo-100 flex items-start gap-3">
                            <div className="space-y-0.5">
                                <p className="font-bold text-indigo-950">Hạ tầng & Triển khai Cloud Setup</p>
                                <p className="text-slate-600 leading-relaxed">Cấu hình máy chủ, tự động hóa quy trình triển khai.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About / Profile Summary */}
            <section id='about' className="p-6 md:p-8 rounded-2xl bg-white/90 border border-slate-200/90 backdrop-blur-xl shadow-xl shadow-slate-200/50 space-y-6">
                <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                    <img src='/portfolio/images/my_face.jpg' alt='Lương Ngọc Hoàn' className="w-20 h-20 md:w-24 md:h-24 rounded-full ring-4 ring-indigo-500/20 shadow-lg shadow-indigo-500/15 object-cover flex-shrink-0" />
                    <div className="space-y-2 text-xs md:text-sm text-slate-700">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                            <h2 className="text-base md:text-lg font-bold text-slate-900">Lương Ngọc Hoàn</h2>
                            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                                Software Engineer @ adagroup (03/2026 – Hiện tại)
                            </span>
                        </div>
                        <p className="text-slate-600 leading-relaxed pt-1">
                            Kỹ sư phần mềm có khả năng làm việc xuyên tầng từ kỹ thuật hệ thống lõi (C++, trình biên dịch, máy ảo) đến sản phẩm di động, IoT và AI thực tế. Định hướng tập trung vào hiệu quả giải quyết bài toán và kết quả thực tế cho dự án của khách hàng.
                        </p>
                    </div>
                </div>
            </section>

            {/* Dedicated Experience Section */}
            <section id='experience' className="p-6 md:p-8 rounded-2xl bg-white/90 border border-slate-200/90 backdrop-blur-xl shadow-xl shadow-slate-200/50 space-y-6">
                <h2 className="text-base md:text-lg font-bold text-slate-900 border-l-4 border-indigo-600 pl-3 tracking-tight">
                    Kinh nghiệm Thực tế (Experience)
                </h2>
                <div className="space-y-4">
                    <div className="p-5 rounded-xl bg-slate-50/80 border border-slate-200/80 space-y-3">
                        <div className="flex flex-wrap justify-between items-center gap-2">
                            <h3 className="text-sm md:text-base font-bold text-slate-900">adagroup</h3>
                            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                                03/2026 – Hiện tại
                            </span>
                        </div>
                        <p className="text-xs font-semibold text-indigo-600">Vị trí: Lập trình viên Phần mềm (Software Engineer)</p>
                        <ul className="list-disc list-inside text-xs text-slate-600 space-y-1.5 leading-relaxed">
                            <li>Tham gia phân tích kiến trúc backend, tích hợp các giải pháp AI và xây dựng các luồng xử lý dữ liệu cho hệ thống phần mềm sản phẩm thực tế.</li>
                            <li>Tối ưu hóa hiệu năng ứng dụng và tham gia quy trình triển khai sản phẩm đến người dùng.</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Selected Work Section */}
            <section id='projects' className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-base md:text-lg font-bold text-slate-900 border-l-4 border-indigo-600 pl-3 tracking-tight">
                        Dự án Tiêu biểu (Selected Work)
                    </h2>
                    <span className="text-xs text-slate-500 font-medium">Bấm vào card để xem cách vận hành</span>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {/* Project 1: Autolang */}
                    <Project
                        lang='vi'
                        title='AUTOLANG'
                        subtitle='Trình biên dịch & Môi trường thực thi C++'
                        problem='Các mô hình AI nhỏ ngày càng nhanh và chi phí thấp, nhưng dễ phát sinh lỗi gọi sai giao diện lập trình hoặc ảo tưởng mã. Làm thế nào để môi trường thực thi có thể kiểm soát và hỗ trợ mã do AI sinh ra chạy an toàn?'
                        solution='Tự tay phát triển Autolang - ngôn ngữ kịch bản nhẹ và môi trường thực thi nhúng cho phép thực thi mã AI thông qua các năng lực được lập trình viên định nghĩa sẵn (VD: Products.getProducts() thay vì cho phép AI truy cập trực tiếp hệ thống).'
                        technicalDepth='Chuỗi trình biên dịch C++, cây cú pháp AST, máy ảo bytecode, kiểm tra kiểu tĩnh, liên kết mã nguồn gốc, quản lý bộ nhớ (Arena Allocator, Reference Counting) và giới hạn tài nguyên thực thi.'
                        outcome='32.000+ dòng mã C++ tự phát triển từ con số 0.'
                        langOrFramework={['C++', 'Compiler Design', 'Bytecode VM', 'Arena Allocator', 'Native Bindings']}
                        motivation='Các mô hình AI nhỏ ngày càng rẻ và nhanh, nhưng dễ gặp lỗi gọi sai API hoặc ảo tưởng hàm. Dự án nghiên cứu câu hỏi: Liệu môi trường thực thi (runtime) có thể được thiết kế để giúp mã do AI sinh ra an toàn hơn, dễ kiểm tra và tự sửa lỗi hơn không?'
                        target='Autolang là ngôn ngữ kịch bản nhẹ và môi trường thực thi nhúng cho phép chạy mã AI thông qua các năng lực (Capabilities) do lập trình viên định nghĩa sẵn (VD: Products.getProducts() thay vì Database.query(...)).'
                        codeSnippet={`Products.getProducts()
  .filter {|product| product.remaining}
  .forEach {|product|
    when (product.price) {
      >3 -> expensiveCount += 1
      ==3 -> normalCount += 1
      else -> cheapCount += 1
    }
  }`}
                        feature={[
                            'Tự tay xây dựng hơn 32.000 dòng mã C++ thuần (Lexer, Parser, AST Compiler, Bytecode VM, Arena Allocator, Reference Counting).',
                            'Kiểm tra kiểu tĩnh & Phản hồi lỗi stack trace rõ ràng giúp mô hình AI dễ nhận diện và tự sửa lỗi mã.',
                            'Thực thi cách ly, giới hạn Opcode & Tài nguyên, không đòi hỏi mã AI phải cài đặt thư viện ngoài.'
                        ]}
                        status='07/2025 - Hiện tại'
                        role='Compiler & Runtime Engineer'
                        result={[
                            'Tự tay xây dựng hơn 32.000 dòng mã C++ thuần từ con số 0.',
                            'Benchmark thực thi nội bộ: Chậm hơn Lua khoảng 2-5x lần ở các bài kiểm tra thực thi hiện tại.',
                            'Benchmark cấp phát bộ nhớ: Tốc độ cấp phát 1.000.000 đối tượng nhanh hơn Lua khoảng 1.5-2x lần trong điều kiện thử nghiệm.'
                        ]}
                        imgUrl='/portfolio/images/autolang.png'
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

                    {/* Project 2: TALENTLENS AI */}
                    <Project
                        lang='vi'
                        title='TALENTLENS AI'
                        subtitle='Hệ thống Xử lý Tài liệu & Tìm kiếm Ngữ nghĩa AI'
                        problem='Chuyển đổi các hồ sơ ứng viên dạng tài liệu không có cấu trúc thành dữ liệu có thể tìm kiếm theo ngữ nghĩa và tự động đánh giá phù hợp.'
                        solution='Xây dựng luồng dữ liệu trích xuất tài liệu CV thô -> Tạo Vector Embeddings -> Tìm kiếm ngữ nghĩa trên Vector Database (pgvector) -> Đánh giá và đối sánh hồ sơ tự động qua AI.'
                        technicalDepth='Trích xuất văn bản tài liệu, chuyển đổi Vector Embeddings, truy vấn ngữ nghĩa tốc độ cao trên cơ sở dữ liệu Vector và tích hợp mô hình ngôn ngữ AI.'
                        outcome='Xây dựng thành công pipeline truy vấn ngữ nghĩa CV và đánh giá đối sánh tự động.'
                        langOrFramework={['Gemini LLM', 'Vector Embeddings', 'pgvector', 'PostgreSQL', 'Node.js']}
                        pipeline='PDF/CV Parsing → Embeddings → PostgreSQL Vector Search → Semantic Matching → LLM Evaluation'
                        target='Hệ thống ứng dụng kỹ thuật AI vào sản phẩm thực tế: Tự động trích xuất tài liệu/CV, chuyển đổi thành Vector Embeddings, tìm kiếm ngữ nghĩa trên Vector Database (pgvector) và đối sánh đánh giá hồ sơ tự động.'
                        feature={[
                            'Xử lý Tài liệu & Embeddings: Trích xuất nội dung văn bản CV thô và tạo Vector Embeddings.',
                            'Vector Search & Semantic Matching: Tìm kiếm đối sánh ngữ nghĩa ứng viên trên PostgreSQL Vector Database.',
                            'AI Evaluation Integration: Đánh giá và xếp hạng hồ sơ tự động thông qua AI LLM API.'
                        ]}
                        status='2025 - 2026'
                        role='AI Systems Engineer'
                        result={[
                            'Xây dựng thành công luồng xử lý từ tài liệu thô -> Embeddings -> Tìm kiếm ngữ nghĩa -> Đánh giá AI.'
                        ]}
                        imgUrl='/portfolio/images/autolang.png'
                    />

                    {/* Project 3: Local Education */}
                    <Project
                        lang='vi'
                        award='GIẢI NHẤT Cuộc thi cuộc thi sáng tạo thanh thiếu niên nhi đồng tỉnh hưng yên 2025-2026'
                        title='Ứng dụng Giáo dục Địa phương Thái Bình'
                        subtitle='Ứng dụng Native Android Sản phẩm Thực tế'
                        problem='Số hóa, phân phối và quản lý tài liệu học tập giáo dục địa phương cho học sinh và giáo viên trên toàn tỉnh.'
                        solution='Phát triển ứng dụng Android gốc tích hợp trình đọc tài liệu nhúng, bài giảng đa phương tiện, hệ thống làm bài kiểm tra trực tuyến và phân quyền quản trị nội dung.'
                        technicalDepth='Bộ công cụ hiển thị tài liệu nhúng, xử lý truyền tải nội dung đa phương tiện, hệ thống quản trị nội dung và phân quyền người dùng.'
                        outcome='Đạt GIẢI NHẤT Cuộc thi Sáng tạo Thanh, Thiếu niên, Nhi đồng tỉnh Hưng Yên lần thứ I và đưa vào sử dụng.'
                        langOrFramework={['Java', 'AndroidX', 'XML', 'Firebase', 'CMS']}
                        pipeline='Document Digitization → Embedded PDF Engine → Multimedia Lessons → CMS Admin → Online Quiz'
                        target='Giải quyết bài toán số hóa, phân phối và quản lý tài liệu học tập giáo dục địa phương cho học sinh và giáo viên toàn tỉnh. Tích hợp trình đọc PDF nhúng, bài giảng đa phương tiện, làm bài kiểm tra trực tuyến và phân quyền kiểm duyệt.'
                        feature={[
                            'Đạt GIẢI NHẤT Cuộc thi Sáng tạo Thanh, Thiếu niên, Nhi đồng tỉnh Hưng Yên lần thứ I.',
                            'Hệ thống tài liệu PDF nhúng trực tiếp, hỗ trợ tích hợp Video, Audio tương tác.',
                            'Quản lý nội dung (CMS/Admin): Phân quyền tài khoản chặt chẽ, kiểm duyệt bài viết và tạo bài kiểm tra.'
                        ]}
                        status='11/2024 - 02/2025'
                        role='Mobile Developer'
                        result={[
                            'Đạt GIẢI NHẤT Cuộc thi Sáng tạo Thanh, Thiếu niên, Nhi đồng tỉnh Hưng Yên lần thứ I.',
                            'Xây dựng thành công hệ thống luồng dữ liệu quản lý tài liệu và phân quyền tài khoản hoàn chỉnh.'
                        ]}
                        imgUrl='/portfolio/images/gddp.png'
                        images={[
                            '/portfolio/images/gddp_anh_1.png',
                            '/portfolio/images/gddp_anh_2.png',
                            '/portfolio/images/gddp_anh_3.jpg',
                            '/portfolio/images/bang_khen_chu_tich_tinh.jpg',
                            '/portfolio/images/giay_chung_nhan_nhat_tinh.jpg'
                        ]}
                    />

                    {/* Project 4: T-Lighting */}
                    <Project
                        lang='vi'
                        award='Triển khai Google Play Store & Apple App Store'
                        title='T-Lighting (Hệ thống Điều khiển Đèn xe)'
                        subtitle='Sản phẩm IoT Phần cứng & Phần mềm Toàn diện'
                        problem='Xây dựng sản phẩm IoT hoàn chỉnh kết nối từ phần cứng điều khiển đèn xe đến ứng dụng di động cho người dùng.'
                        solution='Lập trình vi điều khiển C++ nhận truyền thông điệp BLE kết hợp ứng dụng di động Flutter điều khiển màu sắc và hiệu ứng ánh sáng theo thời gian thực.'
                        technicalDepth='Lập trình phần cứng nhúng C++, thiết kế giao thức kết nối BLE, phát triển ứng dụng di động và quy trình xuất bản lên 2 cửa hàng ứng dụng.'
                        outcome='Xuất bản thành công trên cả Google Play Store và Apple App Store.'
                        langOrFramework={['Embedded C++', 'BLE', 'Flutter', 'Google Play', 'Apple App Store']}
                        pipeline='Embedded C++ Firmware → BLE Wireless Protocol → Flutter Mobile App → App Store / Play Store'
                        target='Thể hiện năng lực kỹ thuật làm chủ trọn gói từ phần cứng đến phần mềm: Lập trình vi điều khiển C++ nhận tín hiệu BLE -> Ứng dụng di động Flutter điều khiển RGB thời gian thực -> Triển khai lên Google Play & Apple App Store.'
                        feature={[
                            'Firmware C++ Vi điều khiển: Lập trình điều khiển tín hiệu phần cứng và truyền nhận dữ liệu qua BLE.',
                            'Ứng dụng Di động Flutter: Giao diện điều chỉnh màu sắc RGB, độ sáng và hiệu ứng ánh sáng tức thì.',
                            'Triển khai thực tế: Đưa thành công lên cả Google Play Store và Apple App Store.'
                        ]}
                        status='07/2025 - Hiện tại'
                        role='Fullstack IoT Developer (Hardware + Mobile App)'
                        result={[
                            'Hoàn thiện luồng kết nối phần cứng - phần mềm ổn định.',
                            'Đưa ứng dụng thành công lên cả Google Play và App Store.'
                        ]}
                        imgUrl='/portfolio/images/t-lighting.png'
                        link={{
                            'Google Play Store': 'https://play.google.com/store/apps/details?id=com.ngocthai.tlighting&hl=vi',
                            'Apple App Store': 'https://apps.apple.com/app/t-lighting/id6749724474'
                        }}
                        images={Array.from({ length: 7 }, (_, i) => `/portfolio/images/tlighting/${i + 1}.jpg`)}
                    />
                </div>
            </section>

            {/* Low-Friction Contact Section */}
            <section id='contact' className="p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white space-y-6 shadow-2xl border border-indigo-500/20 text-center flex flex-col items-center">
                <span className="px-3.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold uppercase tracking-wider border border-indigo-500/30">
                    TRAO ĐỔI DỰ ÁN & TƯ VẤN KIẾN TRÚC (LOW-FRICTION CONTACT)
                </span>
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight max-w-2xl leading-snug">
                    Bạn có một bài toán kỹ thuật nhưng chưa biết nên triển khai như thế nào?
                </h2>
                <p className="text-xs md:text-sm text-slate-300 max-w-xl leading-relaxed">
                    Hãy gửi cho tôi mô tả bài toán, sơ đồ ý tưởng hoặc prototype hiện tại. Tôi sẽ cùng bạn phân tích kiến trúc và xác định hướng triển khai phù hợp nhất trước khi bắt đầu phát triển.
                </p>
                <div className="flex flex-wrap justify-center gap-3 pt-2">
                    <a
                        href="mailto:hoansdz@gmail.com"
                        role="button"
                        className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs md:text-sm font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-indigo-500/30 flex items-center gap-2"
                    >
                        <span>Gửi Yêu cầu & Bắt đầu Trao đổi</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </a>
                    <a
                        href="https://github.com/hoansdz"
                        target="_blank"
                        rel="noopener noreferrer"
                        role="button"
                        className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs md:text-sm font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
                    >
                        <span>Xem Mã nguồn trên GitHub</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>
                </div>
            </section>
        </div>
    )
}

function HomeEN() {
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto space-y-14 px-4">
            {/* Header Hero Section */}
            <section id='home' className="relative py-12 md:py-20 text-center flex flex-col items-center justify-center">
                <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden">
                    <div className="w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl" />
                    <div className="w-80 h-80 rounded-full bg-violet-500/10 blur-3xl -ml-20" />
                </div>

                <span className="inline-flex items-center rounded-full bg-indigo-50 px-4 py-1.5 text-xs font-semibold text-indigo-700 ring-1 ring-indigo-200 mb-5 tracking-wider uppercase shadow-sm">
                    Technical MVP Engineer · Systems & AI Software Engineer
                </span>

                <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-800 bg-clip-text text-transparent mb-4 tracking-tight leading-tight py-1">
                    Luong Ngoc Hoan
                </h1>

                <h2 className="text-lg md:text-xl font-bold text-indigo-950 max-w-2xl leading-snug mb-3">
                    I build technical MVPs and complex software products — from AI & Backend to Mobile, IoT, and Core Systems.
                </h2>

                <p className="text-xs md:text-sm text-slate-600 font-medium tracking-wide max-w-2xl leading-relaxed mb-6">
                    Turning complex technical problems into working products with end-to-end deliverables from architecture and codebase to docs and deployment. Ready to handle complex challenges beyond standard framework limits.
                </p>

                {/* Available for Services Bar */}
                <div className="w-full max-w-3xl p-4 rounded-2xl bg-indigo-900/5 border border-indigo-200/80 backdrop-blur-md mb-8">
                    <p className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider mb-2">AVAILABLE FOR CONTRACT & FREELANCE PROJECTS</p>
                    <div className="flex flex-wrap justify-center gap-2">
                        {['AI Systems & Pipelines', 'Backend & APIs', 'Mobile & IoT Solutions', 'Technical MVPs', 'C++ & Custom Runtimes', 'Beyond Framework Limits'].map((service, idx) => (
                            <span key={idx} className="px-3 py-1 rounded-full bg-white text-indigo-900 border border-indigo-200 text-xs font-bold shadow-sm">
                                {service}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Call-To-Action Buttons */}
                <div className="flex flex-wrap justify-center gap-3">
                    <button
                        onClick={() => scrollToSection('contact')}
                        className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold text-xs md:text-sm shadow-lg shadow-indigo-500/30 hover:bg-indigo-500 hover:shadow-indigo-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center gap-2"
                    >
                        <span>Share Technical Requirement & Discuss Solution</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                    <button
                        onClick={() => scrollToSection('workflow')}
                        className="px-5 py-3 rounded-xl bg-white border border-slate-300 text-slate-700 font-semibold text-xs md:text-sm hover:border-indigo-400 hover:bg-slate-50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                    >
                        <span>Explore Workflow</span>
                    </button>
                </div>

                {/* Proof of Work Bar - 4 Pillars */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 w-full max-w-4xl mt-12">
                    <div className="p-4 rounded-2xl bg-white/90 border border-slate-200/90 backdrop-blur-xl shadow-md shadow-slate-200/50 flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-indigo-500/10">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Depth of Systems</span>
                        <span className="text-base font-black text-indigo-600 tracking-tight">32K+ LOC C++</span>
                        <span className="text-xs font-semibold text-slate-700 mt-0.5">Autolang Compiler & VM</span>
                        <span className="text-[11px] text-slate-500 mt-0.5">Built from scratch</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/90 border border-slate-200/90 backdrop-blur-xl shadow-md shadow-slate-200/50 flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-indigo-500/10">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Production Delivery</span>
                        <span className="text-base font-black text-indigo-600 tracking-tight">2 APP STORES</span>
                        <span className="text-xs font-semibold text-slate-700 mt-0.5">T-Lighting IoT</span>
                        <span className="text-[11px] text-slate-500 mt-0.5">Google Play & App Store</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/90 border border-slate-200/90 backdrop-blur-xl shadow-md shadow-slate-200/50 flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-indigo-500/10">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Certified Outcome</span>
                        <span className="text-base font-black text-indigo-600 tracking-tight">FIRST PRIZE</span>
                        <span className="text-xs font-semibold text-slate-700 mt-0.5">Creative Contest, Hung Yen</span>
                        <span className="text-[11px] text-slate-500 mt-0.5">Local Education App</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/90 border border-slate-200/90 backdrop-blur-xl shadow-md shadow-slate-200/50 flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-indigo-500/10">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Production Experience</span>
                        <span className="text-base font-black text-indigo-600 tracking-tight">SOFTWARE ENGINEER</span>
                        <span className="text-xs font-semibold text-slate-700 mt-0.5">adagroup</span>
                        <span className="text-[11px] text-slate-500 mt-0.5">Backend & AI Integration</span>
                    </div>
                </div>
            </section>

            {/* Service Mapping Section ("WHAT I CAN BUILD FOR YOU") */}
            <section id='services' className="p-6 md:p-8 rounded-2xl bg-white/90 border border-slate-200/90 backdrop-blur-xl shadow-xl shadow-slate-200/50 space-y-6">
                <div className="space-y-2 border-b border-slate-200/80 pb-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                        <h2 className="text-base md:text-lg font-extrabold text-slate-900 border-l-4 border-indigo-600 pl-3 tracking-tight">
                            WHAT I CAN BUILD FOR YOU (SERVICES & SOLUTIONS)
                        </h2>
                        <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-[11px] font-extrabold">
                            Ready for Complex Tasks Beyond Framework Limits
                        </span>
                    </div>
                    <p className="text-xs text-slate-600 pl-4">
                        Build production solutions across AI, backend, mobile/IoT, and solve complex technical challenges that standard off-the-shelf frameworks cannot address.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Service 1: AI Systems */}
                    <div className="p-5 rounded-xl bg-slate-50/90 border border-slate-200/90 space-y-3 flex flex-col justify-between hover:border-indigo-300 transition-all duration-200">
                        <div className="space-y-2">
                            <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-indigo-100 text-indigo-800 uppercase tracking-wider">01. AI Systems</span>
                            <h3 className="text-sm font-bold text-slate-900">AI Systems & Data Pipelines</h3>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                Build production AI pipelines involving LLM integration, unstructured document parsing, vector embeddings, high-speed semantic search, profile matching, and automated AI evaluation.
                            </p>
                        </div>
                        <div className="space-y-2 pt-2 border-t border-slate-200/60">
                            <p className="text-[11px] font-bold text-indigo-700">Proven by: TALENTLENS AI</p>
                            <div className="flex flex-wrap gap-1">
                                {['LLM Integration', 'Vector Search', 'Document Parsing', 'pgvector'].map((tag, i) => (
                                    <span key={i} className="px-2 py-0.5 text-[10px] font-semibold rounded bg-white border border-slate-200 text-slate-700">{tag}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Service 2: Backend & Data */}
                    <div className="p-5 rounded-xl bg-slate-50/90 border border-slate-200/90 space-y-3 flex flex-col justify-between hover:border-indigo-300 transition-all duration-200">
                        <div className="space-y-2">
                            <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-indigo-100 text-indigo-800 uppercase tracking-wider">02. Backend & Data</span>
                            <h3 className="text-sm font-bold text-slate-900">Backend & Data Systems</h3>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                Build robust REST APIs, PostgreSQL database architecture, user authentication, role-based access control, security, data pipelines, and AI-backed backend services.
                            </p>
                        </div>
                        <div className="space-y-2 pt-2 border-t border-slate-200/60">
                            <p className="text-[11px] font-bold text-indigo-700">Proven by: Production Backends</p>
                            <div className="flex flex-wrap gap-1">
                                {['REST APIs', 'PostgreSQL', 'Auth & Security', 'Data Pipelines'].map((tag, i) => (
                                    <span key={i} className="px-2 py-0.5 text-[10px] font-semibold rounded bg-white border border-slate-200 text-slate-700">{tag}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Service 3: Mobile & IoT */}
                    <div className="p-5 rounded-xl bg-slate-50/90 border border-slate-200/90 space-y-3 flex flex-col justify-between hover:border-indigo-300 transition-all duration-200">
                        <div className="space-y-2">
                            <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-indigo-100 text-indigo-800 uppercase tracking-wider">03. Mobile & IoT</span>
                            <h3 className="text-sm font-bold text-slate-900">Mobile & IoT Solutions</h3>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                Build Flutter / Native Android applications, program wireless BLE communication protocols for microcontrollers, and handle end-to-end App Store & Google Play deployment.
                            </p>
                        </div>
                        <div className="space-y-2 pt-2 border-t border-slate-200/60">
                            <p className="text-[11px] font-bold text-indigo-700">Proven by: T-Lighting & Local Education</p>
                            <div className="flex flex-wrap gap-1">
                                {['Flutter', 'Android (Java)', 'BLE Protocol', 'App Store Deployment'].map((tag, i) => (
                                    <span key={i} className="px-2 py-0.5 text-[10px] font-semibold rounded bg-white border border-slate-200 text-slate-700">{tag}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Service 4: Systems & Custom Runtimes (Framework-Exceeding Engineering) */}
                    <div className="p-5 rounded-xl bg-indigo-900/5 border border-indigo-300/80 space-y-3 flex flex-col justify-between hover:border-indigo-500 transition-all duration-200">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between gap-1">
                                <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-indigo-600 text-white uppercase tracking-wider">04. Custom Systems & Runtimes</span>
                                <span className="text-[10px] font-extrabold text-indigo-700 uppercase">Beyond Frameworks</span>
                            </div>
                            <h3 className="text-sm font-bold text-slate-900">Complex Engineering Beyond Framework Limits</h3>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                Ready to research and custom-build C++ execution runtimes, scripting compilers, bytecode VMs, sandboxed environments, and native bindings when standard libraries or off-the-shelf frameworks hit limitations.
                            </p>
                        </div>
                        <div className="space-y-2 pt-2 border-t border-indigo-200/60">
                            <p className="text-[11px] font-bold text-indigo-700">Proven by: Autolang (32,000+ LOC C++ from scratch)</p>
                            <div className="flex flex-wrap gap-1">
                                {['C++', 'Custom Runtime', 'Bytecode VM', 'Native Bindings', 'Sandboxed Execution'].map((tag, i) => (
                                    <span key={i} className="px-2 py-0.5 text-[10px] font-semibold rounded bg-white border border-indigo-200 text-indigo-900">{tag}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Workflow & Deliverables Section */}
            <section id='workflow' className="p-6 md:p-8 rounded-2xl bg-white/90 border border-slate-200/90 backdrop-blur-xl shadow-xl shadow-slate-200/50 space-y-8">
                <div className="space-y-1 border-b border-slate-200/80 pb-4">
                    <h2 className="text-base md:text-lg font-extrabold text-slate-900 border-l-4 border-indigo-600 pl-3 tracking-tight">
                        WORKFLOW & DELIVERABLES (HOW I WORK & WHAT YOU GET)
                    </h2>
                    <p className="text-xs text-slate-600 pl-4">
                        Transparent engineering process from initial requirement mapping to full product deployment.
                    </p>
                </div>

                {/* 6 Step Workflow Grid */}
                <div className="space-y-3">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">01. 6-STEP COLLABORATION WORKFLOW</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                            <span className="text-[11px] font-extrabold text-indigo-600">01 — Discovery & Requirements</span>
                            <p className="text-xs text-slate-700 leading-relaxed">Analyze the engineering problem, clarify business objectives, and define technical scope.</p>
                        </div>
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                            <span className="text-[11px] font-extrabold text-indigo-600">02 — Technical Architecture & Proposal</span>
                            <p className="text-xs text-slate-700 leading-relaxed">Formulate technical architecture proposal, data model, and technology stack selection.</p>
                        </div>
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                            <span className="text-[11px] font-extrabold text-indigo-600">03 — Roadmap & Milestone Estimate</span>
                            <p className="text-xs text-slate-700 leading-relaxed">Break down explicit delivery milestones, transparent cost structure, and timeline.</p>
                        </div>
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                            <span className="text-[11px] font-extrabold text-indigo-600">04 — Agile Development & Optimization</span>
                            <p className="text-xs text-slate-700 leading-relaxed">Implement clean codebase, optimize performance, and provide regular progress updates.</p>
                        </div>
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                            <span className="text-[11px] font-extrabold text-indigo-600">05 — Testing & Quality Assurance</span>
                            <p className="text-xs text-slate-700 leading-relaxed">Conduct thorough testing across data pipelines, user interfaces, and edge-case scenarios.</p>
                        </div>
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                            <span className="text-[11px] font-extrabold text-indigo-600">06 — Deployment & Product Handover</span>
                            <p className="text-xs text-slate-700 leading-relaxed">Package cloud infrastructure, handover complete codebase, technical docs, and post-launch support.</p>
                        </div>
                    </div>
                </div>

                {/* Deliverables Commitments Grid */}
                <div className="space-y-3 pt-2">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">02. COMMITTED DELIVERABLES (WHAT YOU GET)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        <div className="p-3.5 rounded-xl bg-indigo-50/50 border border-indigo-100 flex items-start gap-3">
                            <div className="space-y-0.5">
                                <p className="font-bold text-indigo-950">Clean Codebase & Architecture</p>
                                <p className="text-slate-600 leading-relaxed">Maintainable, well-structured, documented codebase following industry design patterns.</p>
                            </div>
                        </div>
                        <div className="p-3.5 rounded-xl bg-indigo-50/50 border border-indigo-100 flex items-start gap-3">
                            <div className="space-y-0.5">
                                <p className="font-bold text-indigo-950">Technical & API Documentation</p>
                                <p className="text-slate-600 leading-relaxed">System operational guide, architecture specs, and complete API endpoint documentation.</p>
                            </div>
                        </div>
                        <div className="p-3.5 rounded-xl bg-indigo-50/50 border border-indigo-100 flex items-start gap-3">
                            <div className="space-y-0.5">
                                <p className="font-bold text-indigo-950">Database Schema & AI Pipeline Setup</p>
                                <p className="text-slate-600 leading-relaxed">Normalized database schema, optimized vector index queries, and production AI data pipeline.</p>
                            </div>
                        </div>
                        <div className="p-3.5 rounded-xl bg-indigo-50/50 border border-indigo-100 flex items-start gap-3">
                            <div className="space-y-0.5">
                                <p className="font-bold text-indigo-950">Production Deployment & Cloud Setup</p>
                                <p className="text-slate-600 leading-relaxed">Server environment configuration, CI/CD automated deployment, and app store publishing.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About / Profile Summary */}
            <section id='about' className="p-6 md:p-8 rounded-2xl bg-white/90 border border-slate-200/90 backdrop-blur-xl shadow-xl shadow-slate-200/50 space-y-6">
                <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                    <img src='/portfolio/images/my_face.jpg' alt='Luong Ngoc Hoan' className="w-20 h-20 md:w-24 md:h-24 rounded-full ring-4 ring-indigo-500/20 shadow-lg shadow-indigo-500/15 object-cover flex-shrink-0" />
                    <div className="space-y-2 text-xs md:text-sm text-slate-700">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                            <h2 className="text-base md:text-lg font-bold text-slate-900">Luong Ngoc Hoan</h2>
                            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                                Software Engineer @ adagroup (March 2026 – Present)
                            </span>
                        </div>
                        <p className="text-slate-600 leading-relaxed pt-1">
                            Software engineer capable of working from low-level system internals (C++, Compilers, Virtual Machines) to production mobile, IoT and AI products. Focused on delivering technical solutions that achieve client business outcomes.
                        </p>
                    </div>
                </div>
            </section>

            {/* Dedicated Experience Section */}
            <section id='experience' className="p-6 md:p-8 rounded-2xl bg-white/90 border border-slate-200/90 backdrop-blur-xl shadow-xl shadow-slate-200/50 space-y-6">
                <h2 className="text-base md:text-lg font-bold text-slate-900 border-l-4 border-indigo-600 pl-3 tracking-tight">
                    Career Experience
                </h2>
                <div className="space-y-4">
                    <div className="p-5 rounded-xl bg-slate-50/80 border border-slate-200/80 space-y-3">
                        <div className="flex flex-wrap justify-between items-center gap-2">
                            <h3 className="text-sm md:text-base font-bold text-slate-900">adagroup</h3>
                            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                                March 2026 – Present
                            </span>
                        </div>
                        <p className="text-xs font-semibold text-indigo-600">Role: Software Engineer</p>
                        <ul className="list-disc list-inside text-xs text-slate-600 space-y-1.5 leading-relaxed">
                            <li>Worked on backend system architecture analysis, AI solution integration, and application data pipelines in production software systems.</li>
                            <li>Assisted in system performance optimization and production software deployment.</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Selected Work Section */}
            <section id='projects' className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-base md:text-lg font-bold text-slate-900 border-l-4 border-indigo-600 pl-3 tracking-tight">
                        Selected Work
                    </h2>
                    <span className="text-xs text-slate-500 font-medium">Click card to see how it works</span>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {/* Project 1: Autolang */}
                    <Project
                        lang='en'
                        title='AUTOLANG'
                        subtitle='C++ Compiler & Bytecode Runtime'
                        problem='Lightweight AI models are fast and inexpensive, but often generate incorrect API calls and unsafe workarounds. Can the execution environment itself be designed to make lightweight AI-generated code safer and easier to validate?'
                        solution='Built Autolang, a lightweight scripting language and embeddable bytecode runtime where developers expose controlled capabilities (e.g., Products.getProducts()) instead of giving AI unrestricted access to application APIs.'
                        technicalDepth='C++ compiler pipeline, AST, bytecode VM, static typing, native bindings, memory management (Arena Allocator, Reference Counting), and runtime resource limits.'
                        outcome='32,000+ lines of C++ built from scratch.'
                        langOrFramework={['C++', 'Compiler Design', 'Bytecode VM', 'Arena Allocator', 'Native Bindings']}
                        motivation='Lightweight AI models are cheap and fast, but they frequently hallucinate APIs and generate incorrect code. Can the execution environment itself be designed to make lightweight AI-generated code safer, easier to validate, and easier to self-repair?'
                        target='Autolang is a lightweight scripting language and embeddable runtime designed for executing AI-generated code through controlled, developer-defined capabilities (e.g., Products.getProducts() instead of Database.query(...)).'
                        codeSnippet={`Products.getProducts()
  .filter {|product| product.remaining}
  .forEach {|product|
    when (product.price) {
      >3 -> expensiveCount += 1
      ==3 -> normalCount += 1
      else -> cheapCount += 1
    }
  }`}
                        feature={[
                            'Independently built 32,000+ lines of pure C++ code (Lexer, Parser, AST Compiler, Bytecode VM, Arena Allocator, Reference Counting).',
                            'Static typing & structured error stack traces enable AI models to rapidly detect and self-correct code.',
                            'Sandboxed execution, opcode & resource limits, with zero external package installation requirements.'
                        ]}
                        status='July 2025 - Present'
                        role='Compiler & Runtime Engineer'
                        result={[
                            'Independently engineered 32,000+ lines of pure C++ code from scratch.',
                            'Internal execution benchmark: ~2-5x slower than Lua under current tested workloads.',
                            'Internal memory benchmark: ~1.5-2x the object allocation speed of Lua under tested conditions.'
                        ]}
                        imgUrl='/portfolio/images/autolang.png'
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

                    {/* Project 2: TALENTLENS AI */}
                    <Project
                        lang='en'
                        title='TALENTLENS AI'
                        subtitle='AI Document Processing & Semantic Search System'
                        problem='Turn unstructured candidate documents into searchable and automatically evaluated candidate profiles.'
                        solution='Built an end-to-end AI retrieval and evaluation pipeline: Document Parsing → Embeddings → Vector Search → Semantic Matching → LLM Evaluation.'
                        technicalDepth='Structured text extraction, vector embedding generation, high-performance semantic retrieval on Vector Database, and LLM integration.'
                        outcome='Delivered an end-to-end AI retrieval and candidate evaluation pipeline.'
                        langOrFramework={['Gemini LLM', 'Vector Embeddings', 'pgvector', 'PostgreSQL', 'Node.js']}
                        pipeline='PDF/CV Parsing → Embeddings → PostgreSQL Vector Search → Semantic Matching → LLM Evaluation'
                        target='Practical AI engineering system: Parses raw CVs, generates Vector Embeddings, conducts fast semantic search over PostgreSQL Vector Database (pgvector), and evaluates candidates automatically.'
                        feature={[
                            'Document Parsing & Embeddings: Text extraction from raw CV documents and Vector Embedding generation.',
                            'Vector Search & Semantic Matching: High-performance semantic matching over PostgreSQL Vector Database.',
                            'AI Evaluation Integration: Automated candidate evaluation and ranking via LLM API.'
                        ]}
                        status='2025 - 2026'
                        role='AI Systems Engineer'
                        result={[
                            'Built an end-to-end data pipeline from raw documents to embeddings, semantic search, and AI evaluation.'
                        ]}
                        imgUrl='/portfolio/images/autolang.png'
                    />

                    {/* Project 3: Local Education */}
                    <Project
                        lang='en'
                        award='FIRST PRIZE in the 1st Youth Creative Contest of Hung Yen Province'
                        title='Thai Binh Local Education Application'
                        subtitle='Production Native Android Application'
                        problem='Digitizing and distributing local educational curriculum across schools for students and teachers.'
                        solution='Built a native Android application with embedded document viewing, interactive multimedia lessons, CMS moderation, role-based access control, and online quizzes.'
                        technicalDepth='Embedded document reader engine, multimedia streaming integration, role-based permissions, and content management system.'
                        outcome='Won FIRST PRIZE in the Youth Creative Contest of Hung Yen Province.'
                        langOrFramework={['Java', 'AndroidX', 'XML', 'Firebase', 'CMS']}
                        pipeline='Document Digitization → Embedded PDF Engine → Multimedia Lessons → CMS Admin → Online Quiz'
                        target='Designed to solve the real-world challenge of digitizing, distributing, and managing local educational curriculum across schools. Features an embedded PDF reader engine, interactive multimedia, online testing, and CMS moderation.'
                        feature={[
                            'Won First Prize in the 1st Youth Creative Contest of Hung Yen Province.',
                            'Embedded PDF textbook reader with support for interactive Video/Audio learning materials.',
                            'CMS / Admin Management: Strict role-based permissions, article moderation, and online quiz creation.'
                        ]}
                        status='Nov 2024 - Feb 2025'
                        role='Mobile Developer'
                        result={[
                            'Won FIRST PRIZE in the 1st Youth Creative Contest of Hung Yen Province.',
                            'Delivered a full-featured educational content management and access control system.'
                        ]}
                        imgUrl='/portfolio/images/gddp.png'
                        images={[
                            '/portfolio/images/gddp_anh_1.png',
                            '/portfolio/images/gddp_anh_2.png',
                            '/portfolio/images/gddp_anh_3.jpg',
                            '/portfolio/images/bang_khen_chu_tich_tinh.jpg',
                            '/portfolio/images/giay_chung_nhan_nhat_tinh.jpg'
                        ]}
                    />

                    {/* Project 4: T-Lighting */}
                    <Project
                        lang='en'
                        award='Published on Google Play Store & Apple App Store'
                        title='T-Lighting (Vehicle LED Control System)'
                        subtitle='Fullstack IoT Hardware & Software Product'
                        problem='Built an end-to-end IoT product connecting vehicle LED hardware to a mobile control application.'
                        solution='Programmed C++ microcontroller firmware communicating over wireless BLE protocol paired with a Flutter mobile app for real-time lighting control.'
                        technicalDepth='Cross-layer engineering spanning embedded C++ hardware, BLE protocol design, mobile application development, and dual app store deployment.'
                        outcome='Published on both Google Play Store and Apple App Store.'
                        langOrFramework={['Embedded C++', 'BLE', 'Flutter', 'Google Play', 'Apple App Store']}
                        pipeline='Embedded C++ Firmware → BLE Wireless Protocol → Flutter Mobile App → App Store / Play Store'
                        target='Demonstrates end-to-end hardware-software engineering capabilities: C++ microcontroller firmware BLE signals -> Real-time Flutter mobile app RGB control -> Dual App Store deployment.'
                        feature={[
                            'Embedded C++ Firmware: Microcontroller programming for hardware signals and BLE communication.',
                            'Flutter Mobile App: Intuitive real-time RGB color, brightness, and light mode controls.',
                            'Production Deployment: Published on both Google Play Store and Apple App Store.'
                        ]}
                        status='July 2025 - Present'
                        role='Fullstack IoT Developer (Hardware + Mobile App)'
                        result={[
                            'Delivered a complete and stable hardware-software communication pipeline.',
                            'Published on both Google Play and Apple App Store.'
                        ]}
                        imgUrl='/portfolio/images/t-lighting.png'
                        link={{
                            'Google Play Store': 'https://play.google.com/store/apps/details?id=com.ngocthai.tlighting&hl=vi',
                            'Apple App Store': 'https://apps.apple.com/app/t-lighting/id6749724474'
                        }}
                        images={Array.from({ length: 7 }, (_, i) => `/portfolio/images/tlighting/${i + 1}.jpg`)}
                    />
                </div>
            </section>

            {/* Low-Friction Contact Section */}
            <section id='contact' className="p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white space-y-6 shadow-2xl border border-indigo-500/20 text-center flex flex-col items-center">
                <span className="px-3.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold uppercase tracking-wider border border-indigo-500/30">
                    PROJECT DISCOVERY & ARCHITECTURE CONSULTING (LOW-FRICTION CONTACT)
                </span>
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight max-w-2xl leading-snug">
                    Have a technical challenge but unsure how to implement it?
                </h2>
                <p className="text-xs md:text-sm text-slate-300 max-w-xl leading-relaxed">
                    Send me your project requirements, current system concept, or prototype. I will help define the right technical architecture and execution roadmap before starting development.
                </p>
                <div className="flex flex-wrap justify-center gap-3 pt-2">
                    <a
                        href="mailto:hoansdz@gmail.com"
                        role="button"
                        className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs md:text-sm font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-indigo-500/30 flex items-center gap-2"
                    >
                        <span>Share Requirements & Let's Talk</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </a>
                    <a
                        href="https://github.com/hoansdz"
                        target="_blank"
                        rel="noopener noreferrer"
                        role="button"
                        className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs md:text-sm font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
                    >
                        <span>Explore Source Code on GitHub</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>
                </div>
            </section>
        </div>
    )
}

export default function Home() {
    const { lang, setLang } = useContext(LangContext);
    const [currentShowDetail, setCurrentShowDetail] = useState(null);

    return (
        <div className="w-full pb-10">
            {/* Language Toggle Button */}
            <div className="fixed bottom-4 right-4 z-[999]">
                <button
                    type="button"
                    onClick={() => {
                        setLang(lang === 'vi' ? 'en' : 'vi');
                        setCurrentShowDetail(null);
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 border border-slate-300 text-xs font-semibold text-slate-800 shadow-xl shadow-slate-300/50 backdrop-blur-md hover:border-indigo-500 hover:bg-white hover:scale-[1.05] active:scale-[0.98] transition-all duration-200"
                >
                    <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
                    <span>{lang === 'vi' ? 'VN / EN' : 'EN / VN'}</span>
                </button>
            </div>

            <DialogContext.Provider value={{ setCurrentShowDetail }}>
                {lang === 'vi' ? <HomeVI /> : <HomeEN />}

                {currentShowDetail && (
                    <DetailProject {...currentShowDetail} />
                )}
            </DialogContext.Provider>
        </div>
    )
}
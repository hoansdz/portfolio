import { useContext } from 'react'
import { LangContext } from '../App.jsx'

function BottomNavigator() {
    const { lang } = useContext(LangContext);
    const isEn = lang === 'en';

    return (
        <footer className="w-full border-t border-slate-200/80 bg-white/80 backdrop-blur-xl mt-16 py-12 px-4 shadow-sm">
            <section id='contact' className="max-w-4xl mx-auto flex flex-col items-center gap-5 text-center">
                <p className="text-sm font-semibold text-slate-700">
                    {isEn ? 'Contact for collaboration or discussion:' : 'Liên hệ làm việc hoặc trao đổi:'}
                </p>

                <div className="flex items-center justify-center gap-3">
                    {/* Facebook Button */}
                    <a 
                        href='https://www.facebook.com/ngoc.hoan.290402' 
                        rel='noopener noreferrer' 
                        target='_blank'
                        role="button"
                        aria-label="Facebook"
                        className="p-3 rounded-xl bg-white border border-slate-200/90 hover:border-indigo-400 hover:bg-indigo-50/40 transition-all duration-200 hover:scale-[1.05] active:scale-[0.98] shadow-sm flex items-center justify-center"
                    >
                        <svg className="w-5 h-5 text-[#1877F2] fill-current" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                    </a>

                    {/* Zalo Button */}
                    <a 
                        href='https://zalo.me/0362858590' 
                        rel='noopener noreferrer' 
                        target='_blank'
                        role="button"
                        aria-label="Zalo"
                        className="p-3 rounded-xl bg-white border border-slate-200/90 hover:border-indigo-400 hover:bg-indigo-50/40 transition-all duration-200 hover:scale-[1.05] active:scale-[0.98] shadow-sm flex items-center justify-center"
                    >
                        <span className="w-5 h-5 flex items-center justify-center font-black text-[6px] text-white bg-[#0068FF] rounded-md tracking-tighter">
                            Zalo
                        </span>
                    </a>

                    {/* GitHub Button */}
                    <a 
                        href='https://github.com/hoansdz' 
                        rel='noopener noreferrer' 
                        target='_blank'
                        role="button"
                        aria-label="GitHub"
                        className="p-3 rounded-xl bg-white border border-slate-200/90 hover:border-indigo-400 hover:bg-indigo-50/40 transition-all duration-200 hover:scale-[1.05] active:scale-[0.98] shadow-sm flex items-center justify-center"
                    >
                        <svg className="w-5 h-5 text-slate-800 fill-current" viewBox="0 0 24 24">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                        </svg>
                    </a>
                </div>

                <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-slate-600 mt-2">
                    <p>
                        Email: <a href="mailto:luonghoan.dev@gmail.com" className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors">
                            luonghoan.dev@gmail.com
                        </a>
                    </p>
                    <p>
                        {isEn ? 'Phone:' : 'Số điện thoại:'} <a href="tel:+84362858590" className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors">
                            +84 362858590
                        </a>
                    </p>
                </div>
            </section>
        </footer>
    )
}

export default BottomNavigator
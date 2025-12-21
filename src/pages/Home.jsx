import { Link } from "react-router-dom";

export default function Home() {
    return (
        <main className="home-page">
            {/* Hero Section - Önce geliyor */}
            <section className="hero">
                <div className="hero-content">
                    <h1 className="hero-logo">Teknolojik Yemekler</h1>
                    <p className="sub">fırsatı kaçırma</p>
                    <h2 className="title">KOD ACIKTIRIR</h2>
                    <h2 className="title">PIZZA, DOYURUR</h2>
                    <Link to="/order" className="btn-yellow">ACIKTIM</Link>
                </div>
            </section>

            {/* Header with Navigation */}
            <header className="header">
                <div className="nav-wrapper">
                    <ul className="nav" aria-label="Ana menü">
                        <li>
                            <Link to="/" className="nav-item">
                                <img src="/images/iteration-2-images/icons/1.svg" alt="" />
                                <span>YENİ! Kore</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/order" className="nav-item">
                                <img src="/images/iteration-2-images/icons/2.svg" alt="" />
                                <span>Pizza</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/" className="nav-item">
                                <img src="/images/iteration-2-images/icons/3.svg" alt="" />
                                <span>Burger</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/" className="nav-item">
                                <img src="/images/iteration-2-images/icons/4.svg" alt="" />
                                <span>Kızartmalar</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/" className="nav-item">
                                <img src="/images/iteration-2-images/icons/5.svg" alt="" />
                                <span>Fast Food</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/" className="nav-item">
                                <img src="/images/iteration-2-images/icons/6.svg" alt="" />
                                <span>Gazlı İçecek</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </header>

            {/* PROMO 3'LÜ */}
            <section className="promo">
                <div className="big-promo">
                    <img src="/images/iteration-2-images/cta/kart-1.png" className="promo-img" alt="Özel Lezzetus" />
                    <h3>Özel Lezzetus</h3>
                    <p>Position Absolute Acı Burger</p>
                    <Link to="/order" className="btn-white">SİPARİŞ VER</Link>
                </div>

                <div className="promo-col">
                    <div className="promo-box black">
                        <h3>Hackathlon Burger Menü</h3>
                        <Link to="/order" className="btn-white">SİPARİŞ VER</Link>
                        <img src="/images/iteration-2-images/cta/kart-2.png" className="promo-mid-img" alt="Hackathlon Burger" />
                    </div>

                    <div className="promo-box yellow">
                        <h3>Çoooook hızlı npm gibi kurye</h3>
                        <Link to="/order" className="btn-white">SİPARİŞ VER</Link>
                        <img src="/images/iteration-2-images/cta/kart-3.png" className="promo-mid-img" alt="Hızlı Kurye" />
                    </div>
                </div>
            </section>

            {/* ÜST BAŞLIK */}
            <section className="section-title">
                <p className="sub-title">en çok paketlenen menüler</p>
                <h2>Acıktıran Kodlara Doyuran Lezzetler</h2>
            </section>

            {/* Kategori Butonları */}
            <ul id="pills-tab">
                <li>
                    <button id="pills-ramen-tab">
                        <img src="/images/iteration-2-images/icons/1.svg" alt="" />
                        <span>Ramen</span>
                    </button>
                </li>
                <li>
                    <button id="pills-pizza-tab">
                        <img src="/images/iteration-2-images/icons/2.svg" alt="" />
                        <span>Pizza</span>
                    </button>
                </li>
                <li>
                    <button id="pills-burger-tab">
                        <img src="/images/iteration-2-images/icons/3.svg" alt="" />
                        <span>Burger</span>
                    </button>
                </li>
                <li>
                    <button id="pills-french-fry-tab">
                        <img src="/images/iteration-2-images/icons/4.svg" alt="" />
                        <span>Kızartmalar</span>
                    </button>
                </li>
                <li>
                    <button id="pills-fast-food-tab">
                        <img src="/images/iteration-2-images/icons/5.svg" alt="" />
                        <span>Fast food</span>
                    </button>
                </li>
                <li>
                    <button id="pills-drinks-tab">
                        <img src="/images/iteration-2-images/icons/6.svg" alt="" />
                        <span>Gazlı İçecek</span>
                    </button>
                </li>
            </ul>

            {/* ÜRÜN KARTLARI */}
            <section className="cards">
                <article className="card">
                    <img src="/images/iteration-2-images/pictures/food-1.png" className="card-img" alt="Terminal Pizza" />
                    <h3>Terminal Pizza</h3>
                    <div className="card-info">
                        <span className="rating">⭐ 4.9</span>
                        <span className="count">(200)</span>
                        <span className="price">60₺</span>
                    </div>
                </article>

                <article className="card">
                    <img src="/images/iteration-2-images/pictures/food-2.png" className="card-img" alt="Position Absolute Acı Pizza" />
                    <h3>Position Absolute Acı Pizza</h3>
                    <div className="card-info">
                        <span className="rating">⭐ 4.9</span>
                        <span className="count">(928)</span>
                        <span className="price">85₺</span>
                    </div>
                </article>

                <article className="card">
                    <img src="/images/iteration-2-images/pictures/food-3.png" className="card-img" alt="useEffect Tavuklu Burger" />
                    <h3>useEffect Tavuklu Burger</h3>
                    <div className="card-info">
                        <span className="rating">⭐ 4.9</span>
                        <span className="count">(462)</span>
                        <span className="price">75₺</span>
                    </div>
                </article>
            </section>

            {/* FOOTER */}
            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-info">
                        <h2 className="footer-logo">Teknolojik Yemekler</h2>
                        <ul>
                            <li>
                                <img src="/images/iteration-2-images/footer/icons/icon-1.png" alt="" />
                                <span>341 Londonderry Road, Istanbul Türkiye</span>
                            </li>
                            <li>
                                <img src="/images/iteration-2-images/footer/icons/icon-2.png" alt="" />
                                <span>aciktim@teknolojikyemekler.com</span>
                            </li>
                            <li>
                                <img src="/images/iteration-2-images/footer/icons/icon-3.png" alt="" />
                                <span>+90 216 123 45 67</span>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-menu">
                        <h4>Siccacık Menuler</h4>
                        <ul>
                            <li><Link to="/">Terminal Pizza</Link></li>
                            <li><Link to="/">5 Kişilik Hackathlon Pizza</Link></li>
                            <li><Link to="/">useEffect Tavuklu Pizza</Link></li>
                            <li><Link to="/">Beyaz Console Frosty</Link></li>
                            <li><Link to="/">Testler Geçti Mutlu Burger</Link></li>
                            <li><Link to="/">Position Absolute Acı Burger</Link></li>
                        </ul>
                    </div>
                    <div className="footer-instagram">
                        <h4>Instagram</h4>
                        <div className="insta-grid">
                            {[0, 1, 2, 3, 4, 5].map(num => (
                                <img 
                                    key={num}
                                    src={`/images/iteration-2-images/footer/insta/li-${num}.png`} 
                                    alt={`Instagram ${num}`} 
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    © 2023 Teknolojik Yemekler.
                </div>
            </footer>
        </main>
    );
}

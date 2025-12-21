import { Link } from "react-router-dom";

export default function Success({ orderData }) {
    const MALZEME_FIYATI = 5;
    const fallback = {
        isim: 'Misafir',
        boyut: 'M',
        hamur: 'İnce Kenar',
        malzemeler: ['Pepperoni', 'Sosis', 'Mısır', 'Jalepeno'],
        adet: 1,
        fiyat: 110.5
    };
    const data = { ...fallback, ...(orderData || {}) };
    const adet = data.adet || 1;
    const selectionsPrice = (data.malzemeler?.length || 0) * MALZEME_FIYATI * adet;
    const totalPrice = data.fiyat ?? (85.5 * adet + selectionsPrice);

    return (
        <main className="success-page">
            <div className="success-hero">
                <div className="success-logo">Teknolojik Yemekler</div>
                <p className="success-tag">lezzetin yolda</p>
                <h1 className="success-title">SİPARİŞ ALINDI</h1>
                <div className="success-divider" />
                <h2 className="success-pizza">{data.pizza || 'Position Absolute Acı Pizza'}</h2>
                <div className="success-details">
                    <p><strong>Boyut:</strong> {data.boyut || '—'}</p>
                    <p><strong>Hamur:</strong> {data.hamur || '—'}</p>
                    <p>
                        <strong>Ek Malzemeler:</strong>{' '}
                        {data.malzemeler && data.malzemeler.length > 0
                            ? data.malzemeler.join(', ')
                            : 'Seçilmedi'}
                    </p>
                    {data.özel && <p><strong>Not:</strong> {data.özel}</p>}
                </div>
                <div className="success-card">
                    <h3>Sipariş Toplamı</h3>
                    <div className="success-card-row">
                        <span>Seçimler</span>
                        <span>{selectionsPrice.toFixed(2)}₺</span>
                    </div>
                    <div className="success-card-row total">
                        <span>Toplam</span>
                        <span>{totalPrice.toFixed(2)}₺</span>
                    </div>
                </div>
            </div>

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

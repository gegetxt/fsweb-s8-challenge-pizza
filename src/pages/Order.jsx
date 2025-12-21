import { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';

export default function Order({ setOrderData }) {
    const history = useHistory();
    
    const [formData, setFormData] = useState({
        isim: 'Misafir',
        boyut: 'M',
        hamur: 'İnce Kenar',
        malzemeler: ['Pepperoni', 'Sosis', 'Mısır', 'Jalepeno'],
        ozel: ''
    });
    
    const [quantity, setQuantity] = useState(1);
    
    const [errors, setErrors] = useState({
        isim: '',
        boyut: '',
        hamur: '',
        malzemeler: ''
    });
    
    const [isFormValid, setIsFormValid] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');
    
    const BASE_PRICE = 85.50;
    const MALZEME_FIYATI = 5;
    const MAX_MALZEME = 10;
    const MIN_MALZEME = 4;
    
    const malzemelerListesi = [
        'Pepperoni',
        'Sosis',
        'Mısır',
        'Jalepeno',
        'Ananas',
        'Domates',
        'Biber',
        'Sucuk',
        'Kanada Jambonu',
        'Tavuk Izgara',
        'Soğan',
        'Sarımsak',
        'Kabak'
    ];
    
    const boyutlar = [
        { value: 'S', label: 'S' },
        { value: 'M', label: 'M' },
        { value: 'L', label: 'L' }
    ];
    
    const hamurSecenekleri = [
        'İnce Kenar',
        'Kalın Kenar',
        'Çıtır Kenar'
    ];
    
    useEffect(() => {
        validateForm();
    }, [formData]);
    
    const validateForm = () => {
        const newErrors = {};
        
        // İsim validasyonu (en az 3 karakter)
        if (formData.isim.length < 3 && formData.isim.length > 0) {
            newErrors.isim = 'İsim en az 3 karakter olmalıdır';
        } else if (formData.isim.length === 0) {
            newErrors.isim = 'İsim gereklidir';
        } else {
            newErrors.isim = '';
        }
        
        // Boyut validasyonu
        if (!formData.boyut) {
            newErrors.boyut = 'Boyut seçimi gereklidir';
        } else {
            newErrors.boyut = '';
        }
        
        // Hamur validasyonu
        if (!formData.hamur) {
            newErrors.hamur = 'Hamur seçimi gereklidir';
        } else {
            newErrors.hamur = '';
        }
        
        // Malzemeler validasyonu (en az 4, en fazla 10)
        if (formData.malzemeler.length < MIN_MALZEME) {
            newErrors.malzemeler = `En az ${MIN_MALZEME} malzeme seçmelisiniz`;
        } else if (formData.malzemeler.length > MAX_MALZEME) {
            newErrors.malzemeler = `En fazla ${MAX_MALZEME} malzeme seçebilirsiniz`;
        } else {
            newErrors.malzemeler = '';
        }
        
        setErrors(newErrors);
        
        // Form validasyonu
        const isValid = 
            formData.isim.length >= 3 &&
            formData.boyut !== '' &&
            formData.hamur !== '' &&
            formData.malzemeler.length >= MIN_MALZEME &&
            formData.malzemeler.length <= MAX_MALZEME;
        
        setIsFormValid(isValid);
    };
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    
    const handleMalzemeChange = (malzeme) => {
        setFormData(prev => {
            const newMalzemeler = prev.malzemeler.includes(malzeme)
                ? prev.malzemeler.filter(m => m !== malzeme)
                : [...prev.malzemeler, malzeme];
            
            return {
                ...prev,
                malzemeler: newMalzemeler
            };
        });
    };
    
    const handleQuantityChange = (delta) => {
        setQuantity(prev => Math.max(1, prev + delta));
    };
    
    const calculateSelectionsPrice = () => {
        return formData.malzemeler.length * MALZEME_FIYATI;
    };
    
    const calculateTotalPrice = () => {
        const selectionsPrice = calculateSelectionsPrice();
        return (BASE_PRICE + selectionsPrice) * quantity;
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!isFormValid) {
            return;
        }
        
        setIsSubmitting(true);
        setSubmitError('');
        
        try {
            const payload = {
                isim: formData.isim,
                boyut: formData.boyut,
                hamur: formData.hamur,
                malzemeler: formData.malzemeler,
                özel: formData.ozel || '',
                adet: quantity,
                fiyat: calculateTotalPrice()
            };
            
            const response = await axios.post('https://reqres.in/api/pizza', payload, {
                headers: {
                    'x-api-key': 'reqres-free-v1'
                },
                timeout: 10000
            });
            
            const responseData = response.data.data || response.data;
            console.log('Sipariş Özeti:', responseData);
            
            if (setOrderData) {
                setOrderData(responseData);
            }
            
            history.push('/success');
        } catch (error) {
            console.error('Sipariş gönderilirken hata oluştu:', error);
            
            if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
                setSubmitError('İstek zaman aşımına uğradı. Lütfen tekrar deneyin.');
            } else if (error.response) {
                setSubmitError(`Sunucu hatası: ${error.response.status}. Lütfen tekrar deneyin.`);
            } else if (error.request) {
                setSubmitError('İnternet bağlantısı yok veya sunucuya ulaşılamıyor. Lütfen bağlantınızı kontrol edin.');
            } else {
                setSubmitError('Bir hata oluştu. Lütfen tekrar deneyin.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };
    
    return (
        <main className="order-page">
            {/* Header Banner */}
            <div className="order-header-banner">
                <h1>Teknolojik Yemekler</h1>
            </div>
            
            {/* Pizza Display */}
            <div className="pizza-display-section">
                <img src="/images/iteration-2-images/pictures/form-banner.png" alt="Position Absolute Acı Pizza" className="pizza-display-image" />
                <div className="pizza-info">
                    {/* Breadcrumbs */}
                    <div className="breadcrumbs">
                        <Link to="/">Anasayfa</Link>
                        <span> - </span>
                        <span className="breadcrumb-active">Sipariş Oluştur</span>
                    </div>
                    <h2 className="pizza-title">Position Absolute Acı Pizza</h2>
                    <div className="pizza-price-rating">
                        <span className="pizza-price">85.50₺</span>
                        <span className="pizza-rating">⭐ 4.9 (200)</span>
                    </div>
                    <p className="pizza-description">
                        Frontend Dev olarak hala position:absolute ile müsaitlik arıyorsan bu tam sana göre bir pizza! Teknolojinin baş döndürücü hızına ayak uydurabilmek için yarattığımız bu pizza, yemekten çok bir deneyim. Position Absolute Acı Pizza'nın hikayesi, bizim Frontend'de yaşadığımız zorlukların bir yansımasıdır. Özenle seçilmiş malzemelerimiz ve geleneksel pişirme yöntemimizle hazırladığımız bu pizza, Frontend Dev'lerin gönlünde taht kurmuştur.
                    </p>
                </div>
            </div>
            
            <div className="order-page-wrapper">
                {submitError && (
                    <div className="error-banner" role="alert">
                        <strong>Hata:</strong> {submitError}
                    </div>
                )}
                
                <div className="order-form-layout">
                    <section className="order-form-container">
                        <form onSubmit={handleSubmit} className="order-form" noValidate>
                            {/* Boyut ve Hamur Seçimi - Yan Yana */}
                            <div className="form-row">
                                <fieldset className="form-group form-group-half">
                                    <legend>Boyut Seç *</legend>
                                    <div className="radio-group size-radio-group">
                                        {boyutlar.map(boyut => (
                                            <div key={boyut.value} className="radio-option">
                                                <input
                                                    type="radio"
                                                    id={`boyut-${boyut.value}`}
                                                    name="boyut"
                                                    value={boyut.value}
                                                    checked={formData.boyut === boyut.value}
                                                    onChange={handleInputChange}
                                                    aria-label={`${boyut.label} boyut`}
                                                />
                                                <label htmlFor={`boyut-${boyut.value}`}>{boyut.label}</label>
                                            </div>
                                        ))}
                                    </div>
                                    {errors.boyut && <span className="error-message" role="alert">{errors.boyut}</span>}
                                </fieldset>
                                
                                <div className="form-group form-group-half">
                                    <label htmlFor="hamur">Hamur Seç *</label>
                                    <select
                                        id="hamur"
                                        name="hamur"
                                        value={formData.hamur}
                                        onChange={handleInputChange}
                                        aria-label="Hamur kalınlığı seç"
                                    >
                                        <option value="">-Hamur Kalınlığı Seç-</option>
                                        {hamurSecenekleri.map(hamur => (
                                            <option key={hamur} value={hamur}>{hamur}</option>
                                        ))}
                                    </select>
                                    {errors.hamur && <span className="error-message" role="alert">{errors.hamur}</span>}
                                </div>
                            </div>
                            
                            {/* Malzemeler */}
                            <fieldset className="form-group">
                                <legend>Ek Malzemeler</legend>
                                <p className="form-subtitle">En Fazla {MAX_MALZEME} malzeme seçebilirsiniz. {MALZEME_FIYATI}₺</p>
                                <div className="checkbox-group">
                                    {malzemelerListesi.map(malzeme => (
                                        <div key={malzeme} className="checkbox-option">
                                            <input
                                                type="checkbox"
                                                id={`malzeme-${malzeme}`}
                                                checked={formData.malzemeler.includes(malzeme)}
                                                onChange={() => handleMalzemeChange(malzeme)}
                                                disabled={!formData.malzemeler.includes(malzeme) && formData.malzemeler.length >= MAX_MALZEME}
                                                aria-label={`${malzeme} seçimi`}
                                            />
                                            <label htmlFor={`malzeme-${malzeme}`}><span>{malzeme}</span></label>
                                        </div>
                                    ))}
                                </div>
                                {errors.malzemeler && <span className="error-message" role="alert">{errors.malzemeler}</span>}
                                <div className="malzeme-count">
                                    Seçilen: {formData.malzemeler.length} / {MAX_MALZEME}
                                </div>
                            </fieldset>
                            
                            {/* Notlar */}
                            <div className="form-group">
                                <label htmlFor="ozel">Sipariş Notu</label>
                                <textarea
                                    id="ozel"
                                    name="ozel"
                                    value={formData.ozel}
                                    onChange={handleInputChange}
                                    rows="4"
                                    placeholder="Siparişine eklemek istediğin bir not var mı?"
                                    aria-label="Sipariş Notu"
                                />
                            </div>
                            
                            <div className="note-divider" aria-hidden="true"></div>
                            
                        </form>
                    </section>
                    
                    {/* Sipariş Özeti Sidebar */}
                    <aside className="order-summary-sidebar">
                        <div className="order-summary-card">
                            <h3>Sipariş Toplamı</h3>
                            <div className="summary-price-breakdown">
                                <div className="price-row">
                                    <span>Seçimler</span>
                                    <span>{calculateSelectionsPrice().toFixed(2)}₺</span>
                                </div>
                                <div className="price-row total">
                                    <span>Toplam</span>
                                    <span>{calculateTotalPrice().toFixed(2)}₺</span>
                                </div>
                            </div>
                        </div>

                        <div className="order-actions-row">
                            <div className="quantity-selector">
                                <button type="button" onClick={() => handleQuantityChange(-1)} className="quantity-btn">-</button>
                                <span className="quantity-value">{quantity}</span>
                                <button type="button" onClick={() => handleQuantityChange(1)} className="quantity-btn">+</button>
                            </div>

                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={!isFormValid || isSubmitting}
                                className="order-submit-button"
                                aria-label="Sipariş Ver"
                            >
                                {isSubmitting ? 'Gönderiliyor...' : 'SİPARİŞ VER'}
                            </button>
                        </div>
                    </aside>
                </div>
            </div>
            
            {/* Footer */}
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

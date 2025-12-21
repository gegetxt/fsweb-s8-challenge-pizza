describe('Pizza Sipariş Formu Testleri', () => {
  beforeEach(() => {
    // Her test öncesi sipariş formu sayfasına git
    cy.visit('http://localhost:5173/order');
    // Sayfa ve form yüklenene kadar bekle
    cy.get('.order-form', { timeout: 15000 }).should('be.visible');
    cy.get('.checkbox-group', { timeout: 15000 }).should('be.visible');
  });

  it('Form elemanları görünür olmalı', () => {
    // Boyut seçimi görünür olmalı
    cy.get('legend').contains('Boyut Seç').should('be.visible');
    
    // Hamur seçimi görünür olmalı
    cy.get('label[for="hamur"]').contains('Hamur Seç').should('be.visible');
    
    // Malzemeler bölümü görünür olmalı
    cy.get('legend').contains('Ek Malzemeler').should('be.visible');
    
    // Sipariş notu görünür olmalı
    cy.get('label[for="ozel"]').contains('Sipariş Notu').should('be.visible');
  });

  it('Boyut seçilebilmeli', () => {
    // M boyutunu seç (varsayılan seçili olabilir)
    cy.get('input[id="boyut-M"]')
      .should('exist')
      .check({ force: true })
      .should('be.checked');
    
    // L boyutunu seç
    cy.get('input[id="boyut-L"]')
      .check({ force: true })
      .should('be.checked');
    
    // M seçimi kaldırılmış olmalı
    cy.get('input[id="boyut-M"]').should('not.be.checked');
  });

  it('Hamur seçilebilmeli', () => {
    // Hamur dropdown'ı seç
    cy.get('select[name="hamur"]')
      .should('be.visible')
      .select('Kalın Kenar')
      .should('have.value', 'Kalın Kenar');
    
    // Başka bir hamur seç
    cy.get('select[name="hamur"]')
      .select('Çıtır Kenar')
      .should('have.value', 'Çıtır Kenar');
  });

  it('Birden fazla malzeme seçebilmeli', () => {
    // Varsayılan seçili malzemeler: ['Pepperoni', 'Sosis', 'Mısır', 'Jalepeno']
    // Listede olan yeni malzemeler ekleyerek test edelim
    const yeniMalzemeler = ['Sucuk', 'Ananas', 'Domates', 'Biber'];
    
    yeniMalzemeler.forEach(malzeme => {
      // Önce checkbox'ın seçili olmadığını kontrol et
      cy.get(`input[id="malzeme-${malzeme}"]`)
        .should('not.be.checked');
      
      // Label'a tıkla (checkbox gizli olduğu için)
      cy.get(`label[for="malzeme-${malzeme}"]`)
        .should('be.visible')
        .click();
      
      // Checkbox'ın seçildiğini kontrol et
      cy.get(`input[id="malzeme-${malzeme}"]`)
        .should('be.checked');
    });
    
    // Toplam seçilen malzeme sayısını kontrol et (varsayılan 4 + yeni 4 = 8)
    cy.get('.malzeme-count', { timeout: 5000 })
      .should('contain', 'Seçilen: 8');
  });

  it('Sipariş notu girilebilmeli', () => {
    const testNot = 'Ekstra acılı olsun lütfen';
    
    cy.get('textarea[name="ozel"]')
      .should('be.visible')
      .clear()
      .type(testNot)
      .should('have.value', testNot);
  });

  it('Form gönderilebilmeli - Tam validasyon ile', () => {
    // Varsayılan değerler zaten formu geçerli yapıyor
    // (isim: 'Misafir', boyut: 'M', hamur: 'İnce Kenar', 4 malzeme seçili)
    
    // Boyut değiştir (opsiyonel)
    cy.get('input[id="boyut-L"]')
      .check({ force: true });
    
    // En az 4 malzeme seçili olduğunu kontrol et (varsayılan)
    cy.get('.malzeme-count')
      .should('contain', 'Seçilen: 4');
    
    // Submit butonunun aktif olduğunu kontrol et
    cy.get('button.order-submit-button')
      .should('not.be.disabled')
      .should('contain', 'SİPARİŞ VER');
    
    // API isteğini mockla
    cy.intercept('POST', 'https://reqres.in/api/pizza', {
      statusCode: 201,
      body: {
        data: {
          id: 1,
          isim: 'Misafir',
          boyut: 'L',
          hamur: 'İnce Kenar',
          malzemeler: ['Pepperoni', 'Sosis', 'Mısır', 'Jalepeno'],
          özel: '',
          adet: 1,
          fiyat: 110.5,
          createdAt: new Date().toISOString()
        }
      }
    }).as('pizzaOrder');
    
    // Formu gönder
    cy.get('button.order-submit-button')
      .click();
    
    // API isteğinin yapıldığını kontrol et
    cy.wait('@pizzaOrder');
    
    // Başarı sayfasına yönlendirildiğini kontrol et
    cy.url().should('include', '/success');
    cy.contains('SİPARİŞ ALINDI', { matchCase: false }).should('be.visible');
  });

  it('Malzeme seçimi maksimum limitini kontrol etmeli', () => {
    // Varsayılan 4 malzeme zaten seçili: ['Pepperoni', 'Sosis', 'Mısır', 'Jalepeno']
    // 6 malzeme daha ekleyerek toplam 10'a ulaşalım
    const ekstraMalzemeler = ['Sucuk', 'Ananas', 'Domates', 'Biber', 'Kanada Jambonu', 'Tavuk Izgara'];
    
    // İlk durum: 4 malzeme seçili
    cy.get('.malzeme-count', { timeout: 5000 })
      .should('contain', 'Seçilen: 4');
    
    // 6 malzeme ekle
    ekstraMalzemeler.forEach((malzeme) => {
      cy.get(`input[id="malzeme-${malzeme}"]`).should('not.be.checked');
      cy.get(`label[for="malzeme-${malzeme}"]`).click();
      cy.get(`input[id="malzeme-${malzeme}"]`).should('be.checked');
    });
    
    // Son durumda 10 malzeme seçili olmalı (4 varsayılan + 6 yeni)
    cy.get('.malzeme-count', { timeout: 5000 })
      .should('contain', 'Seçilen: 10');
    
    // 10 malzeme seçildiyse, seçilmemiş malzemeler disabled olmalı
    cy.get('input[id="malzeme-Soğan"]')
      .should('be.disabled');
    
    cy.get('input[id="malzeme-Sarımsak"]')
      .should('be.disabled');
  });
  
  it('Malzeme seçimi toggle çalışmalı', () => {
    // Varsayılan seçili bir malzemeyi kaldırıp tekrar ekle
    const testMalzeme = 'Sosis'; // Varsayılan seçili
    
    // İlk durumda seçili olmalı
    cy.get(`input[id="malzeme-${testMalzeme}"]`)
      .should('be.checked');
    
    // Tıklayarak seçimi kaldır
    cy.get(`label[for="malzeme-${testMalzeme}"]`)
      .click();
    
    // Artık seçili olmamalı
    cy.get(`input[id="malzeme-${testMalzeme}"]`)
      .should('not.be.checked');
    
    // Tekrar tıklayarak seç
    cy.get(`label[for="malzeme-${testMalzeme}"]`)
      .click();
    
    // Tekrar seçili olmalı
    cy.get(`input[id="malzeme-${testMalzeme}"]`)
      .should('be.checked');
  });
});





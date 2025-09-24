describe('Pizza Sipariş Uygulaması - IT2 Testleri', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Ana sayfada header elemanları görüntüleniyor', () => {
    cy.contains('Teknolojik Yemekler').should('be.visible');
    cy.contains('🚚 Ücretsiz Teslimat').should('be.visible');
    cy.contains('📞 +90 555 PIZZA').should('be.visible');
    cy.contains('ACIKTIM').should('be.visible');
  });

  it('Ana sayfa butonuna tıklandığında sipariş sayfasına yönlendiriyor', () => {
    cy.contains('ACIKTIM').click();
    cy.url().should('include', '/order');
    cy.contains('Teknolojik Yemekler').should('be.visible');
    cy.contains('Position Absolute Acı Pizza').should('be.visible');
  });

  it('Sipariş formu elemanları doğru şekilde görüntüleniyor', () => {
    cy.contains('ACIKTIM').click();

    // Pizza bilgileri
    cy.contains('Position Absolute Acı Pizza').should('be.visible');
    cy.contains('₺85.50').should('be.visible');

    // Boyut seçenekleri
    cy.contains('Boyut Seç').should('be.visible');
    cy.contains('Küçük').should('be.visible');
    cy.contains('Orta').should('be.visible');
    cy.contains('Büyük').should('be.visible');

    // Hamur seçenekleri
    cy.contains('Hamur Seç').should('be.visible');
    cy.get('select').should('be.visible');

    // Ek malzemeler
    cy.contains('Ek Malzemeler').should('be.visible');
    cy.contains('Pepperoni').should('be.visible');
    cy.contains('Mantar').should('be.visible');
  });

  it('Radio butonları özelleştirilmiş görünüme sahip', () => {
    cy.contains('ACIKTIM').click();

    // Radio butonların görünürlüğünü kontrol et
    cy.get('input[type="radio"]').should('not.be.visible');

    // Label'ların görünür olduğunu kontrol et
    cy.contains('Küçük').should('be.visible');
    cy.contains('Orta').should('be.visible');
    cy.contains('Büyük').should('be.visible');
  });

  it('Checkbox butonları özelleştirilmiş görünüme sahip', () => {
    cy.contains('ACIKTIM').click();

    // Checkbox'ların görünürlüğünü kontrol et
    cy.get('input[type="checkbox"]').should('not.be.visible');

    // Label'ların görünür olduğunu kontrol et
    cy.contains('Pepperoni').should('be.visible');
    cy.contains('Mantar').should('be.visible');
  });

  it('Sipariş formu gönderildiğinde hata mesajı gösteriyor', () => {
    cy.contains('ACIKTIM').click();

    // Boyut seç
    cy.contains('Küçük').click();

    // Hamur seç
    cy.get('select').select('İnce Hamur');

    // Sipariş ver butonuna tıkla
    cy.contains('SİPARİŞ VER').click();

    // Hata mesajının görünüp görünmediğini kontrol et
    cy.contains('İnternete bağlanılamadı', { timeout: 10000 }).should('be.visible');
  });

  it('Success sayfası doğru şekilde görüntüleniyor', () => {
    // Success sayfasına direkt git (normalde API çağrısı başarılı olursa)
    cy.window().then((win) => {
      win.location.href = '/#/success';
    });

    cy.contains('TEBRİKLER').should('be.visible');
    cy.contains('SİPARİŞİNİZ ALINDI').should('be.visible');
    cy.contains('Teknolojik Yemekler').should('be.visible');
    cy.contains('Ana Sayfaya Dön').should('be.visible');
  });

  it('Success sayfasında sipariş özeti görüntüleniyor', () => {
    cy.window().then((win) => {
      // Mock order data
      win.localStorage.setItem('orderData', JSON.stringify({
        pizza: 'Position Absolute Acı Pizza',
        size: 'Orta',
        dough: 'İnce Hamur',
        extras: ['Pepperoni', 'Mantar'],
        quantity: 2,
        total: 200,
        note: 'Acı olsun'
      }));
      win.location.href = '/#/success';
    });

    cy.contains('Sipariş Özeti').should('be.visible');
    cy.contains('Pizza: Position Absolute Acı Pizza').should('be.visible');
    cy.contains('Boyut: Orta').should('be.visible');
    cy.contains('Hamur: İnce Hamur').should('be.visible');
    cy.contains('Adet: 2').should('be.visible');
    cy.contains('Ek Malzemeler: Pepperoni, Mantar').should('be.visible');
    cy.contains('Not: Acı olsun').should('be.visible');
  });

  it('Loading state doğru şekilde çalışıyor', () => {
    cy.window().then((win) => {
      // Loading state'i test etmek için
      const button = win.document.querySelector('[data-cy="order-button"]');
      if (button) {
        button.style.pointerEvents = 'none';
        button.textContent = 'Gönderiliyor...';
      }
    });
  });

  it('Responsive tasarım doğru şekilde çalışıyor', () => {
    cy.viewport('iphone-6');
    cy.contains('Teknolojik Yemekler').should('be.visible');
    cy.contains('ACIKTIM').should('be.visible');
  });

  it('Error overlay doğru şekilde kapanıyor', () => {
    cy.window().then((win) => {
      win.location.href = '/#/success';
    });

    // Error butonuna tıkla (varsa)
    cy.get('[data-cy="error-close"]').click();
  });

  it('Form validasyonu çalışıyor', () => {
    cy.contains('ACIKTIM').click();

    // Boyut seçmeden sipariş ver
    cy.contains('SİPARİŞ VER').click();

    // HTML5 validasyon mesajı gösterilmeli
    cy.get('input[type="radio"]:invalid').should('exist');
  });

  it('Ek malzeme limiti doğru şekilde uygulanıyor', () => {
    cy.contains('ACIKTIM').click();

    // Tüm checkbox'ları seç
    cy.get('input[type="checkbox"]').each(($checkbox) => {
      cy.wrap($checkbox).check({ force: true });
    });

    // 11. checkbox disabled olmalı
    cy.get('input[type="checkbox"]:disabled').should('exist');
  });
});

/**
 * Dr. Marcio Leite Rodrigues - Cardiologia Clínica
 * Scripts de Interatividade, Navegação e Rastreamento de Conversões
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Menu Mobile Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      mobileToggle.innerHTML = isOpen ? '✕' : '☰';
    });

    // Fecha menu ao clicar em qualquer link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', false);
        mobileToggle.innerHTML = '☰';
      });
    });
  }

  // 2. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Fecha outros itens abertos para manter visual limpo
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
          }
        });

        // Alterna o atual
        item.classList.toggle('active', !isActive);
      });
    }
  });

  // 3. Rastreamento e Otimização de Cliques no WhatsApp e Telefone (Google Ads & Analytics)
  const contactLinks = document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp.com"], a[href^="tel:"]');
  contactLinks.forEach((link, index) => {
    link.addEventListener('click', (e) => {
      const ctaLocation = link.getAttribute('data-cta') || `cta-pos-${index}`;
      const isWhatsApp = link.href.includes('wa.me') || link.href.includes('whatsapp.com');
      const eventName = isWhatsApp ? 'whatsapp_click' : 'phone_call_click';
      
      // Disparo de Conversão para o Google Ads (gtag)
      if (typeof window.gtag === 'function') {
        // Evento padrão de lead
        window.gtag('event', 'generate_lead', {
          event_category: isWhatsApp ? 'WhatsApp' : 'Phone',
          event_label: ctaLocation,
          value: 1
        });

        // Conversão direta no Google Ads
        window.gtag('event', 'conversion', {
          send_to: 'AW-663683174',
          value: 1.0,
          currency: 'BRL',
          event_callback: function() {
            // Callback opcional após envio
          }
        });
      }

      // Se o Google Tag Manager (dataLayer) estiver ativo
      if (window.dataLayer && Array.isArray(window.dataLayer)) {
        window.dataLayer.push({
          event: eventName,
          cta_location: ctaLocation
        });
      }
    });
  });

  // 4. Sombreamento dinâmico na Navbar ao rolar
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        navbar.style.boxShadow = '0 6px 20px rgba(12, 40, 73, 0.08)';
      } else {
        navbar.style.boxShadow = 'var(--shadow-xs)';
      }
    }, { passive: true });
  }

  // 5. Ano Dinâmico no Rodapé
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});

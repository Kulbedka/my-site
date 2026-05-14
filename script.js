document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = [
    document.querySelector('.avatar'),
    document.querySelector('.eyebrow'),
    document.querySelector('h1'),
    document.querySelector('.subtitle'),
    ...document.querySelectorAll('.link-button'),
    document.querySelector('.extra-links'),
    document.querySelector('.socials')
  ].filter(Boolean);

  animatedElements.forEach((element, index) => {
    element.classList.add('fade-in');

    window.setTimeout(() => {
      element.classList.add('visible');
    }, index * 100);
  });

  const portfolioBtn = document.getElementById('portfolio-btn');
  const portfolioGrid = document.getElementById('portfolio-grid');

  if (portfolioBtn && portfolioGrid) {
    const setPortfolioHeight = () => {
      if (!portfolioGrid.classList.contains('active')) {
        portfolioGrid.style.setProperty('--portfolio-height', '0px');
        return;
      }

      portfolioGrid.style.setProperty('--portfolio-height', `${portfolioGrid.scrollHeight}px`);
    };

    portfolioBtn.addEventListener('click', (event) => {
      event.preventDefault();

      const isActive = portfolioGrid.classList.toggle('active');
      portfolioBtn.setAttribute('aria-expanded', String(isActive));
      portfolioGrid.setAttribute('aria-hidden', String(!isActive));
      setPortfolioHeight();

      window.setTimeout(() => {
        if (isActive) {
          portfolioGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }

        const card = document.querySelector('.card');

        if (card) {
          card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 120);
    });

    window.addEventListener('resize', setPortfolioHeight);
  }

  const shareBtn = document.getElementById('share-btn');
  const toast = document.getElementById('toast');
  let toastTimer;

  const showToast = (message, isError = false) => {
    if (!toast) {
      return;
    }

    toast.textContent = message;
    toast.classList.toggle('error', isError);
    toast.classList.add('visible');

    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      toast.classList.remove('visible');
    }, 2200);
  };

  const copyCurrentUrl = async () => {
    const url = window.location.href;

    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(url);
        return true;
      } catch {
        // Fallback ниже нужен для file:// и старых браузеров.
      }
    }

    const textArea = document.createElement('textarea');
    textArea.value = url;
    textArea.setAttribute('readonly', '');
    textArea.style.position = 'fixed';
    textArea.style.top = '-999px';
    document.body.append(textArea);
    textArea.select();

    try {
      return document.execCommand('copy');
    } catch {
      return false;
    } finally {
      textArea.remove();
    }
  };

  if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
      const isCopied = await copyCurrentUrl();

      showToast(
        isCopied ? 'Ссылка скопирована!' : 'Не удалось скопировать ссылку',
        !isCopied
      );
    });
  }
});

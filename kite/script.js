  // Scrollspy: tự tô highlight mục đang xem trên sidebar
  (function () {
    const links = Array.prototype.slice.call(document.querySelectorAll('.sidebar a.nav-item'));
    const sections = links
      .map(function (a) {
        var id = a.getAttribute('href').slice(1);
        return { link: a, el: document.getElementById(id) };
      })
      .filter(function (s) { return s.el; });

    function update() {
      var pos = window.scrollY + 100; // bù đầu trang để highlight chuẩn
      var current = sections[0];
      for (var i = 0; i < sections.length; i++) {
        if (sections[i].el.offsetTop <= pos) current = sections[i];
        else break;
      }
      sections.forEach(function (s) { s.link.classList.remove('active'); });
      if (current) current.link.classList.add('active');
    }

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('load', update);
    update();
  })();

  // Nút Lên đầu trang
  (function () {
    var btn = document.getElementById('backTop');
    function toggle() { btn.classList.toggle('show', window.scrollY > 400); }
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    window.addEventListener('scroll', toggle, { passive: true });
    toggle();
  })();

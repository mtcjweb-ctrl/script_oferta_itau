HTML
<script>
(function () {

  // =====================================================
  // CONFIGURACIÓN DEL BANNER
  // =====================================================

  var id_bannerCCIT1 = 594258;
  var cookieNameCCIT1 = "_mkt_CCIT1_jun26";
  var cookieNoShowCCIT1 = "_mkt_CCIT1_no_show";

  var commerceInfo;

  try {
    commerceInfo = JSON.parse(
      sessionStorage.getItem("commerce_info") || "null"
    );
  } catch (error) {
    console.error("Error al leer commerce_info:", error);
    commerceInfo = null;
  }

  if (!commerceInfo) {
    console.warn("No se encontró commerce_info en sessionStorage");
    return;
  }

  // =====================================================
  // REGIONES DE CHILE
  // =====================================================

  var regionesChile = {
    "I REGION": 1,
    "II REGION": 2,
    "III REGION": 3,
    "IV REGION": 4,
    "V REGION": 5,
    "VI REGION": 6,
    "VII REGION": 7,
    "VIII REGION": 8,
    "IX REGION": 9,
    "X REGION": 10,
    "XI REGION": 11,
    "XII REGION": 12,
    "METROPOLITANA": 13,
    "XIV REGION": 14,
    "XV REGION": 15,
    "ÑUBLE": 16
  };

  var regionTexto = commerceInfo.region
    ? commerceInfo.region.trim().toUpperCase()
    : "";

  var regionNumero = regionesChile[regionTexto];

  // =====================================================
  // FECHA LÍMITE DEL BANNER
  // =====================================================

  var dteLimitCCIT1 = new Date();
  var days = 2;

  dteLimitCCIT1.setTime(
    dteLimitCCIT1.getTime() +
    days * 24 * 60 * 60 * 1000
  );

  var today = new Date();

  // =====================================================
  // VALIDACIÓN DE RUT
  // =====================================================

  var ruts_banner_CCIT1 = [
    "15250908-1",
    "15691092-9"
  ];

  var rut_comercio = sessionStorage.getItem("rut");

  if (
    typeof window.rut_comercio !== "undefined" &&
    window.rut_comercio
  ) {
    rut_comercio = window.rut_comercio;
  }

  var rtcoCCIT1 = rut_comercio;

  // =====================================================
  // CONTROL DE VISUALIZACIÓN DEL BANNER
  // =====================================================

  function obtenerCookie(nombre) {
    var prefijo = nombre + "=";

    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();

      if (cookie.indexOf(prefijo) === 0) {
        return decodeURIComponent(
          cookie.substring(prefijo.length)
        );
      }
    }

    return null;
  }

  function guardarCookie(nombre, valor, fecha) {
    document.cookie =
      nombre + "=" + encodeURIComponent(valor) +
      "; expires=" + fecha.toUTCString() +
      "; path=/; SameSite=Lax";
  }

  if (
    today <= dteLimitCCIT1 &&
    rtcoCCIT1 &&
    ruts_banner_CCIT1.includes(rtcoCCIT1)
  ) {

    if (obtenerCookie(cookieNoShowCCIT1) !== "1") {

      var rutCookieCCIT1 = obtenerCookie(cookieNameCCIT1);

      if (rutCookieCCIT1 !== rtcoCCIT1) {

        if (typeof gsc === "function") {

          gsc("params", {
            commerce_rut: commerceInfo.commerce_rut,
            fantasy_name: commerceInfo.fantasy_name,
            first_name: commerceInfo.first_name,
            last_name: commerceInfo.last_name,
            email: commerceInfo.email,
            cellphone: commerceInfo.cellphone,
            region: regionNumero,
            rut_ejecutivo: "5-1",
            nombre_ejecutivo: "Portal Comercio",
            email_ejecutivo: "sinemail@klap.cl",
            district: commerceInfo.district,
            district_code: commerceInfo.district_code
          });

          gsc("show", id_bannerCCIT1);

        } else {
          console.error("La función gsc no está disponible");
        }
      }
    }
  }

  // =====================================================
  // EVENTO AL ABRIR UNA URL DEL WIDGET
  // =====================================================

  if (typeof gsc === "function") {
    gsc("onOpenUrl", function (widgetId, data) {

      if (widgetId === id_bannerCCIT1) {

        if (rtcoCCIT1) {
          guardarCookie(
            cookieNameCCIT1,
            rtcoCCIT1,
            dteLimitCCIT1
          );
        }

        gsc("close", id_bannerCCIT1);
      }
    });
  }

  // =====================================================
  // CAPTURA DEL BOTÓN "NO QUIERO EL PLAN"
  // =====================================================

  var listenerInstaladoCCIT1 = false;
  var observerNoShowCCIT1 = null;

  function configurarListenerNoShowCCIT1() {

    if (listenerInstaladoCCIT1) {
      return true;
    }

    var widget = document.querySelector(
      "getsitecontrol-widget#getsitecontrol-" +
      id_bannerCCIT1
    );

    if (!widget || !widget.shadowRoot) {
      return false;
    }

    var shadow = widget.shadowRoot;

    shadow.addEventListener("click", function (event) {

      var elemento = event.target;

      if (!elemento || typeof elemento.closest !== "function") {
        return;
      }

      var boton = elemento.closest("button.noshow");

      if (!boton) {
        return;
      }

      console.log(
        "Click detectado en No quiero el plan"
      );

      var fechaNoShow = new Date();
      fechaNoShow.setDate(
        fechaNoShow.getDate() + 3000
      );

      guardarCookie(
        cookieNoShowCCIT1,
        "1",
        fechaNoShow
      );

      console.log(
        "Cookie No Show:",
        obtenerCookie(cookieNoShowCCIT1)
      );

    }, true);

    listenerInstaladoCCIT1 = true;

    console.log(
      "Listener No Show instalado correctamente"
    );

    return true;
  }

  // Intentar instalar el listener inmediatamente.
  if (!configurarListenerNoShowCCIT1()) {

    // Si el widget todavía no existe, observar el DOM.
    observerNoShowCCIT1 = new MutationObserver(function () {

      if (configurarListenerNoShowCCIT1()) {
        observerNoShowCCIT1.disconnect();
        observerNoShowCCIT1 = null;
      }

    });

    observerNoShowCCIT1.observe(
      document.documentElement,
      {
        childList: true,
        subtree: true
      }
    );
  }

})();
</script>

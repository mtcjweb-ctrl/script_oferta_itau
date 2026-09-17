<script>
  
  // Variable para el ID del banner
  var id_bannerCCIT1 = 594258;
  
  var commerceInfo = JSON.parse(sessionStorage.getItem("commerce_info"));
      
  // Fecha límite para mostrar el banner
  var dteLimitCCIT1 = new Date();
  var days = 2; // Define la cantidad de días
  dteLimitCCIT1.setTime(dteLimitCCIT1.getTime() + (days * 24 * 60 * 60 * 1000)); // 7 días
  
  var today = new Date();
   
  // Listado de ruts
  var ruts_banner_CCIT1 = ["15250908-1"];
  
  if(!(typeof rut_comercio !== 'undefined')){
    rut_comercio = sessionStorage.getItem('rut');
  }
  
  if (today <= dteLimitCCIT1 && typeof rut_comercio !== 'undefined' && rut_comercio) {
    
	var rtcoCCIT1 = rut_comercio;

    if (ruts_banner_CCIT1.includes(rtcoCCIT1)) {
      gsc('params', {
        commerce_rut: commerceInfo.commerce_rut,
		fantasy_name: commerceInfo.fantasy_name,
		first_name: commerceInfo.first_name,
		last_name: commerceInfo.last_name,
		email: commerceInfo.email,
		cellphone: commerceInfo.cellphone,
		region:commerceInfo.region,
        rut_ejecutivo: "1-9",
        nombre_ejecutivo: "Portal Comercio",
        email_ejecutivo: "sinemail@klap.cl"
        
      });

      var posCookieCCIT1 = document.cookie.indexOf('_mkt_CCIT1_jun26');

      if (posCookieCCIT1 !== -1) {
        var segmentText = document.cookie.substring(posCookieCCIT1);
        var posEndCookieCCIT1 = segmentText.indexOf(';');
        var rutClientCCIT1 = segmentText.substring(0, posEndCookieCCIT1).split('=')[1];

        if (rutClientCCIT1 !== rtcoCCIT1) {
          gsc('show', id_bannerCCIT1);
        }
      } else {
              document.cookie = '_mkt_CCIT1_jun26=' + rtcoCCIT1 + ';expires=' + dteLimitCCIT1.toUTCString() + ';'+';path=/';
        gsc('show', id_bannerCCIT1);
      }
    }
  }

  gsc('onOpenUrl', function (widgetId, data) {
    if (widgetId === id_bannerCCIT1) {
      document.cookie = '_mkt_CCIT1_jun26=' + rtcoCCIT1 + ';expires=' + dteLimitCCIT1.toUTCString() + ';'+';path=/';
      gsc('close', id_bannerCCIT1);
    }
  });

</script>

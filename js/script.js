function launchFullScreen(element) {
  if(element.requestFullScreen) {
    element.requestFullScreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullScreen) {
    element.webkitRequestFullScreen();
  }
}

function apagarAudio(audio){
  var reducir = setInterval(function(){
    audio.volume -= 0.03;
    if (audio.volume <= 0.09) {
      audio.pause()
      clearInterval(reducir)
    }
  }, 70)
}
function encenderAudio(audio, maxVol = 1){
  audio.play();
  var aumentar = setInterval(function(){
    audio.volume += 0.04;
    if (audio.volume >= maxVol - 0.08) {
      clearInterval(aumentar)
      audio.volume = maxVol;
    }
  }, 70)
}

$(document).ready(function() {
  var $audioFondo = $("audio")[0];
  $(window).load(function(){
    $("#load").delay(1000).fadeOut(1000);
    $audioFondo.play();
  });
  animaciones()
  var arrSeccion = [$("#cap1")];
  for (var i = 0; i < arrSeccion.length; i++) {
    arrSeccion[i].niceScroll({
      scrollspeed: 200, mousescrollstep: 20, horizrailenabled: false
    });
  }


  var $capBtn = $('nav>ul>li');
  var $sec = $('#principal>.seccion');
  var enAnim = false;
  var videoPaisaje = $("#paisaje")[0];
  var videoViaje = $("#viajeVid")[0];
  var audioCantar = $("#cantando")[0];
  audioCantar.volume = 0
  videoPaisaje.volume = 0

  $capBtn.click(function(e) {
    if(!enAnim && !$(this).hasClass('activo'))
    {
      enAnim = true
      var index = $capBtn.index(this);
      $capBtn.removeClass('activo');
      $(this).addClass('activo');
      $(".seccion.activo").stop().slideUp(2000).toggleClass('activo');
      $($sec[index]).stop()
      .slideDown(2000, function(){
        enAnim=false
      })
      .toggleClass('activo');

      if (index > 1 && !$audioFondo.paused) {
        apagarAudio($audioFondo)
      }else if($audioFondo.paused && index <= 1){
        encenderAudio($audioFondo)
      }
      if(index == 1){videoViaje.play()}else{videoViaje.pause()}

      if(index == 2){encenderAudio(audioCantar)}
      else if (!audioCantar.paused){
        apagarAudio(audioCantar)
      }

      if(index == 3){encenderAudio(videoPaisaje, 0.7)}
      else if (!videoPaisaje.paused){
        apagarAudio(videoPaisaje)
      }
    }
  });

  $("#retratos div").click(function(event) {
    $(this).find('p').css({
      opacity: 1,
      top: "0%"
    });
  })
  .mouseleave(function(event) {
    $(this).find('p').css({
      opacity: 0,
      top: "-100%"
    });
  });

  var $video_p3 = $('#cap1-p3 video')[0]
  $video_p3.volume = 0;
  $("#cap1").scroll(function(){
    var vol = $video_p3.volume
    if ($("#cap1-p3").hasClass('actAudio') && vol < 0.3) {
      vol += 0.005
    }else if (vol >= 0.05) {
      vol -= 0.005
      if (vol <= 0.05) {vol = 0}
    }
    $video_p3.volume = vol
  });

  var $explorar = $(".intro .mns-auxiliar");
  $explorar.click(function(event) {
    $(this).parent().fadeOut('slow');
  });

  var $loc = $(".locacion", "#cap2")
  var $inv = $(".invest", "#cap2")
  $(".cerrar", "#cap2").click(function(event) {
    $loc.removeClass('abrir');
    $inv.removeClass('mostrar');
  });
  $loc.click(function(event) {
    var index = $loc.index(this)
    $loc.removeClass('abrir');
    $inv.removeClass('mostrar');
    $(this).addClass('abrir');
    $($inv[index]).addClass('mostrar')
  })

  var $dibujo = $(".elem", "#cap3")
  var $resultado = $(".resultado", "#cap3")
  $dibujo.click(function(event) {
    var index = $dibujo.index(this);
    $($resultado[index]).addClass('mostrar');
    $capBtn.fadeOut('fast');
  });
  $resultado.click(function(event) {
    $(this).removeClass('mostrar')
    $capBtn.fadeIn('fast');
  });

});

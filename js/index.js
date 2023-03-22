"use strict";
/*******************************************************************************
 * Lazyloading function of the img tag with lazy class 
 **/
document.addEventListener("DOMContentLoaded", function () {
  var lazyloadImages;

  if ("IntersectionObserver" in window) {
    lazyloadImages = document.querySelectorAll(".lazy");
    var imageObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var image = entry.target;
          image.src = image.dataset.src;
          image.classList.remove("lazy");
          imageObserver.unobserve(image);
        }
      });
    });

    lazyloadImages.forEach(function (image) {
      imageObserver.observe(image);
    });
  } else {
    var lazyloadThrottleTimeout;
    lazyloadImages = document.querySelectorAll(".lazy");

    function lazyload() {
      if (lazyloadThrottleTimeout) {
        clearTimeout(lazyloadThrottleTimeout);
      }

      lazyloadThrottleTimeout = setTimeout(function () {
        var scrollTop = window.pageYOffset;
        lazyloadImages.forEach(function (img) {
          if (img.offsetTop < (window.innerHeight + scrollTop)) {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
          }
        });
        if (lazyloadImages.length == 0) {
          document.removeEventListener("scroll", lazyload);
          window.removeEventListener("resize", lazyload);
          window.removeEventListener("orientationChange", lazyload);
        }
      }, 20);
    }

    document.addEventListener("scroll", lazyload);
    window.addEventListener("resize", lazyload);
    window.addEventListener("orientationChange", lazyload);
  }
  /*******************************************************************************
 * Hide the legal notice on any click
 **/
  document.body.addEventListener("click", function () {
    document.getElementById("legal-notice").style.display = "none"
  })
  /*******************************************************************************
 * When the send button is clicked
 **/
  document.getElementById("send-message").addEventListener("click", function (event) {
    // if the validator does not prevent form submit

    // Get the form and check for datas in it
    const firstName = document.getElementById("form-firstname").value
    if (firstName === "") {
      return false;
    }
    const lastName = document.getElementById("form-lastname").value
    if (lastName === "") {
      return false;
    }
    let phone = document.getElementById("form-phone").value
    if (phone === "") {
      phone = "NON RENSEIGNE";
    }
    const email = document.getElementById("form-email").value
    if (email === "") {
      return false;
    }
    const message = document.getElementById("form-message").value
    if (message === "") {
      return false;
    }
    // POST values in the background the the script URL
    $.ajax({
      type: "post",
      url: "https://vps1.papit.fr/contact/",
      scriptCharset: "utf-8",
      async: false,
      data: {
        "firstname": firstName,
        "lastname": lastName,
        "phone": phone,
        "email": email,
        "message": message,
      },
      beforeSend: function () {
        $('#waiting-modal').modal('show');
      },
      success: function () {
        // inject the alert to .messages div in our form
        $('#contact-form').find('.messages').html('<div class="alert alert-success alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&#10062;</button>Votre message a été envoyé</div>');
      },
      error: function () {
        $('#contact-form').find('.messages').html("<div class='alert alert-danger alert-dismissable'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&#10062;</button>Erreur serveur, votre message n'a pas été envoyé.</div>");
      },
      complete: function () {
        // empty the form
        $('#contact-form')[0].reset();
        $('#waiting-modal').modal('hide');
        setTimeout(function () {
          $('#contact-modal').modal('hide');
        }, 2000)
        return true;
      }
    });
    return false;

  }, false)
})

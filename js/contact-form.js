// JavaScript Document
$(document).ready(function() {
  "use strict";

  $(".contact-form").submit(function(e) {
    e.preventDefault();
    var name = $("#contact_name");
    var email = $("#contact_email");
    var subject = $("#inlineFormCustomSelect1");
    var msg = $("#contact_message");
    var flag = false;
    if (name.val() === "") {
      name.closest(".form-control").addClass("error");
      name.focus();
      flag = false;

      return false;
    } else {
      name
        .closest(".form-control")
        .removeClass("error")
        .addClass("success");
    }
    if (email.val() === "") {
      email.closest(".form-control").addClass("error");
      email.focus();
      flag = false;
      return false;
    } else {
      email
        .closest(".form-control")
        .removeClass("error")
        .addClass("success");
    }
    if (msg.val() == "") {
      msg.closest(".form-control").addClass("error");
      msg.focus();
      flag = false;
      return false;
    } else {
      msg
        .closest(".form-control")
        .removeClass("error")
        .addClass("success");
      flag = true;
    }
    const json = {
      name: name.val(),
      email: email.val(),
      subject: subject.val(),
      message: msg.val()
    };
    console.log("dataString", json);
    $(".loading")
      .fadeIn("slow")
      .html("Loading...");

    $.ajax({
      type: "POST",
      data: json,
      url: "https://us-central1-fir-8b1f3.cloudfunctions.net/sendMail",
      cache: false,
      success: function(d) {
        $(".form-control").removeClass("success");
        if (d == "success")
          // Message Sent? Show the 'Thank You' message and hide the form
          $(".loading")
            .fadeIn("slow")
            .html('<font color="#48af4b">Mail sent Successfully.</font>')
            .delay(3000)
            .fadeOut("slow");
        else
          $(".loading")
            .fadeIn("slow")
            .html('<font color="#ff5607">Mail not sent.</font>')
            .delay(3000)
            .fadeOut("slow");
      }
    });
    return false;
  });
  $("#reset").on("click", function() {
    $(".form-control")
      .removeClass("success")
      .removeClass("error");
  });
});

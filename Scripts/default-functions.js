//Maracar o Item de Menu da Pagina Atual
jQuery(document).ready(function ($) {
    var url = window.location.pathname;
    var substr = url.split('/');
    var urlaspx = substr[substr.length - 1];

    $('.nav').find('.active').removeClass('active');
    $('.nav li a').each(function () {
        if ($(this).attr("href") == urlaspx || $(this).attr("href") + ".aspx" == urlaspx || $(this).attr("href") == urlaspx + ".aspx") {
            $(this).parent().addClass('active');
            var elemento = $(this);
            while (elemento.prop("tagName") != "DIV" && elemento.hasClass('navbar') == false) {
                if (elemento.prop("tagName") == "LI" && elemento.attr("class").indexOf('dropdown') >= 0) {
                    elemento.addClass('active');
                }
                elemento = elemento.parent();
            }
        }
    });
});
//end

//Função para exibir botão de retornar para o topo da página
var offset = jQuery(window).height() / 4;
var duration = 300;
jQuery(window).scroll(function () {
    if (jQuery(this).scrollTop() > offset) {
        jQuery('.back-to-top').fadeIn(duration);
    } else {
        jQuery('.back-to-top').fadeOut(duration);
    }
});
jQuery('.back-to-top').click(function (event) {
    event.preventDefault();
    jQuery('html, body').animate({ scrollTop: 0 }, duration);
    return false;
});
//end


function alertas(classTipo, msg) {
    /// <signature>
    ///   <summary>Função que adiciona alerta abaixo do menu</summary>
    ///   <param name="classTipo" type="String">Tipos de classes: error, success, info, block</param>
    ///   <returns type="null" />
    /// </signature>
    /// <signature>
    ///   <summary>Função que adiciona alerta abaixo do menu</summary>
    ///   <param name="msg" type="String">Texto da Mensagem que será exibida</param>
    ///   <returns type="null" />
    /// </signature>

    var DIV = "";
    var UL = "";
    if (classTipo == "error") {
        DIV = "#divAlertsErros";
        UL = "#ulAlertsErros";
    } else if (classTipo == "success") {
        DIV = "#divAlertsSuccess";
        UL = "#ulAlertsSuccess";
    } else if (classTipo == "info") {
        DIV = "#divAlertsInfo";
        UL = "#ulAlertsInfo";
    } else {
        DIV = "#divAlertsBlock";
        UL = "#ulAlertsBlock";
    }

    $(UL).append("<li>" + msg + "</li>");


    $(DIV).show();


}

//função de 
function OpenConfirm(tittle, body, parametros) {
    /// <signature>
    ///   <summary>Função que adiciona um modal de confirmação</summary>
    ///   <returns type="null" />
    /// </signature>

    $("#modalConfirm #confirm-tittle").html(tittle);
    $("#modalConfirm #confirm-budy").html(body);
    $("#ConfirmParametros").val(parametros);
    $('#modalConfirm').modal({});

}

function ordenarSelects(idSelect) {
    /// <signature>
    ///   <summary>Função que Ordena Campos do tipo Serlect</summary>
    ///   <param name="idSelect" type="String">Id do select a ser ordenado</param>
    ///   <returns type="null" />
    /// </signature>

    $("#" + idSelect).html($("option", $("#" + idSelect)).sort(function (a, b) {
        return a.text == b.text ? 0 : a.text < b.text ? -1 : 1;
    }));

}

function desabilitaCampos(campos) {
    campos.forEach(function (campo) {
        $("#" + campo).prop("disabled", "disabled");
    });
    $("#btCancelar").remove();
    $("#btSalvar").addClass("disabled");
    $("#btSalvar").prop("type", "button");
    $("#btSalvar").click(function () {
        alertNoPermission();
    });
}
function getDateNow(format) {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    if (format == 'dd/MM/yyyy')
        return dd + '/' + mm + '/' + yyyy;
    else if (format == 'MM/dd/yyyy')
        return mm + '/' + dd + '/' + yyyy;

}

function getTimeNow() {
    var today = new Date();
    datetext = today.toTimeString();
    return datetext.split(' ')[0];
}


function toggleFullScreen() {
    if (!document.fullscreenElement &&    // alternative standard method
        !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {  // current working methods
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
}
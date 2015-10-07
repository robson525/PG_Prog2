
var asyncRequest = function () {
    function handleReadyState(o, callback) {
        if (o && o.readyState == 4 && o.status == 200) {
            if (callback) {
                callback(o);
            }
        }
    }

    var getXHR = function () {
        var http;
        try {
            http = new XMLHttpRequest;
            getXHR = function () {
                return new XMLHttpRequest;
            };
        } catch (e) {
            var msxml = [
              'MSXML2.XMLHTTP.3.0',
              'MSXML2.XMLHTTP',
              'Microsoft.XMLHTTP'
            ];
            for (var i = 0, len = msxml.length; i < len; ++i) {
                try {
                    http = new ActiveXObject(msxml[i]);
                    getXHR = function () {
                        return new ActiveXObject(msxml[i]);
                    };
                    break;
                } catch (e) { }
            }
        }
        return http;
    };

    return function (method, uri, callback, postData) {
        var http = getXHR();

        http.open(method, uri, true);
        handleReadyState(http, callback);

        http.send(postData || null);
        return http;
    };

}();

function validateUrl(sURl) {
    var retorno = '';
    $.ajax({
        type: 'GET',
        url: sURl,
        success: retorno = true,
        error: retorno = false
    });
    return retorno;
}

function loadPlayer() {
    if ($(".vox-player-audio").html() == "") {
        $(".vox-player-audio").html("<audio id=\"vox-player\" src=\"#\" autoplayer=\"false\"></audio>");
        $(".vox-player-audio").append("<input type=\"hidden\" value=\"0\" id=\"intervalId\">");
        $(".vox-player-audio").append("<input type=\"hidden\" value=\"0\" id=\"recordingId\">");
        $(".vox-player-audio").append("<input type=\"hidden\" value=\"0.00\" id=\"minWidthAux\">");
    }
    $(".ocurrences-popover").popover({
        html: true,
        content: function () {
            return $('#divOcorrenciasResult' + (this.id).substr(17)).html();
        }
    });
}

function MostrarOcorrencia(ID) {
    $("#divOcorrencias" + ID).show();

    var _data = JSON.stringify({ sID: ID });
    $.ajax({
        type: "POST",
        url: "ShowRecorders.aspx/ObterOcorrencias",
        data: _data,
        contentType: "application/json; charset=utf-8",
        success: function (returning) {
            $("#divOcorrenciasResult" + ID).html(returning.d);
        }
    });
}

function tick(id_record) {
    if (($("#stop_audio_img_" + id_record).prop("src")).search("vox-min-stop-disabled.png") == -1) {
        var timerId;
        var vox_player = document.getElementById("vox-player");
        var duration = vox_player.duration.toFixed(2);
        var width_default = $("#vox-player-wave_" + id_record).width();
        var px_s = Number((width_default / duration).toFixed(2));
        if (!vox_player.paused && vox_player.currentTime == 0) {
            if ($("#intervalId").val() != 0 && $("#intervalId").val() != null) {
                var old_record = $("#recordingId").val();
                clearInterval($("#intervalId").val());
                $("#intervalId").val(0);
                $("#img_spectre_" + old_record).css("border-right", "none");
                $("#img_spectre_" + old_record).width($("#vox-player-wave_" + old_record).width());
            }
            $("#img_spectre_" + id_record).css("border-right", "2px solid #ff0000");
            $("#img_spectre_" + id_record).width(0);
            timerId = interval(id_record, width_default, px_s, 0.00);
            $("#intervalId").val(timerId);
        } else if (vox_player.currentTime != 0 && !vox_player.paused) {
            newWidth = $("#img_spectre_" + id_record).width();
            var cTime = Math.floor(newWidth / px_s);
            vox_player.currentTime = cTime;
            timerId = interval(id_record, width_default, px_s, newWidth);
            $("#intervalId").val(timerId);
        } else {
            if (vox_player.currentTime == 0) {
                $("#img_spectre_" + id_record).width(0);
            }
            clearInterval($("#intervalId").val());
        }
    } else {
        $("#img_spectre_" + id_record).css("border-right", "none");
        $("#img_spectre_" + id_record).width(0);
    }
}

function interval(id_record, width_default, px_s, newWidth) {
    var parse = (px_s > 1) ? 100 : 1000;
    px_s = (parse == 100) ? px_s / 10 : px_s;
    var timerId = setInterval(function () {
        newWidth = (Number(newWidth) + px_s).toFixed(2);
        actWidth = $("#img_spectre_" + id_record).width();
        actWidth = (Number(actWidth) + px_s).toFixed(2);
        if (Math.abs(newWidth - actWidth) > px_s) newWidth = actWidth;
        if (px_s < 1.00) {
            newWidth = Math.floor(newWidth);
            var minWidAux = Number($("#minWidthAux").val()) + px_s;
            $("#minWidthAux").val(minWidAux);
            if (newWidth != Math.floor(minWidAux)) {
                if (Math.abs(Math.floor(minWidAux) - Math.floor(newWidth)) != 1) {
                    $("#img_spectre_" + id_record).width(newWidth.toString());
                    $("#minWidthAux").val(newWidth);
                } else
                    $("#img_spectre_" + id_record).width(minWidAux.toString());
            }
        } else {
            if (width_default < newWidth) newWidth = width_default - 1;
            $("#img_spectre_" + id_record).width(newWidth);
        }
    }, parse);
    return timerId;
}

function stop(bottao, id_record) {
    if (bottao.src.search('disabled') == -1) {
        $('#vox-player').trigger("pause");
        $('#vox-player').prop("currentTime", "0");
        $("#img_spectre_" + id_record).width(0);
        clearInterval($("#intervalId").val());
        $("#player_audio_img_" + id_record).attr("src", "img/vox-min-play.png");
    }
}

function play_pause(image, way_audio, id_record) {
    var vox_player = document.getElementById("vox-player");
    var old_record = $("#recordingId").val();
    if (image == '' && way_audio == '') {
        $("#player_audio_img_" + old_record).attr("src", "img/vox-min-play.png");
        clearInterval($("#intervalId").val());
        $('#vox-player').trigger('pause');
        return '';
    }
    if (id_record != '' && old_record != 0 && old_record != id_record) {
        for (var i = 0; i < 1000; i++)
            clearInterval(i);
    }
    vox_player.onended = function () {
        clearInterval($("#intervalId").val());
        $("#img_spectre_" + id_record).width($("#vox-player-wave_" + id_record).width());
        image.src = "img/vox-min-play.png";
    };
    if (id_record != old_record) {
        if (old_record != 0) {
            $("#player_audio_img_" + old_record).attr("src", "img/vox-min-play.png");
            $("#img_spectre_" + old_record).css("border-right", "none");
            $("#img_spectre_" + old_record).width(0);
            $("#stop_audio_img_" + old_record).attr("src", "img/vox-min-stop-disabled.png");
        }
        $("#player_audio_img_" + id_record).attr("src", "img/vox-min-pause.png");
        $("#vox-player").attr("src", way_audio);
        $("#img_spectre_" + id_record).append("<span id=\"span_loading\"><b>loading...</b></span>");
        $('#vox-player').trigger('load');
        vox_player.onloadedmetadata = function () {
            $("#recordingId").val(id_record);
            $("#span_loading").remove();
            $("#img_spectre_" + id_record).css("border-right", "2px solid #ff0000");
            $("#stop_audio_img_" + id_record).attr("src", "img/vox-min-stop.png");
            $('#vox-player').trigger('play');
            image.src = "img/vox-min-pause.png";
            tick(id_record);
        };
    } else {
        if (image.src.search("vox-min-pause.png") != -1) {
            $('#vox-player').trigger('pause');
            image.src = "img/vox-min-play.png";
        } else {
            $('#vox-player').trigger('play');
            image.src = "img/vox-min-pause.png";
        }
        tick(id_record);
    }
}

function vox_player_popup(IDRecorder) {
    var left = (screen.width / 2) - 170;
    var top = (screen.height / 2) - 60;
    window.open('VoxPlayer.aspx?rc=' + IDRecorder, "_blank", "width=340, height=120, top=" + top + ", left=" + left);
}

function vox_video_popup(IDRecorder) {
    var left = (screen.width / 2) - 425;
    var top = (screen.height / 2) - 250;
    window.open('VoxVideo.aspx?rc=' + IDRecorder, "_blank", "width=850, height=500, top=" + top + ", left=" + left);
}

function Download(ID)
{
    var _data = JSON.stringify({ Id: ID });

    $.ajax({
        type: "POST",
        url: "Download.aspx/SendToList",
        data: _data,
        contentType: "application/json; charset=utf-8",
        success: function (returning) {
            
            UpdateDownloads();

        }
    });
}


function loadLinePlayer(mp3, wav, spec, record, gcall, cdown, cpop, cinfo) {
    // monta o caminho dos arquivos
    if (mp3 != '' && mp3 != '0') { 
        mp3 = "File.aspx?id=" + record + "&tf=mp3";
    } else {
        mp3 = "";
    }
    if (wav != '' && wav != '0') {
        wav = "File.aspx?id=" + record + "&tf=wav";
    } else {
        wav = "";
    }
    if (spec != '' && spec != '0') {
        spec = "File.aspx?id=" + record + "&tf=png";
    } else {
        spec = "";
    }
    //

    cdown = (typeof (cdown) == "undefined") ? true : cdown;
    cpop = (typeof (cpop) == "undefined") ? true : cpop;
    cinfo = (typeof (cinfo) == "undefined") ? true : cinfo;

    loadPlayer(); //carrega media player se ele ainda não estiver carregado

    if ($("#commands-" + record).length != 0) {
        $("#commands-" + record).html("");
    }

    $("#commands-" + record).html("<img src=\"img/vox-min-play.png\" class=\"vox-player-pause\" width=\"20\" height=\"20\" onclick=\"JavaScript: play_pause(this,'" + mp3 + "','" + record + "');\" id=\"player_audio_img_" + record + "\" />");
    $("#commands-" + record).append("<img src=\"img/vox-min-stop-disabled.png\" class=\"vox-stop\" width=\"20\" height=\"20\" onclick=\"JavaScript: stop(this,'" + record + "');\" id=\"stop_audio_img_" + record + "\" />");

    if (cdown) { // adiciona o botão de download na div de ações
        $("#commands-" + record).append("<span id=\"span_div_" + record + "\"><div class=\"btn-group\" onclick=\"JavaScript:play_pause('','','');\" id=\"download_li_" + record + "\"><img src=\"img/vox-download.png\" class=\"vox-stop dropdown-toggle\" data-toggle=\"dropdown\" height=\"20\" id=\"download_audio_img_" + record + "\" /><ul class=\"dropdown-menu\" style=\"min-width: 40px; text-align: center;\"><li id=\"download_mp3_li_" + record + "\"><a href=\"" + mp3 + "\" download style=\"padding: 2px 2px; width: auto; margin: 0;\" id=\"download_mp3_" + record + "\">MP3</a></li><li id=\"download_wav_li_" + record + "\"><a href=\"" + wav + "\" download style=\"padding: 2px 2px; width: auto; margin: 0;\" id=\"download_wav_" + record + "\">WAV</a></li><li id=\"download_wav_li_" + record + "\"><a href=\"JavaScript:Download(" + record + ")\" style=\"padding: 2px 2px; width: auto; margin: 0;\">ZIP</a></li></ul></div></span>");
    }
    if (cpop) { // adiciona o botão de abrir o audio em um popup na div de ações
        $("#commands-" + record).append("<img src=\"img/vox-open-play-in-popup.png\" class=\"vox-stop\" height=\"20\" onclick=\"JavaScript:play_pause('','',''); vox_player_popup(" + record + ");\" id=\"popup_audio_img_" + record + "\" />");
    }
    if (cinfo) { // adiciona um botão para abrir as informações do audio
        $("#commands-" + record).append("<a href=\"CallDetails?gcid=" + gcall + "\"><img src=\"img/vox-player-info.png\" /></a>");
    }

    $("#vox-player-wave_" + record).on("click", function (event) {
        var playing_id;
        var width_default = $("#vox-player-wave_" + record).width();
        var duration = $('#vox-player').prop("duration").toFixed(2);
        var px_s = Number((width_default / duration).toFixed(2));
        $(".vox-stop").each(function () {
            if (this.src.search("img/vox-min-stop.png") != -1) {
                playing_id = (this.id).substr(15);
                return false;
            }
        });
        if (record == playing_id) {
            var clicked_value = (event.pageX - $(this).offset().left - 1);
            var n = 0;
            while (n < width_default) {
                if ((clicked_value) > n)
                    n += px_s;
                else {
                    clicked_value = ((n - clicked_value) - (px_s / 2)) > 0 ? n - px_s : n;
                    break;
                }
            }
            var newValue = (clicked_value / px_s).toFixed(2);
            if (clicked_value < 0) {
                clicked_value = 0;
                newValue = 0;
            }
            if (clicked_value > width_default) clicked_value = width_default;
            $("#img_spectre_" + record).width(clicked_value);
            $('#vox-player').prop("currentTime", newValue);
        }
    });


    $("#vox-player-wave_" + record).html("<div class=\"div-min-wave\" id=\"div_spectre_" + record + "\"><div id=\"img_spectre_" + record + "\" style=\"margin: 0; padding: 0; height: 100%; width: 100%px;\"></div></div>");

    if (mp3 == "") {
        $("#player_audio_img_" + record).prop("src", "img/vox-min-play-disabled.png");
        $("#player_audio_img_" + record).removeAttr("onclick");
        $("#player_audio_img_" + record).attr("onclick", '$(\'#alert-audio-id\').show();');
        if (cpop) {
            $("#popup_audio_img_" + record).prop("src", "img/vox-open-play-in-popup-disabled.png");
            $("#popup_audio_img_" + record).removeAttr("onclick");
            $("#popup_audio_img_" + record).attr("onclick", '$(\'#alert-audio-id\').show();');
        }
        if (cdown) {
            $("#download_mp3_li_" + record).remove();
        }
    }

    if (wav == "" && cdown) {
        if (mp3 == "") {
            $("#span_div_" + record).html("<img src='img/vox-download-disabled.png'>");
        }
        $("#download_wav_li_" + record).remove();
    }

    if (spec == "") {
        $("#div_spectre_" + record).css('background-image', 'url(img/vox-player-wave-notfound.png)');
        $("#div_spectre_" + record).css("background-repeat", "no-repeat");
        $("#div_spectre_" + record).css("background-position", "center");
    } else if (spec != "") {
        $("#div_spectre_" + record).css('background-image', 'url(' + spec + ')');
        $("#div_spectre_" + record).css("background-size", "100% 100%");
    }

    $("#div_spectre_" + record).css("opacity", "0.6");
}

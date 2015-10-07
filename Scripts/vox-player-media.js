var timerId = 0;

$(function () {
    $('#play_pause').click(function () {
        if ($('#vox-player').prop("currentTime") == $('#vox-player').prop("duration") || $('#vox-player').prop("currentTime") == 0) {
            $(".player-time-now").html("00:00:00");
            $('#player_range').slider('setValue', 0);
        }
        var duration = Math.floor($('#vox-player').prop("duration"));
        if (!$('#vox-player').prop("paused")) {
            timerId = setInterval(function () {
                var new_time = $('#player_range').slider('getValue') + 1;
                $(".player-time-now").html(mask_time(new_time));
                $('#player_range').slider('setValue', new_time);
                $('#player_range').data('slider').max = duration;
            }, 1000);
        } else {
            clearInterval(timerId);
        }
    });
    $('#stop').click(function () {
        clearInterval(timerId);
        $(".player-time-now").html("00:00:00");
        $('#player_range').slider('setValue', 0);
    });
    $('#player_range').slider().on('slideStop', function (ev) {
        var newVal = $('#player_range').data('slider').getValue();
        $(".player-time-now").html(mask_time(newVal));
        $('#vox-player').prop("currentTime", newVal);
    });
});

function play_pause_media(image, way_audio, id_record) {
    if (image == '' && way_audio == '') {
        $('.vox-player-pause').each(function () {
            if (this.src.search('img/vox-play.png') == -1) {
                this.src = "img/vox-play.png";
            }
        });
        $('#vox-player').trigger('pause');
        return '';
    }
    var vox_player = document.getElementById("vox-player");
    vox_player.onerror = function () {
        vox_player.onerror = null
        image.src = "img/vox-play.png";
        $("#stop").attr("src", "img/vox-stop-disabled.png");
        alert('File not found!');
    };
    vox_player.onended = function () {
        clearInterval(timerId);
        $(".player-time-now").html(mask_time(Math.floor($("#vox-player").prop('duration'))));
        image.src = "img/vox-play.png";
    };
    $('.vox-player-pause').each(function () {
        if (image.id != this.id && (this.src.search("img/vox-pause.png") != -1 || document.getElementById("stop").src.search("img/vox-stop.png") != -1)) {
            this.src = "img/vox-play.png";
            $("#stop").attr("src", "img/vox-stop-disabled.png");
        }
    });
    if (document.getElementById("vox-player").currentTime != 0) {

        if (image.src.search("img/vox-pause.png") != -1) {
            $('#vox-player').trigger('pause');
            image.src = "img/vox-play.png";
        } else {
            $('#vox-player').trigger('play');
            image.src = "img/vox-pause.png";
        }
    } else if (document.getElementById("vox-player").currentTime == 0) {

        $("#player_range").slider("enable");
        var duration = Math.floor($("#vox-player").prop('duration'));
        $('#player_range').slider({
            formatter: function (value) {
                return mask_time(value);
            },
            max: duration
        }).data('slider');
        $(".player-time-total").html(mask_time(duration));
        $('#vox-player').trigger('play');
        image.src = "img/vox-pause.png";
    }
}
function stop_media(bottao) {
    if (bottao.src.search('disabled') == -1) {
        $('#vox-player').trigger('load');
        $("#play_pause").attr("src", "img/vox-play.png");
    }
}
function volume_sum() {
    var player = document.getElementById("vox-player");
    var new_volume = (player.volume + 0.1).toFixed(1);
    if (new_volume <= 1) {
        player.volume = new_volume;
        $("#volume").attr("src", return_image_volume(new_volume));
        if (new_volume > 0.0) {
            $("#vox-song").attr("src", "img/vox-song.png");
        }
    }
}
function volume_sub() {
    var player = document.getElementById("vox-player");
    var new_volume = (player.volume - 0.1).toFixed(1);
    if (new_volume >= 0) {
        player.volume = new_volume;
        $("#volume").attr("src", return_image_volume(new_volume));
        if (new_volume == 0.0) {
            $("#vox-song").attr("src", "img/vox-song-mute.png");
        }
    }
}
function return_image_volume(volume) {
    switch (volume) {
        case '0.0':
            return "img/vox-volume-0.png";
        case '0.1':
            return "img/vox-volume-10.png";
        case '0.2':
            return "img/vox-volume-20.png";
        case '0.3':
            return "img/vox-volume-30.png";
        case '0.4':
            return "img/vox-volume-40.png";
        case '0.5':
            return "img/vox-volume-50.png";
        case '0.6':
            return "img/vox-volume-60.png";
        case '0.7':
            return "img/vox-volume-70.png";
        case '0.8':
            return "img/vox-volume-80.png";
        case '0.9':
            return "img/vox-volume-90.png";
        case '1.0':
            return "img/vox-volume-100.png";
    }
}
function volume_md() {
    if ($("#vox-song").prop('src').search('mute') == -1) {
        $("#vox-player").prop("volume", 0.0);
        $("#vox-song").prop("src", "img/vox-song-mute.png");
        $("#volume").prop("src", "img/vox-volume-0.png");
    } else {
        $("#vox-player").prop("volume", 1.0);
        $("#vox-song").prop("src", "img/vox-song.png");
        $("#volume").prop("src", "img/vox-volume-100.png");
    }
}

function mask_time(v) {
    var sec = v % 60;
    var v = Math.floor(v / 60);
    var min = v % 60;
    var v = Math.floor(v / 60);
    var hou = v;
    var pad = "00";
    var result = (pad + hou).slice(-pad.length) + ":" + (pad + min).slice(-pad.length) + ":" + (pad + sec).slice(-pad.length);
    return result;
}

function mPlayerVerify(mp3, wav, png) {
    $('#player_range').slider({
        formatter: function (value) {
            return mask_time(value);
        }
    }).data('slider');
    var htmldownload = "";
    if (png != "") {
        $(".player-image-wave").prop("src", png);
        $(".player-image-wave").width(280);
    } else {
        $(".player-image-wave").prop("src", "img/vox-player-wave-notfound.png");
        $(".player-image-wave").height(40);
        $(".player-image-wave").width(40);
        $(".player-image-wave").css("margin", "0 auto");
        $(".player-image-wave").css("opacity", "1");
    }
    if (mp3 != "") {
        $("#play_pause").attr("onclick", "JavaScript: play_pause_media(this, '" + mp3 + "');");
        $("#play_pause").prop("src", "img/vox-play.png");
        $("#stop").attr("onclick", "JavaScript: stop_media(this)");
        $("#stop").prop("src", "img/vox-stop.png");
        $("#vox-player").prop("src", mp3);
        $('#vox-player').trigger('load');
        htmldownload += '<a href="' + mp3 + '" donwload><img src="img/vox-download-mp3.png"></a>';
    } else {
        htmldownload += '<img src="img/vox-download-mp3-disabled.png">';
    }
    htmldownload += '&nbsp;';
    if (wav != "") {
        htmldownload += '<a href="' + wav + '" donwload="' + wav + '"><img src="img/vox-download-wav.png"></a>';
    } else {
        htmldownload += '<img src="img/vox-download-wav-disabled.png">';
    }
    $(".player-div-download").html(htmldownload);
}
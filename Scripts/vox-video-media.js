var timerId = 0;

$(function () {
    $('#play_pause').click(function () {
        if ($('#vox-video-body').prop("currentTime") == $('#vox-video-body').prop("duration") || $('#vox-video-body').prop("currentTime") == 0) {
            $(".video-time-now").html("00:00:00");
            $('#player_range').slider('setValue', 0);
        }
        if (!$('#vox-video-body').prop("paused")) {
            timerId = setInterval(function () {
                var new_time = $('#player_range').slider('getValue') + 1;
                $('#player_range').slider('setValue', new_time);
                $(".video-time-now").html(mask_time(new_time));
            }, 1000);
        } else {
            clearInterval(timerId);
        }
    });

    $('#stop').click(function () {
        clearInterval(timerId);
        $(".video-time-now").html("00:00:00");
        $('#player_range').slider('setValue', 0);
    });

    $('#player_range').slider().on('slideStop', function (ev) {
        var newVal = $('#player_range').data('slider').getValue();
        $(".video-time-now").html(mask_time(newVal));
        document.getElementById("vox-video-body").currentTime = newVal;
    });
});

function play_pause_media(image, way_audio, id_record) {
    if (image == '' && way_audio == '') {
        $('.vox-video-pause').each(function () {
            if (this.src.search('img/vox-play.png') == -1) {
                this.src = "img/vox-play.png";
            }
        });
        $('#vox-video-body').trigger('pause');
        return '';
    }
    var vox_player = document.getElementById("vox-video-body");
    vox_player.onerror = function () {
        vox_player.onerror = null
        image.src = "img/vox-play.png";
        $("#stop").attr("src", "img/vox-stop-disabled.png");
        alert('File not found!');
    };
    var duracao = Math.floor($("#vox-video-body").prop('duration'));
    vox_player.onended = function () {
        clearInterval(timerId);
        $(".video-time-now").html(mask_time(duracao));
        image.src = "img/vox-play.png";
    };
    $('.vox-video-pause').each(function () {
        if (image.id != this.id && (this.src.search("img/vox-pause.png") != -1 || document.getElementById("stop").src.search("img/vox-stop.png") != -1)) {
            this.src = "img/vox-play.png";
            $("#stop").attr("src", "img/vox-stop-disabled.png");
        }
    });
    console.log("Tempo = " + vox_player.currentTime);
    if (vox_player.currentTime != 0) {

        if (image.src.search("img/vox-pause.png") != -1) {
            $('#vox-video-body').trigger('pause');
            image.src = "img/vox-play.png";
        } else {
            $('#vox-video-body').trigger('play');
            image.src = "img/vox-pause.png";
        }
    } else if (vox_player.currentTime == 0) {
        console.log('1 vez');
        $("#player_range").slider("enable");
        $('#player_range').slider({
            formatter: function (value) {
                return mask_time(value);
            },
            max: duracao
        }).data('slider');
        $(".video-time-total").html(mask_time(duracao));
        $('#vox-video-body').trigger('play');
        image.src = "img/vox-pause.png";
    }

}

function stop_media(bottao) {
    if (bottao.src.search('disabled') == -1) {
        $('#vox-video-body').trigger('load');
        onloadVideo();
        $("#play_pause").attr("src", "img/vox-play.png");
    }
}

function volume_sum() {
    var player = document.getElementById("vox-video-body");
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
    var player = document.getElementById("vox-video-body");
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
        $("#vox-video-body").prop("volume", 0.0);
        $("#vox-song").prop("src", "img/vox-song-mute.png");
        $("#volume").prop("src", "img/vox-volume-0.png");
    } else {
        $("#vox-video-body").prop("volume", 1.0);
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

function mediaVerify(mp4, png) {    
    $('#player_range').slider({
        formatter: function (value) {
            return mask_time(value);
        }
    }).data('slider');
    var htmldownload = "";
    if (png != "") {
        $("#vox-video-body").prop("poster", png);
    }
    if (mp4 != "") {
        $("#play_pause").attr("onclick", "JavaScript: play_pause_media(this, '" + $("#src-video").val() + "');");
        $("#play_pause").prop("src", "img/vox-play.png");
        $("#stop").attr("onclick", "JavaScript: stop_media(this)");
        $("#stop").prop("src", "img/vox-stop.png");

        $("#vox-video").prop("src", mp4);        
        $('#vox-video-body').trigger('load');
        onloadVideo();
        htmldownload += '<a href="' + mp4 + '" target="_blank" donwload><img src="img/vox-download-mp4.png"></a>';
    } else {
        htmldownload += '<img src="img/vox-download-mp4-disabled.png">';
    }
    $("#video-div-download").html(htmldownload);
}

function onloadVideo() {
    document.getElementById("vox-video-body").onloadedmetadata = function () {
        var duracao = Math.floor($('#vox-video-body').prop("duration"));
        $('#player_range').data('slider').max = duracao;
        $(".video-time-total").html(mask_time(duracao));
        
        
    };
}

// 
function fullScreen() {
    var video = document.getElementById("vox-video-body");
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
    } else {
        console.log(5);
    }

}
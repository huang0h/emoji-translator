/*
------ TO DO ------

***
-- fix unterminated character class error: occuring w/ brackets, who knows what else
*
-- find a way to preserve current outp, only translate "new" input
**
-- fill in info section w/ faqs, about, etc.
*/

let letters = "abcdefghijklmnopqrstuvwxyz";

// default values for text
let decipherability = 50;
let chaos = 0;

// set page content to reflect default values
$("#decipherability").val(decipherability);
$("#chaos").val(chaos);
$("#dec-text").text("decipherability: " + decipherability);
$("#chaos-text").text("chaos: " + chaos);

$("#in").val("type something here and/or play around with the sliders")
$("#out").val(translate($("#in").val()));

document.getElementById("decipherability").oninput = function() {
    decipherability = this.value;
    $("#dec-text").text("decipherability: " + decipherability);

    $("#out").val(translate($("#in").val()));
}

document.getElementById("chaos").oninput = function() {
    chaos = this.value;
    $("#chaos-text").text("chaos: " + chaos);

    $("#out").val(translate($("#in").val()));
}

document.getElementById("in").oninput = function() {
    $("#out").val(translate(this.value));
}

// convert the text in the input field into emojis, if possible
function translate(input) {
    let inp = input.toLowerCase();
    let outp = "";
    // convert only alphabetic characters; rest are left the same
    inp.split("").forEach(function(char) {
        // check if character is alphabetic
        if (char.search(/[abcdefghijklmnopqrstuvwxyz]/) > -1) {
            outp += emojify(char);
        } else if (char == " "){
            outp += "  ";
        } else {
            outp += char;
        }
    });
    return outp;
}

// convert a lowercase letter into an emoji, based off the current dec and chaos values
function emojify(letter) {
    let emojis = emojiList.get(letter);
    // calculation using dec, chaos to get emoji
    let index = Math.round(
        (emojis.length - 1) * (decipherability / 100) + 
        ((Math.random() < 0.5) ? -1:1) * ((emojis.length - 1) * (Math.random() * chaos / 200))
        );
    // normalize index to prevent out of bounds index
    index = Math.min(emojis.length - 1, Math.max(0, index));
    return emojis[index];
}

function toggleInfo() {
    if ($("#info").css("display") == "none") {
        $("#info").css("display", "block");
        $("#info-link").text("less info");
        $("#info-link").attr("href", "#textboxes");
    } else if ($("#info").css("display") == "block") {
        $("#info").css("display", "none");
        $("#info-link").text("more info");
    }
}
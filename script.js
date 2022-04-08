var original_url_IF = document.getElementById('url_input_field');
var submit_btn = document.getElementById('submit_btn');
var shortend_url_IF = document.getElementById('new_url_input_field');
var copyt_btn = document.getElementById('copy_btn');
var back_btn = document.getElementById('back_btn');
var toast_msg = document.getElementById('toast_msg');
var loading_bar = document.getElementById('loading_bar');
const url = "https://shortme.herokuapp.com";

submit_btn.onclick = async (e) => {
    e.preventDefault();
    let original_url = original_url_IF.value;
    
    if (original_url == "")
    return;
    
    display_loading_bar();
    
    var formBody = []
    var key = encodeURIComponent("originalURL");
    var value = encodeURIComponent(original_url);
    formBody.push(key + '=' + value);


    var response = await fetch(url + '/short', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        body: formBody
    });
    var data = await response.json();
    display_new_path(data.shortURL)
}

back_btn.onclick = (e) => {
    reset_view();
}

copyt_btn.onclick = (e) => {
    let text = shortend_url_IF.innerText;
    navigator.clipboard.writeText(text);

    toast_msg.hidden = false;
    setTimeout(() =>{
        toast_msg.hidden = true
    }, 3000)
}


function display_new_path(shortend_url) {
    shortend_url_IF.innerText = shortend_url;

    original_url_IF.hidden = true;
    submit_btn.hidden = true;
    loading_bar.hidden = true;
    shortend_url_IF.hidden = false;
    copyt_btn.hidden = false;
    back_btn.hidden = false;
}

function display_loading_bar(){
    original_url_IF.hidden = true;
    submit_btn.hidden = true;
    loading_bar.hidden = false;
}


function reset_view() {
    original_url_IF.value = "";
    original_url_IF.hidden = false;
    submit_btn.hidden = false;
    shortend_url_IF.hidden = true;
    copyt_btn.hidden = true;
    back_btn.hidden = true;
    loading_bar.hidden = true;

}
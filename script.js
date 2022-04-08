var original_url_IF = document.getElementById('url_input_field');
var submit_btn = document.getElementById('submit_btn');
var shortend_url_IF = document.getElementById('new_url_input_field');
var copyt_btn = document.getElementById('copy_btn');
const url = "https://shortme.herokuapp.com";

submit_btn.onclick = async (e) => {
    e.preventDefault();
    var formBody = []
    let original_url = original_url_IF.value;

    var key = encodeURIComponent("originalURL");
    var value = encodeURIComponent(original_url);
    formBody.push(key+'='+value);


    var response = await fetch(url+'/short', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        body: formBody
    });
    var data = await response.json();
    display_new_path(data.shortURL+"55555555555555555");
    console.log(data.shortURL)
}


function display_new_path(shortend_url){
    shortend_url_IF.innerText = shortend_url;

    original_url_IF.hidden = true;
    submit_btn.hidden = true;
    shortend_url_IF.hidden = false;
    copyt_btn.hidden = false;
}
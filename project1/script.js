
$(document).ready(function(){
    $('.input-area').click(function(){
        $('#input-image').trigger('click');
        // console.log("Hello");
    });

    $('#input-image').change(event => {
        if(event.target.files){
            let n = event.target.files.length;
            $(".preview-section").html("");

            for(i=0; i<n; i++){
                let file = new FileReader;
                file.onload = function(event){
                    let html = `
                        <div class="uploaded-img">
                            <img src="${event.target.result}" alt="Image{i}">
                            <button type="button" class="select-btn"></button>
                        </div>
                    `;
                    $(".preview-section").append(html);
                }
                file.readAsDataURL(event.target.files[i]);
            }
            $('.upload-info-value').text(n);
            $('upload-img').css('padding', '20px');
        }
    });
});
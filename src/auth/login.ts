import $ from 'jquery';

$(function() {
    $('button.btn_login').on('click', function() {
        console.log('----------------', '로그인');
    })

    const userId = $('#userId').val() as string;
});

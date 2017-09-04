$(document).ready(function () {

    var products = [
        { value: 'диски Реплика R195', data: '1' },
        { value: 'диски Реплика TY195', data: '2' },
        { value: 'диски Replay Replica Mercedes MR195', data: '3' },
        { value: 'диски Replica HND195', data: '4' },
        { value: 'диски Replay Replica Kia Ki195', data: '5' },
        { value: 'диски Реплика HND195', data: '6' },
        { value: 'диски Replica R195', data: '7' },
        { value: 'диски Replay Replica Nissan NS195', data: '8' },
        { value: 'диски Реплика B195', data: '9' },
        { value: 'диски Replica B195', data: '10' },
        { value: 'диски Replica NS195', data: '11' }
    ];

    $('#search-input').autocomplete({
        lookup: products
    });
});
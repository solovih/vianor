$(document).ready(function () {

    var products = [
        { value: '����� ������� R195', data: '1' },
        { value: '����� ������� TY195', data: '2' },
        { value: '����� Replay Replica Mercedes MR195', data: '3' },
        { value: '����� Replica HND195', data: '4' },
        { value: '����� Replay Replica Kia Ki195', data: '5' },
        { value: '����� ������� HND195', data: '6' },
        { value: '����� Replica R195', data: '7' },
        { value: '����� Replay Replica Nissan NS195', data: '8' },
        { value: '����� ������� B195', data: '9' },
        { value: '����� Replica B195', data: '10' },
        { value: '����� Replica NS195', data: '11' }
    ];

    $('#search-input').autocomplete({
        lookup: products
    });
});
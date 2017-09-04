$(document).ready(function () {

    var shopMap, points;

    function show_popup (ind){
        var popup_content = $('#ajax_container_shop_points #popup_'+ind);
        if(screen.width > 768) {
            $('#block_on_map').html( popup_content.html() );
            $('#block_on_map').closest('.modal_map').addClass('in');
        } else {
            $('#shopModal .modal-body').html( popup_content.html() );
            $('#shopModal').modal('show');
        }
    }
    
    function init_list (){
        $('.shop-list a').on('click', function(){
            var ind = $(this).attr('id').split('_')[1];
            show_popup( ind );
        });
    }

    function init_points (){
        var myGeoObjects = [];
        $('#ajax_container_shop_points > div').each(function(i,n){
            var pos = $(n).attr('data-pos').split(','),
                pin = $(n).attr('data-pin'),
                ind = $(n).attr('id').split('_')[1];
            myGeoObjects[i] = new ymaps.Placemark( 
                [ +(pos[0]), +(pos[1]) ], 
                {}, 
                {
                    iconLayout: 'default#imageWithContent',
                    iconImageHref: pin,
                    iconImageSize: [32, 38],
                    iconImageOffset: [-17, -43],
                    
                    popupIndex: ind,
                    iconImageDef: pin,
                    iconImageAct: 'img/map-pin-active.svg'

                }
            );
        });
        clusterer.add( myGeoObjects );
        shopMap.geoObjects.add( clusterer );
        clusterer.events.add('click', function(e){
            var t = e.get('target');
            var i = t.options.get('popupIndex');
            if( i ){
                var p = t.options.get('iconImageAct');
                $.map(clusterer.getGeoObjects(), function(n,i){
                    n.options.set('iconImageHref', n.options.get('iconImageDef'));
                });
                t.options.set('iconImageHref', p );
                shopMap.panTo( t.geometry.getCoordinates(), {
                    delay: 0
                }); 
                show_popup( i );
            }
        });
    }

    ymaps.ready(initMaps);

    function initMaps() {

        shopMap = new ymaps.Map('id_map', {
            center: [55.753559, 37.609218],
            zoom: 12
        });
        
        shopMap.setBounds([[55.66, 37.3], [55.96, 37.94]]);
        
        shopMap.controls.add(new ymaps.control.ZoomControl());

        clusterer = new ymaps.Clusterer({
            gridSize: 64,
            clusterDisableClickZoom: false,
            zoomMargin: [80,80,80,80],
            preset:'islands#orangeClusterIcons'
        });

        $('#ajax_container_shop_points').load('shop_points.html', function(){
            init_points();
            init_list();
        });
    }

});
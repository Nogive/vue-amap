<template>
  <div class="amap-page-container">
    <el-amap vid="amapDemo"  
      :center="center" 
      :amap-manager="amapManager" 
      :zoom="zoom" 
      :events="events" 
      class="amap-demo">
    </el-amap>
    <div class="toolbar">
      <button @click="addInfoWindow()">信息窗体</button>
    </div>
  </div>
  </template>

  <style>
    .amap-page-container {
      width: 100%;
      height: 300px;
    }
  </style>

  <script>
    import {AMapManager} from "vue-amap"
    let amapManager=new AMapManager();
    export default{
      data () {
        return {
          zoom: 16,
          center: [121.329402,31.228667],
          amapManager,
          events: {
            init(o) {
              AMapUI.loadUI(['overlay/SimpleMarker'],function(SimpleMarker){
                const marker=new SimpleMarker({
                  iconLabel: {
                    innerHTML: '<i>mm</i>', //设置文字内容
                    style: {
                        color: '#fff' //设置文字颜色
                    }
                  },
                  iconStyle: 'green',
                  map: o,
                  position: o.getCenter()
                })
              })
            }
          }
        }
      },
      methods:{
        addInfoWindow(){
          let map=amapManager.getMap();
          AMapUI.loadUI(['overlay/SimpleInfoWindow'],function(SimpleInfoWindow){
            var infoWindow = new SimpleInfoWindow({
              infoTitle: '<strong>这里是标题</strong>',
              infoBody: '<p>这里是内容。</p>'
            });
            infoWindow.open(map, map.getCenter());
          })
        }
      }
    };
</script>
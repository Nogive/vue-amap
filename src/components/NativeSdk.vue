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
      <button @click="addMarker()">增加 circle</button>
      <button @click="changeRadius()">更改 range</button>
    </div>
  </div>
  </template>

  <style scoped>
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
              let marker = new AMap.Marker({
                position: [121.329402,31.228667],
                map:o
              });
              //marker.setMap(o);
            }
          },
          radius:100,
          currentCircle:null
        }
      },
      methods:{
        addMarker(){
          let map=amapManager.getMap();
          let circle=new AMap.CircleMarker({
            center: [121.329402,31.228667],
            radius:this.radius,
            strokeColor:'#38f',
            strokeOpacity:'0.8',
            strokeWeight:1,
            fillColor:'#38f',
            fillOpacity:'0.2'
            //map:map   //写法一
          })
          circle.setMap(map);
          this.currentCircle=circle; //写法二
        },
        changeRadius(){
          this.radius+=10;
          this.currentCircle.setRadius(this.radius);
        }
      }
    };
</script>
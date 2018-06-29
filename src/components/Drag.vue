<template>
  <div>
    <button @click="addRadius">增加范围</button>
    <button @click="startSearch">搜索</button>
    <p>{{address}}</p>
    <hr>
    <div class="amap-page-container">
      <input v-if="toSearch" type="text" class="search-input" id="search">
      <el-amap 
        vid="amap" 
        :zoom="zoom" 
        class="amap-demo" 
        :center="center"
        :amapManager="amapManager"
        :events="events"
        >
        <el-amap-circle 
          vid="circle"
          :center="center" 
          :radius="radius" 
          fill-opacity="0.2"
          strokeColor="#38f"
          strokeOpacity="0.8"
          strokeWeight="1"
          fillColor="#38f"
          >
        </el-amap-circle>
      </el-amap>
    </div>
    <ul>
      <li v-for="item in result" :key="item.id">{{item.name}}</li>
    </ul>
  </div>
</template>

<style scoped>
  .amap-page-container {
    height: 300px;
    position: relative;
  }
  .search-input{
    border: 1px solid red;
    position: absolute;
    z-index: 5;
    width: 80%;
    left: 10%;
    padding: 5px;
  }
  .toolbar{
    margin-top: 15px;
  }
</style>

<script>
  import {AMapManager} from "vue-amap"
  let amapManager=new AMapManager();
  export default {
    data() {
      let vm = this;
      return {
        zoom:16,
        center: [121.329402,31.228667],
        result:[],
        address:"",
        radius:100,
        toSearch:false,
        amapManager,
        map:null,
        events:{
          init(o){
            vm.map=o;
            //方法一
            // AMapUI.loadUI(['misc/PositionPicker'], function(PositionPicker) {
            //   var positionPicker = new PositionPicker({
            //       mode: 'dragMap',
            //       map: o
            //   });
            //   positionPicker.on('success', function(positionResult){
            //     vm.result=positionResult.regeocode.pois;
            //     vm.address=positionResult.regeocode.formattedAddress;
            //     vm.center=[positionResult.position.lng,positionResult.position.lat]
            //   })
            //   positionPicker.start();
            // })
          }
        }
      };
    },
    watch:{
      map:function(){
        if(this.map!=null){
          this.startDrag();
        }
      }
    },
    methods:{
      startDrag(){//方法二
        let vm=this;
        let map=this.amapManager.getMap();
        AMapUI.loadUI(['misc/PositionPicker'], function(PositionPicker) {
          var positionPicker = new PositionPicker({
              mode: 'dragMap',
              map: map
          });
          //定位
          let geolocation;
          map.plugin('AMap.Geolocation', function () {
            geolocation=new AMap.Geolocation({
              showButton: true,        //显示定位按钮，默认：true
              showMarker: false,        //定位成功后在定位到的位置显示点标记，默认：true
              extensions:'all'
            })
            map.addControl(geolocation);
            geolocation.getCurrentPosition();
            AMap.event.addListener(geolocation, 'complete', function(data){
              positionPicker.start();
            });//返回定位信息
          })
          positionPicker.on('success', function(positionResult){
            vm.result=positionResult.regeocode.pois;
            vm.address=positionResult.regeocode.formattedAddress;
            vm.center=[positionResult.position.lng,positionResult.position.lat]
          })
          positionPicker.on('fail', function(failResult){
            console.log(failResult)
          })
          // positionPicker.start();
        })
      },
      addRadius(){
        this.radius+=10;
      },
      startSearch() {
        let vm=this;
        let map=this.amapManager.getMap();
        this.toSearch=true;
        AMapUI.loadUI(['misc/PoiPicker'], function(PoiPicker) {
          var poiPicker = new PoiPicker({
              input: 'search', //输入框id
              
          });
          //监听poi选中信息
          poiPicker.on('poiPicked', function(poiResult) {
            //用户选中的poi点信息
            vm.center=[poiResult.item.location.lng,poiResult.item.location.lat]
          });
        });
      },
    }
  };
</script>
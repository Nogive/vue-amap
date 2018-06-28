<template>
  <div>
    <button @click="addRadius">增加范围</button>
    <p>{{address}}</p>
    <hr>
    <div class="amap-page-container">
      <el-amap 
        vid="amap" 
        :zoom="zoom" 
        class="amap-demo" 
        :center="center"
        :amapManager="amapManager"
        :events="events">
        <el-amap-circle  vid="circle"
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

<style>
  .amap-page-container {
    height: 300px;
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
          positionPicker.on('success', function(positionResult){
            vm.result=positionResult.regeocode.pois;
            vm.address=positionResult.regeocode.formattedAddress;
            vm.center=[positionResult.position.lng,positionResult.position.lat]
          })
          positionPicker.on('fail', function(failResult){
            console.log(failResult)
          })
          positionPicker.start();
        })
      },
      addRadius(){
        this.radius+=10;
      }
    }
  };
</script>
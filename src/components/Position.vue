<template>
  <div>
    <button @click="startPosition">定位</button>
    <div class="toolbar">
      {{address}}
    </div>
    <hr>
    <div class="amap-page-container">
      <el-amap 
        vid="amap" 
        :zoom="zoom" 
        class="amap-demo" 
        :center="center"
        :amapManager="amapManager">
        <el-amap-marker :position="center"></el-amap-marker>
      </el-amap>
    </div>
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
      let self = this;
      return {
        zoom:16,
        center: [121.329402,31.228667],
        lng: 0,
        lat: 0,
        address:'',
        amapManager,
        // plugin: [{  //方法一
        //   pName: 'Geolocation',
        //   events: {
        //     init(o) {
        //       // o 是高德地图定位插件实例
        //       o.getCurrentPosition((status, result) => {
        //         console.log(status);
        //         console.log(result);
        //         if (result && result.position) {
        //           self.lng = result.position.lng;
        //           self.lat = result.position.lat;
        //           self.center = [self.lng, self.lat];
        //           self.loaded = true;
        //           self.$nextTick();
        //         }
        //       });
        //     }
        //   }
        // }]
      };
    },
    methods:{
      startPosition(){//方法二
        let vm=this;
        let map=this.amapManager.getMap();
        let geolocation;
        map.plugin('AMap.Geolocation', function () {
          geolocation = new AMap.Geolocation({
              enableHighAccuracy: true,//是否使用高精度定位，默认:true
              timeout: 10000,          //超过10秒后停止定位，默认：无穷大
              maximumAge: 0,           //定位结果缓存0毫秒，默认：0
              convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
              showButton: true,        //显示定位按钮，默认：true
              buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
              buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
              showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
              showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
              panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
              zoomToAccuracy:true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
              extensions:'all'
          });
          map.addControl(geolocation);
          geolocation.getCurrentPosition();
          AMap.event.addListener(geolocation, 'complete', function(data){
            console.log(data);
            vm.address=data.formattedAddress;
            vm.lng=data.position.lng;
            vm.lat=data.position.lat;
          });//返回定位信息
          AMap.event.addListener(geolocation, 'error', function(data){
            console.log(data);
          });      //返回定位出错信息
        });
      }
    }
  };
</script>
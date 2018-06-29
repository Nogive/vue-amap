<template>
  <div class="search-box">
    <button @click="startSearch">POI选点（PoiPicker）</button>
    <input type="text" class="search-input" v-show="showSearch" id="search" v-model="value">
    <hr>
    <button @click="searchByPlaceSearch">placeSearch</button>
    <hr>
    <div class="amap-page-container">
      <el-amap 
        vid="amapDemo" 
        :center="center" 
        :zoom="zoom"
        :amapManager="amapManager"
        class="amap-demo">
        <el-amap-marker
          :position="center">
        </el-amap-marker>
      </el-amap>
    </div>
    <div id="panel"></div>
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
  .search-input {
    border: 1px solid grey;
    padding: 5px;
  }
  .search-tips{
    height: 240px;
  }
</style>

<script>
  import {AMapManager} from "vue-amap"
  let amapManager=new AMapManager();
  export default {
    data() {
      return {
        zoom: 16,
        center: [121.329402,31.228667],
        amapManager,
        result:[],
        showSearch:false,
        value:''
      };
    },
    methods: {
      startSearch() {
        let vm=this;
        let map=this.amapManager.getMap();
        this.showSearch=true;
        AMapUI.loadUI(['misc/PoiPicker'], function(PoiPicker) {
          var poiPicker = new PoiPicker({
              input: 'search', //输入框id
              
          });
          //监听poi选中信息
          poiPicker.on('poiPicked', function(poiResult) {
            //用户选中的poi点信息
            console.log(poiResult);
            vm.center=[poiResult.item.location.lng,poiResult.item.location.lat]
          });
        });
      },
      searchByPlaceSearch(){
        let vm=this;
        let map=this.amapManager.getMap();
        var placeSearch =new AMap.PlaceSearch({
          extensions:'all',
          map:map,
          panel:'panel'
        })
        placeSearch.search('上海',function(status,result){
          console.log(status);
          console.log(result);
        });
      }
    }
  };
</script>
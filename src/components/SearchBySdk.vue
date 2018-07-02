<template>
  <div class="search-box">
    <button @click="searchByPlaceSearch">placeSearch</button>
    <input type="text" class="search-input" v-show="showSearch" id="search" v-model="value">
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
  hr{
    border-color: red;
    border-style: dashed;
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
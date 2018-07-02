<template>
  <div class="search-body">
    <button @click="startSearch">搜索</button>
    <hr>
    <div class="amap-page-container">
      <div class="search-box" v-if="showSearch">
        <input type="text" class="search-input" id="search" v-model="searchKey">
        <button @click="handleSearch">搜索</button>
        <div class="tip-box" id="panel"></div>
      </div>
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
  .search-box{
    position: absolute;
    z-index: 5;
    width: 90%;
    left: 5%;
    top: 10px;
    height: 30px;
  }
  .search-box input{
    float: left;
    width: 80%;
    height: 100%;
    border: 1px solid #38f;
    padding: 0 8px;
  }
  .search-box button{
    float: left;
    width: 20%;
    height: 100%;
    background: #38f;
    border: 1px solid #38f;
    color: #fff;
  }
  .tip-box{
    width: 100%;
    max-height:260px;
    position: absolute;
    top: 30px;
    overflow-y: auto;
    background-color: #fff;
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
      let vm=this;
      return {
        zoom: 16,
        center: [121.329402,31.228667],
        amapManager,
        result:[],
        showSearch:false,
        searchKey:'',
        placeSearch:null,
      };
    },
    watch:{
      searchKey(){
        if(this.searchKey===''){
          this.placeSearch.clear();
        }
      }
    },
    methods: {
      startSearch(){
        let vm=this;
        let map=this.amapManager.getMap();
        vm.showSearch=true;
        AMap.service('AMap.PlaceSearch', () => {
          let placeSearch = new AMap.PlaceSearch({
            map: map,
            panel: 'panel'
          })
          vm.placeSearch=placeSearch;
          AMap.event.addListener(placeSearch, 'listElementClick', function(data){
            vm.searchKey='';
            vm.center=[data.data.location.lng,data.data.location.lat];
          });
        })
      },
      handleSearch(){
        if(this.searchKey){
          this.placeSearch.search(this.searchKey);
        }
      }
    }
  };
</script>
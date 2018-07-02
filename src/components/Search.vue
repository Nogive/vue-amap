<template>
  <div>
    <div class="amap-page-container">
      <el-amap-search-box 
        class="search-box" 
        :search-option="searchOption" 
        :on-search-result="onSearchResult">
      </el-amap-search-box>
      <el-amap 
        vid="amapDemo" 
        :center="center" 
        :zoom="zoom" 
        class="amap-demo">
        <el-amap-marker
          :position="center" >
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
  .search-box {
    position: absolute !important;
    top: 10px;
    left: 20px;
    border: 1px solid grey;
  }
  hr{
    border-color: red;
    border-style: dashed;
  }
</style>

<script>
  export default {
    data() {
      return {
        zoom: 16,
        center: [121.329402,31.228667],
        searchOption: {
          city: '上海',
          citylimit: true
        },
        result:[]
      };
    },
    methods: {
      onSearchResult(pois) {
        this.result=pois;
        let latSum = 0;
        let lngSum = 0;
        if (pois.length > 0) {
          pois.forEach(poi => {
            let {lng, lat} = poi;
            lngSum += lng;
            latSum += lat;
          });
          let center = {
            lng: lngSum / pois.length,
            lat: latSum / pois.length
          };
          this.center = [center.lng, center.lat];
        }
      }
    }
  };
</script>
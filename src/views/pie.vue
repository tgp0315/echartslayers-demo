<template>
  <div class="home" ref="map"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "HomeView",
  methods: {
    /**
     * @function initMap
     * @desc Initalizes and draws the map on the page
     * @returns {undefined}
     */
    initMap() {
      this.map = new window.mapboxgl.Map({
        container: this.$refs.map, // container id
        // style: "",
        style: "mapbox://styles/mapbox/streets-v12",
        center: [112, 37.94],
        zoom: 5,
      });
      this.map.on("load", () => {
        this.adddGeoLine();
      });
    },
    adddGeoLine() {
      window.thematicdata = [
        {
          XZQH: "110000",
          BZ3: 30.0,
          XZQHMC: "北京市",
          BZ2: 10.0,
          GEOJSON:
            '{"type": "Feature","properties": {},"geometry": {"type": "Point","coordinates": [116.412616834352,40.1855914174138 ]}}',
        },
        {
          XZQH: "140000",
          BZ3: 50.0,
          XZQHMC: "山西省",
          BZ2: 20.0,
          GEOJSON:
            '{"type": "Feature","properties": {},"geometry": {"type": "Point","coordinates": [112.288799420842,37.5712486062551 ]}}',
        },
        {
          XZQH: "220000",
          BZ3: 500.0,
          XZQHMC: "吉林省",
          BZ2: 300.0,
          GEOJSON:
            '{"type": "Feature","properties": {},"geometry": {"type": "Point","coordinates": [126.187672031028,43.6682548638262 ]}}',
        },
        {
          XZQH: "360000",
          BZ3: 100.0,
          XZQHMC: "江西省",
          BZ2: 2000.0,
          GEOJSON:
            '{"type": "Feature","properties": {},"geometry": {"type": "Point","coordinates": [115.72225295253,27.6141576799222 ]}}',
        },
      ];
      window.thematicHeader = {
        XZQH: "行政区划",
        BZ3: "小学",
        XZQHMC: "行政区划名称",
        BZ2: "初中",
        GEOJSON: "坐标",
      };
      //需要清理的对象
      window.echartMapPoints = [];
      window.echartInitLists = [];

      this.addThematicEchartLayer();
    },
    //加载专题地图
    addThematicEchartLayer() {
      //销毁echartLists
      this.clearEchartInstantAndPoint();
      //专题数据处理及加载到地图
      window.thematicdata.forEach((element) => {
        var geojson = JSON.parse(element.GEOJSON);
        var el1 = document.createElement("div");
        el1.id = "thematicchart" + element.XZQH;
        el1.style = "height:100px;width:100px;";
        window.echartMapPoints.push(
          new window.mapboxgl.Marker(el1, {
            offset: [-50 / 2, -50 / 2],
          })
            .setLngLat([
              geojson.geometry.coordinates[0],
              geojson.geometry.coordinates[1],
            ])
            .addTo(this.map)
        );
        //echart初始化专题图
        this.addEchartInit(element);
      });
    },

    //echart初始化专题图
    addEchartInit(element) {
      var data = [];
      Object.keys(window.thematicHeader).forEach((key) => {
        if (key.indexOf("BZ") != -1) {
          data.push({
            name: window.thematicHeader[key],
            value: element[key],
          });
        }
      });
      var option1 = {
        tooltip: {
          trigger: "item",
          formatter: "{a}<br/>{b} : {c} ({d}%)",
        },
        series: {
          name: element.XZQHMC,
          type: "pie",
          data: data,
          radius: "50%",
          center: ["50%", "50%"],
          label: {
            normal: {
              position: "inner",
              fontSize: 10,
            },
          },
        },
      };
      window.echartInitLists.push(
        this.initEchart("thematicchart" + element.XZQH, option1)
      );
    },
    //初始化echart表
    initEchart(id, options) {
      var mychart = echarts.init(document.getElementById(id));
      mychart.setOption(options);
      return mychart;
    },

    //清除echart及marker
    clearEchartInstantAndPoint() {
      window.echartInitLists.forEach((echartItem) => {
        echartItem.dispose();
      });
      window.echartMapPoints.forEach((pointItem) => {
        pointItem.remove();
      });
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initMap();
    });
  },
};
</script>

<style>
.home {
  height: 100%;
  width: 100%;
}
</style>

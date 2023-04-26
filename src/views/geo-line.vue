<template>
  <div class="home" ref="map"></div>
</template>

<script>
export default {
  name: "HomeView",
  methods: {
    /**
     * @function initMap
     * @desc Initalizes and draws the map on the page
     * @returns {undefined}
     */
    initMap() {
      var map = new window.mapboxgl.Map({
        container: this.$refs.map, // container id
        // style: "",
        style: "mapbox://styles/mapbox/streets-v12",
        center: [112, 37.94],
        zoom: 5,
      });
      console.log(map);
      map.on("load", () => {
        this.adddGeoLine(map);
      });
    },
    adddGeoLine(map) {
      const geoCoordMap = {
        1: [116.46914, 39.998302],
        2: [113.91266, 39.261833],
        3: [115.888377, 35.497271],
        4: [120.480662, 32.806587],
      };
      const oneData = [
        [
          {
            name: "1",
          },
          {
            name: "2",
            value: 20,
          },
        ],
        [
          {
            name: "1",
          },
          {
            name: "3",
            value: 20,
          },
        ],
        [
          {
            name: "1",
          },
          {
            name: "4",
            value: 20,
          },
        ],
      ];

      const convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var dataItem = data[i];
          var fromCoord = geoCoordMap[dataItem[1].name];
          var toCoord = geoCoordMap[dataItem[0].name];
          if (fromCoord && toCoord) {
            res.push({
              fromName: dataItem[1].name,
              toName: dataItem[0].name,
              coords: [fromCoord, toCoord],
            });
          }
        }
        return res;
      };

      const series = [];
      [["1", oneData]].forEach(function (item) {
        series.push({
          name: "geolines",
          type: "lines",
          coordinateSystem: "GLMap",
          zlevel: 1,
          effect: {
            show: true,
            period: 4,
            trailLength: 0.8,
            color: "#f00",
            symbolSize: 4,
          },
          lineStyle: {
            normal: {
              color: "rgba(34, 181, 230, 0.15)",
              width: 0.5,
              opacity: 0.4,
              curveness: 0.2,
            },
          },
          data: convertData(item[1]),
        });
      });

      var option = {
        GLMap: {
          roam: true,
        },
        coordinateSystem: "GLMap",
        //series是在地图上的线条等效果的配置文件，具体可以查阅文档。
        series: series,
      };
      const echartslayer = new window.EchartsLayer(map);
      echartslayer.chart.setOption(option);
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

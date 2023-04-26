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
      window.$.get("../data/flights.json", function (data) {
        function getAirportCoord(idx) {
          return [data.airports[idx][3], data.airports[idx][4]];
        }
        var routes = data.routes.map(function (airline) {
          return [getAirportCoord(airline[1]), getAirportCoord(airline[2])];
        });
        const option = {
          title: {
            text: "World Flights",
            left: "center",
            textStyle: {
              color: "#eee",
            },
          },

          tooltip: {
            formatter: function (param) {
              var route = data.routes[param.dataIndex];
              return (
                data.airports[route[1]][1] + " > " + data.airports[route[2]][1]
              );
            },
          },
          GLMap: {
            roam: true,
          },
          series: [
            {
              type: "lines",
              coordinateSystem: "GLMap",
              data: routes,
              large: true,
              largeThreshold: 100,
              lineStyle: {
                normal: {
                  opacity: 0.05,
                  width: 0.5,
                  curveness: 0.3,
                },
              },
              // 设置混合模式为叠加
              blendMode: "lighter",
            },
          ],
        };
        const echartslayer = new window.EchartsLayer(map);
        echartslayer.chart.setOption(option);
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

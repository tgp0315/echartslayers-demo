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
      let map = new window.mapboxgl.Map({
        container: this.$refs.map, // container id
        // style: "",
        style: "mapbox://styles/mapbox/streets-v12",
        center: [112, 37.94],
        zoom: 5,
      });
      map.on("load", () => {
        this.adddGeoLine(map);
      });
    },
    adddGeoLine(map) {
      window.$.get("../data/heatmap.json", function (data) {
        console.log(data);
        let points = [].concat.apply(
          [],
          data.map(function (track) {
            return track.map(function (seg) {
              return seg.coord.concat([1]);
            });
          })
        );
        let option = {
          animation: false,
          GLMap: {
            roam: true,
          },
          coordinateSystem: "GLMap",
          visualMap: {
            show: false,
            top: "top",
            min: 0,
            max: 5,
            seriesIndex: 0,
            calculable: true,
            inRange: {
              color: ["blue", "blue", "green", "yellow", "red"],
            },
          },
          series: [
            {
              type: "heatmap",
              coordinateSystem: "GLMap",
              data: points,
              pointSize: 5,
              blurSize: 6,
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

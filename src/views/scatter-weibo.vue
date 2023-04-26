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
      window.$.get("../data/weibo.json", function (data) {
        const weiboData = data.map(function (serieData) {
          var px = serieData[0] / 1000;
          var py = serieData[1] / 1000;
          var res = [[px, py]];

          for (var i = 2; i < serieData.length; i += 2) {
            var dx = serieData[i] / 1000;
            var dy = serieData[i + 1] / 1000;
            var x = px + dx;
            var y = py + dy;
            res.push([x.toFixed(2), y.toFixed(2), 1]);

            px = x;
            py = y;
          }
          return res;
        });
        const option = {
          GLMap: {
            roam: true,
          },
          coordinateSystem: "GLMap",
          title: {
            text: "微博签到数据点亮中国",
            subtext: "From ThinkGIS",
            sublink: "http://www.thinkgis.cn/public/sina",
            left: "center",
            top: "top",
            textStyle: {
              color: "#fff",
            },
          },
          tooltip: {},
          legend: {
            left: "left",
            data: ["强", "中", "弱"],
            textStyle: {
              color: "#ccc",
            },
          },
          // geo: {
          //     name: '强',
          //     type: 'scatter',
          //     map: 'GLMap',
          //     label: {
          //         emphasis: {
          //             show: false
          //         }
          //     },
          //     itemStyle: {
          //         normal: {
          //             areaColor: '#323c48',
          //             borderColor: '#111'
          //         },
          //         emphasis: {
          //             areaColor: '#2a333d'
          //         }
          //     }
          // },
          series: [
            {
              name: "弱",
              type: "scatter",
              coordinateSystem: "GLMap",
              symbolSize: 1,
              large: true,
              itemStyle: {
                normal: {
                  shadowBlur: 2,
                  shadowColor: "rgba(37, 140, 249, 0.8)",
                  color: "rgba(37, 140, 249, 0.8)",
                },
              },
              data: weiboData[0],
            },
            {
              name: "中",
              type: "scatter",
              coordinateSystem: "GLMap",
              symbolSize: 1,
              large: true,
              itemStyle: {
                normal: {
                  shadowBlur: 2,
                  shadowColor: "rgba(14, 241, 242, 0.8)",
                  color: "rgba(14, 241, 242, 0.8)",
                },
              },
              data: weiboData[1],
            },
            {
              name: "强",
              type: "scatter",
              coordinateSystem: "GLMap",
              symbolSize: 1,
              large: true,
              itemStyle: {
                normal: {
                  shadowBlur: 2,
                  shadowColor: "rgba(255, 255, 255, 0.8)",
                  color: "rgba(255, 255, 255, 0.8)",
                },
              },
              data: weiboData[2],
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

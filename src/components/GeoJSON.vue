<template>
  <div>
    <div id="map"></div>
    <div class="btn">
      <button @click="changeMap">切换</button>
    </div>
  </div>
</template>

<script>
const sichuan = require("./../../static/data/sichuan.json");
export default {
  data() {
    return {
      map: null,
      normal: null,
      stat: null,
      group: null,
      geojson: null
    };
  },
  mounted() {
    this.map = L.map("map", {
      center: [22.0, 120.0],
      zoom: 7
    });
    this.normal = L.tileLayer("./../static/autonavi.com/{z}/{y}/{x}.png", {
      attribution: "高德"
    }).addTo(this.map);
    this.group = L.layerGroup();

    var url =
      "http://webst0{s}.is.autonavi.com/appmaptile?style={type}&x={x}&y={y}&z={z}";
    var basemap = L.tileLayer(url, {
      type: "6",
      subdomains: ["1", "2", "3", "4"],
      attribution: "高德"
    }).addTo(this.group);
    var annotion = L.tileLayer(url, {
      type: "8",
      subdomains: ["1", "2", "3", "4"],
      attribution: "高德"
    }).addTo(this.group);
    L.Icon.Default.prototype.options.imagePath = "./../static/images/";
    this.geojson = L.geoJSON(sichuan, {
      style: this.style,
      onEachFeature: this.onEachFeature
    }).addTo(this.map);
  },
  methods: {
    changeMap() {
      if (this.map.hasLayer(this.normal)) {
        this.map.removeLayer(this.normal);
        this.group.addTo(this.map);
      } else {
        this.map.removeLayer(this.group);
        this.normal.addTo(this.map);
      }
    },
    getColor(d) {
      return d > 50
        ? "#800026"
        : d > 40
        ? "#BD0026"
        : d > 30
        ? "#E31A1C"
        : d > 20
        ? "#FC4E2A"
        : d > 10
        ? "#FD8D3C"
        : d > 5
        ? "#FEB24C"
        : d > 0
        ? "#FED976"
        : "#FFEDA0";
    },
    style(feature) {
      return {
        fillColor: this.getColor(feature.properties.childNum),
        weight: 2,
        opacity: 1,
        color: "white",
        dashArray: "3",
        fillOpacity: 0.7
      };
    },

    // 注册事件
    onEachFeature(feature, layer) {
      layer.on({
        mouseover: this.highlightFeature,
        mouseout: this.resetHighlight,
        click: this.zoomToFeature
      });
    },
    zoomToFeature(e) {
      this.map.fitBounds(e.target.getBounds());
    },
    highlightFeature(e) {
      var layer = e.target;

      layer.setStyle({
        weight: 5,
        color: "#666",
        dashArray: "",
        fillOpacity: 0.7
      });

      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }
    },
    resetHighlight(e) {
      this.geojson.resetStyle(e.target);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#map {
  width: 100%;
  height: calc(100vh);
}
.btn {
  position: absolute;
  left: 100px;
  top: 100px;
  z-index: 1001;
}
</style>

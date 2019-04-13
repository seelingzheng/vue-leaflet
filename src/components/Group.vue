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
      center: [30.695668, 104.072828],
      zoom: 7
    });

    this.normal = L.tileLayer(
      "http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
      {
        subdomains: ["1", "2", "3", "4"],
        attribution: "高德"
      }
    ).addTo(this.map);

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

    this.addLayerGroup();
    // this.addFeatureGroup();
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
    addLayerGroup() {
      var a = L.marker([30.695668, 104.072828]).bindPopup("A"),
        b = L.marker([30.668799, 104.124326]).bindPopup("B"),
        c = L.marker([30.640741, 104.066991]).bindPopup("C"),
        d = L.marker([30.65994, 104.028539]).bindPopup("D"),
        e = L.polyline([[30.5, 104.1], [30.4, 104.4]]);
      var point = L.layerGroup([a, b, c, d, e]);

      point.addTo(this.map);
    },
    addFeatureGroup() {
      var a = L.marker([31.695668, 104.072828]),
        b = L.marker([31.668799, 104.124326]),
        c = L.marker([31.640741, 104.066991]),
        d = L.marker([31.65994, 104.028539]),
        e = L.polyline([[30.5, 104.1], [30.4, 104.4]]);
      var point = L.featureGroup([a, b, c, d, e])
        .bindPopup("Hello world!")
        .on("click", () => {
          alert("Clicked on a member of the group!");
        });
      point.addTo(this.map);
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

<template>
  <div>
    <div id="map"></div>
    <div class="btn">
      <button @click="changeMap">切换</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      map: null,
      normal: null,
      stat: null,
      group: null
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
    this.map.on("moveend", this.addMarker);
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
    addMarker() {
      var redMarker = L.ExtraMarkers.icon({
        // icon: "fa-coffee",
        icon: "fa-number",
        number: "42",
        markerColor: "red",
        shape: "penta",
        prefix: "fa",
        className: "animate bounce"
      });
      L.marker(this.map.getCenter(), {
        icon: redMarker
      }).addTo(this.map);
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

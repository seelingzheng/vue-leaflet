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
    // this.normal = L.tileLayer(
    //   "http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
    //   {
    //     subdomains: ["1", "2", "3", "4"],
    //     attribution: "高德"
    //   }
    // ).addTo(this.map);

    this.normal = L.tileLayer(
      "http://localhost:8089/gis/tiles/amap/{z}/{y}/{x}.png",
      {
        attribution: "高德"
      }
    ).addTo(this.map);

    // L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}", {
    //   foo: "bar",
    //   attribution:
    //     'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    // }).addTo(this.map);

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

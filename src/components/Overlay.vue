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

    // this.addImgOverLay();
    this.addVideoOverlay();
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
    addImgOverLay() {
      var imageUrl = "./../../static/images/ditu.png",
        imageBounds = [
          [38.005749113033334, 114.5240321308802],
          [38.00412919584213, 114.52650844256782]
        ];
      var imgLayer = L.imageOverlay(imageUrl, imageBounds).addTo(this.map);
      this.map.flyToBounds(imgLayer.getBounds());
    },
    addVideoOverlay() {
      var videoUrls = [
        "./../../static/video/patricia_nasa.webm",
        "./../../static/video/patricia_nasa.mp4"
      ];

      var bounds = L.latLngBounds([[32, -130], [13, -100]]);

      var videoOverlay = L.videoOverlay(videoUrls, bounds, {
        opacity: 0.8
      }).addTo(this.map);
      this.map.flyToBounds(bounds);
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

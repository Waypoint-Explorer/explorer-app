<script lang="ts">
import {defineComponent} from "vue";
import {Html5Qrcode} from "html5-qrcode";

export default defineComponent({
  data() {
    return {
      isQRScannerEnabled: false,
      qrScanner: null,
      cameraId: null,
      scannerConfig: {
        disableFlip: true,
        aspectRatio: 1,
      }
    };
  },
  mounted() {
    Html5Qrcode.getCameras().then(devices => {
      if (devices && devices.length) {
        this.cameraId = devices[0].id;
        this.emitter.on("qrScannerToggle", () => {
          if (this.isQRScannerEnabled) {
            this.stopQRScanner();
          } else {
            this.startQRScanner();
          }
        });
      }
    }).catch(() => {
      console.log("ERR: Camera not available");
    });

  },
  unmounted() {
    if (this.isQRScannerEnabled) {
      this.stopQRScanner();
    }
  },
  methods: {
    deserializeData(input: string) {
      const markerId = input.substring(0, 16);
      const dynamicCode = input.substring(16, 48);
      const errorCode = input.substring(48, 54);
      const timeReference = parseInt(input.substring(54, 64)) * 1000;
      const measurements: any[] = [];
      let index = 64;
      while (index + 15 <= input.length) {
        const measurement = {
          timestamp: new Date(timeReference + parseInt(input.substring(index, index + 3)) * 60 * 60 * 1000),
          temperature: parseInt(input.substring(index + 4, index + 6)) * (parseInt(input.substring(index + 3, index + 4)) === 1 ? 1 : -1),
          atmosphericPressure: parseFloat(input.substring(index + 6, index + 11)) / 10,
          humidity: parseInt(input.substring(index + 11, index + 13)),
          airQuality: parseInt(input.substring(index + 13, index + 15)),
        };
        measurements.push(measurement);
        index += 15;
      }
      return {
        markerId,
        dynamicCode,
        errorCode,
        measurements,
      };
    },
    startQRScanner() {
      this.isQRScannerEnabled = true;
      this.qrScanner = new Html5Qrcode("scanner");
      this.qrScanner.start(this.cameraId, this.scannerConfig, this.onScanSuccess, this.onScanFailure).catch(() => {
        console.log("ERR: Error when starting reader");
      });
    },
    stopQRScanner() {
      this.isQRScannerEnabled = false;
      this.qrScanner.stop().then(() => {
        this.qrScanner.clear();
        this.qrScanner = null;
      });
    },
    onScanSuccess(decodedText: any, decodedResult: any) {
      console.log(`${decodedText}`, decodedResult);
      // TODO: remove static development string and use decodedText
      decodedText = "2974596726765117823763479203237421385750634414560000001688601610000127101405892001127101415586002127101445893003127101455792004127101455792005127101455792006127101465792007127101465792008127101495892009127101536191010127101536191";
      console.log(this.deserializeData(decodedText));
      this.stopQRScanner();
      this.emitter.emit("waypointVisited", this.deserializeData(decodedText));
    },
    onScanFailure() {},
  }
});
</script>

<template>
  <div id="scanner" ref="scanner" class="qr-scanner-container" :class="{expanded: isQRScannerEnabled}"></div>
</template>

<style lang="scss">
  video {
    border-radius: 25px;
  }
</style>
<style lang="scss" scoped>
  .qr-scanner-container {
    width: calc(100vw - 2 * 1.2rem);
    height: 0;
    position: absolute !important;
    z-index: 1;
    bottom: 9vh;
    margin: 0 1.2rem;
    align-items: center;
    flex-direction: row;
    transition-duration: 500ms;
    transition-timing-function: cubic-bezier(0.5,0.25,0,1);
    background-color: var(--surface-a);
    border-radius: 25px;
    box-sizing: border-box;
    overflow-y: hidden;
  }
  .expanded {
    height: calc(100vw - 2 * 1.2rem);
  }
</style>

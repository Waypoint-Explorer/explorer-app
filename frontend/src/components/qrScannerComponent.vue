<script lang="ts">
import {defineComponent} from "vue";
import {Html5Qrcode} from "html5-qrcode";

export default defineComponent({
  data() {
    return {
      isQRScannerEnabled: false,
      qrScanner: null,
      devices: [],
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
        devices.forEach(device => {
          this.devices.push(device.id);
        });
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

    this.emitter.on("cameraToggle", () => {
      if (this.isQRScannerEnabled && this.devices.length > 1) {
        this.stopQRScanner();
        const currentDevice = this.devices.findIndex(device => device === this.cameraId);
        this.cameraId = this.devices[(currentDevice + 1)  % this.devices.length];
        this.startQRScanner();
      }
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
          timestamp: new Date(timeReference + parseInt(input.substring(index, index + 3)) * 60 * 60 * 1000).toLocaleString('it-IT'),
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
      this.stopQRScanner();
      this.emitter.emit("waypointVisited", this.deserializeData(decodedText));
    },
    onScanFailure() {},
  }
});
</script>

<template>
  <button v-show="isQRScannerEnabled" id="camera-toggle-button" class="p-button p-component p-button-icon-only p-button-rounded" type="button" @click="this.emitter.emit('cameraToggle');">
      <span class="material-icons-outlined">switch_camera</span>
  </button>
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
  #camera-toggle-button {
    position: absolute;
    bottom: 7rem;
    left: calc(50% - (2.488rem / 2));
    z-index: 2;
  }
</style>

<script lang="ts">
  import {defineComponent} from "vue";
  import { Environment } from "../environment";
  import axios from "axios";
  import {Html5QrcodeScanner} from "html5-qrcode";
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

        }
      }).catch(() => {
        console.log("ERR: Camera not available");
      });
      this.qrScanner = new Html5Qrcode("scanner");

      this.emitter.on("qrScannerToggle", () => {
        this.isQRScannerEnabled = !this.isQRScannerEnabled;
        if (this.isQRScannerEnabled) {
          this.qrScanner.start(this.cameraId, this.scannerConfig, this.onScanSuccess, this.onScanFailure).catch(() => {
            console.log("ERR: Error when starting reader");
          });
        } else {
          this.qrScanner.stop();
        }
      });
    },
    methods: {
      visit() {
        this.emitter.emit("waypointVisited");
      },
      onScanSuccess(decodedText: any, decodedResult: any) {
        // handle the scanned code as you like, for example:
        console.log(`Code matched = ${decodedText}`, decodedResult);
      },
      onScanFailure(error: any) {
        // handle scan failure, usually better to ignore and keep scanning.
        // for example:
        console.warn(`Code scan error = ${error}`);
      },
    }
  });
</script>

<template>
  <div id="scanner" class="qr-scanner-container" :class="{expanded: isQRScannerEnabled}"></div>
</template>

<style lang="scss">
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
  }
  .expanded {
    height: calc(100vw - 2 * 1.2rem);
  }
  video {
    border-radius: 25px;
  }
</style>

// import '../css/main.scss';

import {
  getSleeptime,
  getMoment,
  generatePeriods,
  getDataset
} from './calculator';

import Chart from 'chart.js';
import VueChartJs from 'vue-chartjs'
import Vue from 'vue'
import Buefy from 'buefy'

import '../css/theme.scss';
// import 'buefy/dist/buefy.css'
var SunCalc = require('suncalc');

const period = 90 //minutes

const options = {
  weekday: 'long',
  year: '2-digit',
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
}


const chart_options = {
  legend: {
    display: false,
  },
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    xAxes: [{
      display: true,
      type: 'time',
      time: {
        unit: 'hour'
      }
    }],
    yAxes: [{
      display: false,
    }]
  }
}





Vue.use(Buefy)

Vue.config.productionTip = false

Vue.component('line-chart', {
  extends: VueChartJs.Line,
  mounted() {
    this.renderChart({
      datasets: [getDataset(this.sleep_start_time, this.wakeup_time)]
    }, chart_options);
  },

  props: ['atime', 'sleep_start_time', 'wakeup_time'],
  watch: {
    sleep_start_time: function (t_sleep_start, oldVal) {

      // get sun light strength
      //TODO: 画出睡眠周期 根据时区画出太阳时间。
      //atime: the 

      // geo location part
      // if (navigator.geolocation) {
      //   navigator.geolocation.getCurrentPosition(function (position) {
      //     //
      //     console.log("latitude: " + position.coords.latitude + "; longitude: " + position.coords.longitude);
      //   });
      // } else {
      //   alert("Geolocation is not supported by this browser.");
      // }

      this.renderChart({
        datasets: [getDataset(t_sleep_start, this.wakeup_time)]
      }, chart_options);
    },
  }
})

const example = {


  data() {
    var sn = new Date();
    return {
      now_info: "凌晨",
      isImageModalActive: false,
      wakeup_time: new Date(new Date().getTime() + period * 5 * 60 * 1000),
      // canc: false,
      sleep_time: new Date(),
      now: new Date(),
      time: new Date(),
      minutes_remain: 0,
      isAmPm: false,
      sleep_start: sn.toLocaleString('zh-cn', options),
      message: "根据睡眠周期、预计起床时间和当前时间段结合计算适合的入睡时间点",
      period_number: 5,
      ctx: document.getElementById('myChart')
    }
  },
  computed: {
    format() {
      return '24'
    },
    xianzaishi() {
      return "现在是" + getMoment(this.now.getHours()) + "，请输入您的预计起床时间："
    },

  },
  mounted: function () {
    console.log(this.wakeup_time.toLocaleString('zh-cn', options));

    // if (sn.getHours() < 22 && sn.getHours() > 9) {
    //   this.$dialog.alert({
    //     title: '你要现在睡觉？！',
    //     message: '我觉得现在不适合睡觉，晚点再来吧……',
    //     // type: 'is-danger',
    //     hasIcon: true,
    //     icon: 'times-circle',
    //     iconPack: 'fa',
    //     confirmText: '知道了',
    //     onConfirm: function () {
    //       //close the window
    //       console.log(window);
    //       window.close();
    //       // window.open('', '_self').close();
    //     }
    //   })
    // }
  },
  watch: {
    time: function (val, oldVal) {
      var results = getSleeptime(val);
      this.sleep_time = results[0];
      this.sleep_start = results[0].toLocaleString('zh-cn', options);
      this.period_number = results[1];
      this.minutes_remain = results[2];
      this.wakeup_time = results[3];
      console.log(this.wakeup_time.toLocaleString('zh-cn', options));
    },
  },
  methods: {

  }

}



const app = new Vue(example);

app.$mount('#app');
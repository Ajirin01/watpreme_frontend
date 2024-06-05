<template>
    <div>
        <div class="circular-progress">
        <div class="progress-bar">
            <div class="unprogress" :style="unprogressStyle"></div>
            <div class="progress" :style="progressStyle"></div>
            <div class="percentage">{{ animatedProgress }}%</div>
        </div>
        </div>
    </div>
    
  </template>
  
  <script>
  export default {
    props: {
      progress: {
        type: Number,
        required: true
      },
    },
    data() {
      return {
        animatedProgress: 0,
        id: this.$route.params.id
      };
    },
    computed: {
      progressStyle() {
        return {
          transform: `rotate(${this.animatedProgress * 3.6}deg)`,
          clipPath: `polygon(${100 - this.animatedProgress}% 0%, 100% 0%, 100% 100%, ${100 - this.animatedProgress}% 100%)`
        };
      },
      unprogressStyle() {
        return {
          transform: `rotate(${360-(this.animatedProgress * 3.6)}deg)`,
          clipPath: `polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)`
        };
      }
    },
    mounted() {
      this.animateProgress();
    },
    methods: {
      animateProgress() {
        let progressInterval = setInterval(() => {
          if (this.animatedProgress < this.progress) {
            this.animatedProgress += 10;
          } else {
            clearInterval(progressInterval);
          }
        }, 100); // Adjust the interval time as needed
      }
    }
  };
  </script>
  
  <style scoped>
  .circular-progress {
    position: relative;
    width: 100px; /* Adjust as needed */
    height: 100px; /* Adjust as needed */
    display: flex;
    justify-content: center;
    align-items: center;
    transform: scale(.7);
  }
  
  .progress-bar {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #e9ecef; /* Background color of the progress bar */
  }
  
  .progress {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 5px solid #4CAF50;
  }

  .unprogress {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 5px solid #c8c5c5;
  }
  
  .percentage {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 20px; /* Adjust as needed */
    color: #333; /* Text color */
  }
  </style>
  
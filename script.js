var app = new Vue({
    el: '#app',
    
    data: {
        pause: true,
        isAlpha: true,
        isDigit: false,
        correctCode: 'CODE',
        interval: "",
        totalTime: 3,
        malusSeconds: 30,
        timerStart: 0,
        timer: 0,
        percent: 0,
        warning: false,
        danger: false,
        malusAmount: 0,
        malusTimes: 0,
        timerDisplay: '88:88:88',
        digicodeDisplay: '',
        digicode: '',
        started: false
    },

    mounted: function () {
        this.$nextTick(function () {
            this.updateConf();
            this.interval = setInterval(() => {
                this.timerCount(this.start,this.end);
            }, 10);
        })
    },

    methods: {
        startTimer: function(event) {
            this.started = true;
            this.pause = false;
        },
        pauseTimer: function(event) {
            this.pause = true;
        },
        timerCount: function(start, end) {
            if (!this.pause) {
                this.timer = this.timer - 1 - this.malusAmount;
                if(this.timer < 0) {
                    this.timer = 0;
                    $('#failureModal').modal({
                        keyboard: true,
                        focus: true,
                        show: true
                    })
                }
                this.percent = Math.ceil(100 * this.timer / this.timerStart);
                if (this.percent <= 10) {
                    this.danger = true;
                } else {
                    this.danger = false;
                }
    
                if (this.malusTimes > 0) {
                    this.malusTimes = this.malusTimes - 1;
                    this.danger = true;
                } else {
                    this.malusAmount = 0;
                }
            }

            minutes = Math.trunc(this.timer / 100 / 60);
            seconds = Math.trunc((this.timer - minutes * 100 * 60) / 100);
            cents = this.timer % 100;

            fillMinutes = '';
            fillSeconds = '';
            fillCents = '';

            if (minutes < 10) fillMinutes = '0';
            if (seconds < 10) fillSeconds = '0';
            if (cents < 10) fillCents = '0';

            this.timerDisplay = fillMinutes + minutes + ":" + fillSeconds + seconds + ":" + fillCents + cents;
        },
        sendDigit: function(event) {
            var n = this.digicode.length;
            if(n < this.correctCode.length) {
                this.digicode = this.digicode + event.target.innerHTML;
                this.digicodeDisplay = this.digicodeDisplay + '*';
            }
        },
        correctDigit: function(event) {
            var n = this.digicode.length;
            if(n > 0) {
                this.digicode = this.digicode.substr(0, n-1);
                this.digicodeDisplay = this.digicodeDisplay.substr(0, n-1);
            }
        },
        submitCode: function(event) {

            if(this.digicode == this.correctCode) {
                this.pause = true;

                $('#successModal').modal({
                    keyboard: true,
                    focus: true,
                    show: true
                })

            } else {
                this.malusAmount = 20;
                this.malusTimes = this.malusSeconds * 5;
                this.digicode = '';
                this.digicodeDisplay = '';
            }

        },
        setAlpha: function(event) {
            this.isAlpha = true;
            this.isDigit = false;
        },
        setDigit: function(event) {
            this.isAlpha = false;
            this.isDigit = true;
        },
        setAlphaDigit: function(event) {
            this.isAlpha = true;
            this.isDigit = true;
        },
        updateConf: function(event) {
            this.timerStart = this.totalTime * 60 * 100;
            this.timer = this.timerStart;
        },
        reset: function(event) {
            this.started = false;
            this.pause = true;
            this.danger = false;
            this.malusTimes = 0;
            this.malusAmount = 0;
            this.digicode = '';
            this.digicodeDisplay = '';
            this.updateConf();
        }

    }    
})
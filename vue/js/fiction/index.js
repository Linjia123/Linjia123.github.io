var countback = new Vue({
    el: '#slide',
    data: {
        nowIndex: 0,
        isShow: true,
        slides: [{
                src: '/fiction_img/fiction_3.jpg',
                title: 'xxx1',
            },
            {
                src: '/fiction_img/fiction_4.jpg',
                title: 'xxx2',
            },
        ],
        inv:2000,
    },
    computed: {
        prevIndex() {
            if (this.nowIndex === 0) {
                return this.slides.length - 1
            } else {
                return this.nowIndex - 1
            }
        },
        nextIndex() {
            if (this.nowIndex === this.slides.length - 1) {
                return 0
            } else {
                return this.nowIndex + 1
            }
        }
    },
    methods: {
        goto(index) {
            this.isShow = false
            setTimeout(() => {
                this.isShow = true
                this.nowIndex = index
            }, 10)
        },
        runInv() {
            this.invId = setInterval(() => {
                this.goto(this.nextIndex)
            }, this.inv)
        },
        clearInv() {
            clearInterval(this.invId)
        }
    },
    mounted() {
        this.runInv();
    }
})
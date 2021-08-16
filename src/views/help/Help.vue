<template>
    <v-container
        id="dashboard"
        fluid
        tag="section"
    >
        <base-material-card
          icon="mdi-help"
          inline
        >
            <template v-slot:after-heading>
                <div class="display-1 font-weight-bold mb-5" style="float:left;">
                    도움말
                </div>
            </template>
            <iframe src="http://nlptool2.dev.onkakao.net/helper.html" :width="x" :height="y" frameborder="0" style="padding:30px 0px 30px 0px"></iframe>
        </base-material-card>
    </v-container>  
</template>

<script>
export default {
    data () {
            return {
                x: 0,
                y: 0,
            }
        },

        mounted () {
            window.addEventListener('resize', this.handleResize);
        },
        methods: {
            handleResize(event) {
                this.x = window.innerWidth - 170 
                this.y = window.innerWidth * 0.8 
            }
        },
}
</script>
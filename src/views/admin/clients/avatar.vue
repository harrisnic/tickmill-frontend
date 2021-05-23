<template>
    <section>
        <b-container>
            <b-row class="mb-3" align-h="center">
                <b-col lg="4" md="6">

                    <div class="mb-4">
                        <b-button size="sm" @click="$router.back()" variant="light">
                            <b-icon-arrow-left-circle></b-icon-arrow-left-circle> Back
                        </b-button>
                    </div>

                    <b-row class="mb-4">
                        <b-col col>
                            <h5>Upload avatar</h5>
                        </b-col>
                    </b-row>

                    <div class="mb-5">
                        <croppa v-model="myCroppa"
                                :width="300"
                                :height="300"
                                :canvas-color="'#eeedee'"
                                :accept="'image/*'"
                                :file-size-limit="2097152"
                                @file-choose="handleCroppaFileChoose"
                        ></croppa>
                    </div>

                    <div class="mb-5">
                        <b-button type="submit" variant="primary" @click="uploadCroppedImage">Upload</b-button>
                    </div>

                </b-col>
            </b-row>

        </b-container>
    </section>
</template>

<script>

export default {
    name: "Form",
    data: function () {
        return {
            myCroppa: {},
            selectedFile: null,
        }
    },
    methods: {
        handleCroppaFileChoose: function (event) {
            this.selectedFile = event.name;
        },

        uploadCroppedImage() {
            if (!this.myCroppa.hasImage()) {
                this.globalNotification('error', 'Please select an avatar to upload')
                return
            }

            this.myCroppa.generateBlob(
                blob => {
                    const fd = new FormData();
                    fd.append('avatar', blob, this.selectedFile);
                    const config = {headers: {'Content-Type': 'multipart/form-data'}};
                    this.axios.post(`api/clients/${this.$route.params.id}/avatar`, fd, config)
                        .then(response => {
                            this.globalNotification('success', response.data.message)
                            this.$router.push({name: 'admin.clients'});
                        })
                        .catch(error => {
                            this.globalNotification('error', error.response.data.message)
                        });
                },
                'image/jpeg',
                0.8
            );
        }
    },
}
</script>

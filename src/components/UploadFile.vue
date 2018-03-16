<template>
  <div class="vue-base64-file-upload">
    <img
      v-show="previewImage && !disablePreview"
      :src="previewImage"
      :class="imageClass" />
    <div class="vue-base64-file-upload-wrapper" :style="wrapperStyles">
      <input
        type="file"
        @change="onChange"
        :style="fileInputStyles"
        :accept=accept />
      <input
        type="text"
        :class="inputClass"
        :style="textInputStyles"
        :value="fileName || file && file.name"
        :placeholder="placeholder"
        disabled />
    </div>
  </div>

</template>
<script>
  export default {
    name: 'vue-upload-file',
    props: {
      imageClass: {
        type: String,
        default: ''
      },
      inputClass: {
        type: String,
        default: ''
      },
      accept: {
        type: String,
        default: 'image/png,image/gif,image/jpeg'
      },
      maxSize: {
        type: Number,
        default: 10 // megabytes
      },
      disablePreview: {
        type: Boolean,
        default: false
      },
      fileName: {
        type: String,
        default: ''
      },
      placeholder: {
        type: String,
        default: 'Click here to upload image'
      },
      defaultPreview: {
        type: String,
        default: ''
      }
    },

    data: function data() {
      return {
        file: null,
        preview: null,
        visiblePreview: false
      };
    },


    computed: {
      wrapperStyles: function wrapperStyles() {
        return {
          'position': 'relative',
          'width': '100%'
        };
      },
      fileInputStyles: function fileInputStyles() {
        return {
          'width': '100%',
          'position': 'absolute',
          'top': 0,
          'left': 0,
          'right': 0,
          'bottom': 0,
          'opacity': 0,
          'overflow': 'hidden',
          'outline': 'none',
          'cursor': 'pointer'
        };
      },
      textInputStyles: function textInputStyles() {
        return {
          'width': '100%',
          'cursor': 'pointer'
        };
      },
      previewImage: function previewImage() {
        return this.preview || this.defaultPreview;
      }
    },

    methods: {
      onChange: function onChange (event) {
        let vm = this;
        this.file = event.target.files[0];
        console.log(this.file);
        event.preventDefault();
        let formData = new FormData();

        formData.append('file', this.file);

        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }

        this.$http.post('/upload', formData, config).then(function (res) {
          if(res.data.data.imgUrl){
            vm.preview = res.data.data.imgUrl;
            vm.$emit('load', res.data.data.imgUrl);
          }
        })
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .v1-input {
    display: block;
    padding-top: 20px;
    border-bottom: 2px solid #39D2B4;
    font-size: 1em;
    transition: all .4s;
    cursor: pointer;
  }
</style>

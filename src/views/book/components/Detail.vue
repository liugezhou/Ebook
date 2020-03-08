<template>
  <el-form ref="postForm" :model="postForm">
    <sticky :class-name="'sub-navbar ' + postForm.status">
      <el-button v-if="!isEdit" @click="showGuide">显示帮助</el-button>
      <el-button
        v-loading="loading"
        type="success"
        style="margin-left:10px"
        @click="submitForm"
      >{{isEdit ? '编辑电子书': '新增电子书'}}</el-button>
    </sticky>
    <div class="detai-container">
      <el-row>
        <Waring />
        <el-col :span="24">
          <ebook-upload
            :file-list="fileList"
            :disabled="isEdit"
            @onSuccess="onUploadSuccess"
            @onRemove="onUploadRemove"
          />
        </el-col>
        <el-col :span="24">
          <el-form-item prop="title">
            <MDinput v-model="postForm.title" :maxlength="100" name="name" require>书名</MDinput>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="作者：" :label-width="labelWidth">
                <el-input v-model="postForm.author" placeholder="作者"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="出版社" :label-width="labelWidth">
                <el-input v-model="postForm.publisher" placeholder="出版社"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="语言:" :label-width="labelWidth">
                <el-input v-model="postForm.language" placeholder="语言"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="根文件:" :label-width="labelWidth">
                <el-input v-model="postForm.rootfile" placeholder="根文件" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="文件路径:" :label-width="labelWidth">
                <el-input v-model="postForm.fileroot" placeholder="文件路径" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="解压路径:" :label-width="labelWidth">
                <el-input v-model="postForm.jieyafile" placeholder="解压路径" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="封面路径:" :label-width="labelWidth">
                <el-input v-model="postForm.fileroot" placeholder="封面路径" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="文件名称:" :label-width="labelWidth">
                <el-input v-model="postForm.jieyafile" placeholder="文件名称" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="封面：" :label-width="labelWidth">
                <a v-if="postForm.cover" :href="postForm.cover" target="_blank">
                  <img :src="postForm.cover" class="preview-img" />
                </a>
                <span v-else>无</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="目录：" :label-width="labelWidth">
                <div
                  v-if="postForm.contents && postForm.contents.length > 0"
                  class="contents-wrapper"
                >
                  <el-tree></el-tree>
                </div>
                <span v-else>无</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </el-form>
</template>

<script>
import Sticky from "../../../components/Sticky";
import MDinput from "../../../components/MDinput";
import EbookUpload from "../../../components/EbookUpload";
import Waring from "./Warning";
export default {
  data() {
    return {
      loading: false,
      postForm: {
        status: "draft",
        title: "",
        author: "",
        publisher: "",
        cover: ""
      },
      fileList: [],
      labelWidth: "120px"
    };
  },
  props: {
    isEdit: Boolean
  },
  components: {
    Sticky,
    Waring,
    EbookUpload,
    MDinput
  },
  methods: {
    showGuide() {
      alert("guide");
    },
    submitForm() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    },
    onUploadSuccess() {},
    onUploadRemove() {}
  }
};
</script>

<style lang="scss" scoped>
.detai-container {
  padding: 40px 50px 20px;
}
.preview-img {
  width: 200px;
  height: 270px;
}
</style>

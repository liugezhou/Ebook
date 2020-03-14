<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.title"
        placeholder="书名"
        style="width:200px"
        class="filter-item"
        clearable
        @blur="handleFilter"
        @keyup.enter.native="handleFilter"
        @clear="handleFilter"
      />
      <el-input
        v-model="listQuery.author"
        placeholder="作者"
        style="width:200px"
        class="filter-item"
        clearable
        @blur="handleFilter"
        @keyup.enter.native="handleFilter"
        @clear="handleFilter"
      />
      <el-select
        v-model="listQuery.category"
        placeholder="分类"
        class="filter-item"
        clearable
        @change="handleFilter"
      >
        <el-option
          v-for="item in categoryList"
          :key="item.value"
          :label="item.label+'('+item.num+')'"
          :value="item.value"
        />
      </el-select>
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        style="margin-left:10px"
        @click="handleFilter"
      >
        查询
      </el-button>
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-edit"
        style="margin-left:5px"
        @click="handleCreate"
      >
        新增
      </el-button>
      <el-checkbox
        v-model="showCover"
        class="filter-item"
        style="margin-left:5px"
        @click="changeShowCover"
      >
        显示封面
      </el-checkbox>
    </div>
    <el-table
      :key="tablekey"
      v-loading="isLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width:100%"
      @sort-change="sortChange"
    >
      <el-table-column
        lable="ID"
        prop="id"
        sortable="custom"
        align="center"
        width="80"
      />
      <el-table-column
        label="书名"
        width="150"
        align="center"
      >
        <template slot-scope="{ row: { titleWrapper }}">
          <span v-html="titleWrapper" />
        </template>
      </el-table-column>
      <el-table-column
        label="作者"
        width="150"
        align="center"
      >
        <template slot-scope="{ row: { authorWrapper }}">
          <span v-html="authorWrapper" />
        </template>
      </el-table-column>
      <el-table-column
        label="出版社"
        width="150"
        align="center"
      >
        <template slot-scope="{ row: { publisher }}">
          <span>{{ publisher }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="分类"
        width="150"
        align="center"
      >
        <template slot-scope="{ row: { categoryText }}">
          <span>{{ categoryText }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="语言"
        align="center"
        width="100"
      >
        <template slot-scope="{ row: { language }}">
          <span>{{ language }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="showCover"
        label="封面"
        align="center"
        width="150"
      >
        <template slot-scope="{row:{cover}}">
          <a :href="cover" target="_blank">
            <img :src="cover" style="width:120px;height:180px;">
          </a>
        </template>
      </el-table-column>
      <el-table-column
        label="文件名"
        width="100"
        align="center"
      >
        <template slot-scope="{ row: { fileName }}">
          <span>{{ fileName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="文件路径"
        width="100"
        align="center"
      >
        <template slot-scope="{ row: { filePath }}">
          <span>{{ filePath }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="封面路径"
        width="100"
        align="center"
      >
        <template slot-scope="{ row: { coverPath }}">
          <span>{{ coverPath }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="解压路径"
        width="100"
        align="center"
      >
        <template slot-scope="{ row: { unzipPath }}">
          <span>{{ unzipPath }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="上传人"
        width="100"
        align="center"
      >
        <template slot-scope="{ row: { creatUser }}">
          <span>{{ creatUser }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="上传时间"
        width="100"
        align="center"
      >
        <template slot-scope="{ row: { createDt }}">
          <span>{{ createDt }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="120"
        align="center"
        fixed="right"
      >
        <template slot-scope="{ row }">
          <el-button
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(row)"
          />
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :total="0"
    />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination/index'
import waves from '@/directive/waves/waves'
import { getcategory, listBook } from '@/api/book'
export default {
  components: {
    Pagination
  },
  directives: {
    waves
  },
  data() {
    return {
      listQuery: {},
      showCover: false,
      categoryList: [],
      tablekey: 0,
      isLoading: false,
      list: []
    }
  },
  mounted() {
    this.getList()
    this.getcategoryList()
  },
  created() {
    this.parseQuery()
  },
  methods: {
    parseQuery() {
      const listQuery = {
        page: 1,
        pageSize: 20,
        sort: '+id'
      }
      this.listQuery = { ...listQuery, ...this.listQuery }
    },
    wrapperKeyWord(k, v) {
      function highligh(value) {
        return `<span style="color:#1890ff">${value}</span>`
      }
      if (!this.listQuery[k]) {
        return v
      } else {
        return v.replace(new RegExp(this.listQuery[k], 'ig'), v => highligh(v))
      }
    },
    getList() {
      this.isLoading = true
      listBook(this.listQuery).then(res => {
        const { list } = res.data
        this.list = list
        this.isLoading = false
        this.list.forEach(book => {
          book.titleWrapper = this.wrapperKeyWord('title', book.title)
          book.authorWrapper = this.wrapperKeyWord('author', book.author)
        })
      })
    },
    sortChange(data) {
      const { prop, order } = data
      this.sortby(prop, order)
    },
    sortby(prop, order) {
      if (order === 'ascending') {
        this.listQuery.sort = `+${prop}`
      } else {
        this.listQuery.sort = `-${prop}`
      }
      this.handleFilter()
    },
    getcategoryList() {
      getcategory().then(res => {
        this.categoryList = res.data
      })
    },
    handleFilter(e) {
      this.getList()
    },
    handleUpdate(row) {
      this.$router.push(`/book/edit/${row.fileName}`)
    },
    handleCreate() {
      this.$router.push('/book/create')
    },
    changeShowCover(value) {
      this.showCover = value
    }
  }
}
</script>
<style lang="scss" scoped>

</style>

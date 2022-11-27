<template>
  <div class="pagination">
    <!-- 上一页 -->
    <button :disabled="pageNo == 1" @click="$emit('getPage', pageNo - 1)">
      上一页
    </button>
    <!-- 第1页 -->
    <button
      v-if="startAndEnd.start > 1"
      @click="$emit('getPage', 1)"
      :class="{ active: pageNo == 1 }"
    >
      1
    </button>
    <button v-if="startAndEnd.start > 2">···</button>

    <!-- 此处报错不影响编译，只是基本规范检查 -->
    <button
      v-for="(page, index) in startAndEnd.end"
      :key="index"
      v-if="page >= startAndEnd.start"
      @click="$emit('getPage', page)"
      :class="{ active: pageNo == page }"
    >
      {{ page }}
    </button>

    <button v-if="startAndEnd.end < totalPage - 1">···</button>
    <!-- 最后一页 -->
    <button
      v-if="startAndEnd.end < totalPage"
      @click="$emit('getPage', totalPage)"
      :class="{ active: pageNo == totalPage }"
    >
      {{ totalPage }}
    </button>
    <!-- 下一页 -->
    <button
      :disabled="pageNo == totalPage"
      @click="$emit('getPage', pageNo + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
    <!-- <h1>
      start-{{ startAndEnd.start }}---end-{{ startAndEnd.end }}--当前是{{
        pageNo
      }}
    </h1> -->
  </div>
</template>

<script>
export default {
  props: ["pageNo", "pageSize", "total", "continue"],
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    startAndEnd() {
      //计算中间连续展示页数的起始和结束
      let start = -1;
      let end = -1;
      if (this.totalPage < this.continue) {
        //如果总页数比要连续展示的页数少
        start = 1;
        end = this.totalPage;
      } else {
        start = this.pageNo - Math.trunc(this.continue / 2);
        end = this.pageNo + Math.trunc(this.continue / 2);
        if (start < 1) {
          //页数起始要从1开始
          start = 1;
          end = this.continue;
        }
        if (end > this.totalPage) {
          //页数不能超过总页数
          start = this.totalPage - this.continue + 1;
          end = this.totalPage;
        }
      }
      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  .active {
    background-color: #409eff;
  }
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>

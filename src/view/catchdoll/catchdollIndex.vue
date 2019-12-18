<template>
<div class="scroll-wrapper" style="width:100px;height:100px">
    <span>awesome</span>
    <span>awesome</span>
    <span>awesome</span>
    <span>awesome</span>
    <span>awesome</span>
    </div>
</template>
<script>

</script>
<style>
    /* 横向滚动容器 */
.scroll-wrapper {
    width: 100%;
    overflow-x: auto;
    height: 22px;
    white-space: nowrap;
    display: flex;
    -webkit-overflow-scrolling: touch;
    scrollbar-face-color:green;
  /*上下按钮上三角箭头的颜色*/
scrollbar-arrow-color:green;
 /*滚动条空白部分的颜色*/
scrollbar-highlight-color:green;
  /*立体滚动条亮边的颜色（设置滚动条的颜色）*/
scrollbar-3dlight-color:green;
   /*立体滚动条阴影的颜色*/
scrollbar-shadow-color:green;
 /*立体滚动条强阴影的颜色*/
scrollbar-darkshadow-color:green;
    /*为滚动条底板颜色设定；*/
scrollbar-track-color:#1c6497;
 /*滚动条的基本颜色*/
scrollbar-base-color:#1c6497;
}
.scroll-wrapper span {
    display: block;
    padding: 0 4px;
    margin: 0 10px;
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    border: 1px solid #3884ff;
    border-radius: 20px;
    color: #3884ff;
}
/* 滚动条最外面轨道样式 :: 前面保留一个空格*/
.scroll-wrapper ::-webkit-scrollbar {
    width: 2px; /* 对纵向滚动条起作用*/
    height: 2px; /* 对横向滚动条起作用*/
    background: green;
    display: none; /* 不显示滚动条 */
}

/* 滚动条最外面滑块样式 :: 前面保留一个空格*/
.scroll-wrapper ::-webkit-scrollbar-thumb {
    background: pink;
    border-radius: 2px;
    width: 2px; /* 对纵向滚动条起作用*/
    height: 2px; /* 对横向滚动条起作用*/
}
</style>
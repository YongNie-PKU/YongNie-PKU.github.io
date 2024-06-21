var map, infoWindow;
// 初始化地图函数
/*function initMap() {*/
// 创建地图实例
map = new AMap.Map('map', {
    center: [116.310716, 39.99188], // 设置地图中心点为北京大学未名湖
    zoom: 16 // 设置地图缩放级别
});

// 创建信息窗口
infoWindow = new AMap.InfoWindow({
    isCustom: true,  // 使用自定义窗体
    offset: new AMap.Pixel(0, -30)
});
// 添加兴趣点标记到地图
addMarkersToMap(map, interestPoints);
// 添加缩放控件
AMap.plugin(['AMap.ToolBar'], function () {
    map.addControl(new AMap.ToolBar());
});
// 点击地图关闭信息窗口
map.on('click', function () {
    infoWindow.close();
});


// 添加标记到地图函数
function addMarkersToMap(map, points) {
    points.forEach(point => {
        const marker = new AMap.Marker({
            position: new AMap.LngLat(point.longitude, point.latitude),
            icon: new AMap.Icon({
                size: new AMap.Size(16, 24),  // 图标大小
                image: 'https://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',  // 图标图片路径
                imageSize: new AMap.Size(16, 24)
            }),
            map: map
        });
        // 创建信息窗口内容
        const content = `<div class="info-window">
                          <div class="info-window-header">
                            <h3>${point.description}</h3>
                            <p>样品编号：${point.ID}，样品类型：${point.type}，采样时间：${point.date}，拍摄时间：${point.phototime}</p>
                            </div>  
                           <div class="info-window-images">
        <div class="image-container">
            <img id="image1" src=${point.photo}>
        </div>
        <div class="image-separator"></div> <!-- 隔离栏 -->
        <div class="image-container">
            <img id="image2" src=${point.imgp}>
        </div>
    </div>
    <div class="info-window-buttons">
        <button id="btnPhylum">Phylum</button>
        <button id="btnClass">Class</button>
        <button id="btnOrder">Order</button>
        <button id="btnFamily">Family</button>
        <button id="btnGenus">Genus</button>
    </div>
    </div>
                                                                                               
                        </div>`;
        // 点击标记显示信息窗口
        marker.on('click', function () {
            infoWindow.setContent(content);
            infoWindow.open(map, marker.getPosition());
            // 获取图片元素
            const image2 = document.getElementById('image2');
            // 获取按钮元素
            const btnPhylum = document.getElementById('btnPhylum');
            const btnClass = document.getElementById('btnClass');
            const btnOrder = document.getElementById('btnOrder');
            const btnFamily = document.getElementById('btnFamily');
            const btnGenus = document.getElementById('btnGenus');
            // 设置按钮点击事件处理程序
            btnPhylum.addEventListener('click', function () {
                image2.src = point.imgp; // 替换为实际的图片路径
            });
            btnClass.addEventListener('click', function () {
                image2.src = point.imgc; // 替换为实际的图片路径
            });
            btnOrder.addEventListener('click', function () {
                image2.src = point.imgo; // 替换为实际的图片路径
            });
            btnFamily.addEventListener('click', function () {
                image2.src = point.imgf; // 替换为实际的图片路径
            });
            btnGenus.addEventListener('click', function () {
                image2.src = point.imgg; // 替换为实际的图片路径
            });
        });
    });
}
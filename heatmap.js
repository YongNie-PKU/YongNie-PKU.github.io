
var heatmap;
map.plugin(["AMap.HeatMap"], function () {
    heatmap = new AMap.HeatMap(map, {
        radius: 80, // Set the radius of heatmap points
        opacity: [0, 0.8] // Set the opacity range
    });


    // Function to update the heatmap
    window.updateHeatmap = function (species) {
        const data = speciesAbundance[species].map(point => ({
            lng: point.location[0],
            lat: point.location[1],
            count: point.abundance
        }));
        heatmap.setDataSet({
            data: data,

        });
    }
});

const parentElement = document.getElementById('sidebar');

parentElement.addEventListener('click', function (event) {
    document.querySelectorAll('.buttontheom').forEach(function (button) {
        button.addEventListener('click', function () {
            // 获取按钮的 value 值
            var species = this.value;
            console.log('Clicked button value:', species);
            updateHeatmap(species);
        });
    });
}
);
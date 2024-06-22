
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

document.addEventListener('DOMContentLoaded', function () {
    // Ensure the DOM is fully loaded before adding event listeners
    document.getElementById('sidebar').addEventListener('click', function (event) {
        if (event.target && event.target.classList.contains('buttontheom')) {
            var species = event.target.value;
            console.log('Clicked button value:', species);
            updateHeatmap(species);
            displaySpeciesText(species);
        }
    });
});

function displaySpeciesText(species) {
    var speciesInfo = document.getElementById('species-info');
    console.log('Species info container:', speciesInfo);
    if (speciesInfo) {
        // Clear previous content
        speciesInfo.textContent = '';

        // 创建一个新的段落元素以显示 species 信息
        var speciesText = document.createElement('p');
        speciesText.innerHTML = 'Selected species: <span class="italic-text">' + species + '</span>';


        // 追加新的文字内容
        speciesInfo.appendChild(speciesText);
        console.log('Species text appended:', speciesText);
    }
}

function updateHeatmap(species) {
    // 更新热图的逻辑
    console.log('Updating heatmap for species:', species);
}
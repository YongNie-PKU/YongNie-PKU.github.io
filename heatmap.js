
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
        }
    });
});
function toggleSnowMode() {
    var container = document.getElementById('container');
    container.classList.toggle('snow-mode');
    var body = document.body;
    body.classList.toggle('snow-mode');

    
    setTimeout(function () {
        
        var links = document.querySelectorAll('.center-container a');
        var isSnowMode = body.classList.contains('snow-mode');
        links.forEach(function (link) {
            link.style.color = isSnowMode ? 'black' : 'snow';
        });
    }, 100); 
}
var labelType, useGradients, nativeTextSupport, animate;

(function() {
  var ua = navigator.userAgent,
      iStuff = ua.match(/iPhone/i) || ua.match(/iPad/i),
      typeOfCanvas = typeof HTMLCanvasElement,
      nativeCanvasSupport = (typeOfCanvas == 'object' || typeOfCanvas == 'function'),
      textSupport = nativeCanvasSupport
        && (typeof document.createElement('canvas').getContext('2d').fillText == 'function');
  //I'm setting this based on the fact that ExCanvas provides text support for IE
  //and that as of today iPhone/iPad current text support is lame
  labelType = (!nativeCanvasSupport || (textSupport && !iStuff))? 'Native' : 'HTML';
  nativeTextSupport = labelType == 'Native';
  useGradients = nativeCanvasSupport;
  animate = !(iStuff || !nativeCanvasSupport);
})();

var Log = {
  elem: false,
  write: function(text){
    if (!this.elem) this.elem = document.getElementById('log');
    this.elem.innerHTML = text;
    //this.elem.style.left = (500 - this.elem.offsetWidth / 2) + 'px';
  }
};


function init(){
  //init data
  var json = {
    "children": [
       {
         "children": [],
         "data": {
           "description": "content",
           "$color": "#AEA9F8",
           "days": 2,
           "$angularWidth": 1,
           "size": 1
         },
         "id": "Source/Yslygi",
         "name": "Yslygi"
       },
       {
         "children": [],
         "data": {
           "description": "content",
           "$color": "#AEA9F8",
           "days": 3,
           "$angularWidth": 1,
           "size": 1
         },
         "id": "Source/Core",
         "name": "Tovari"
       },
       {
         "children": [],
         "data": {
           "description": "content",
           "$color": "#AEA9F8",
           "days": 1,
           "$angularWidth": 1,
           "size": 1
         },
         "id": "Source/Extras",
         "name": "Gosyslygi"
       },
       {
         "children": [],
         "data": {
           "description": "Animated TreeMaps",
           "$color": "#B2ABF4",
           "days": 3,
           "$angularWidth": 1,
           "size": 1
         },
         "id": "Source/Graph",
         "name": "Obrazovanie"
       },
       {
         "children": [],
         "data": {
           "description": "Animated TreeMaps",
           "$color": "#B2ABF4",
           "days": 3,
           "$angularWidth": 1,
           "size": 1
         },
         "id": "Source/Layouts",
         "name": "Layouts"
       }
     ],
     "data": {
       "$type": "none"
     },
     "id": "Source",
     "name": "Source"
   };
    //end
    //init Sunburst
    var sb = new $jit.Sunburst({
        //id container for the visualization
        injectInto: 'infovis',
        //Distance between levels
        levelDistance: 80,
        //Change node and edge styles such as
        //color, width and dimensions.
        Node: {
          overridable: true,
          type: useGradients ? 'gradient-multipie' : 'multipie'
        },
        //Select canvas labels
        //'HTML', 'SVG' and 'Native' are possible options
        Label: {
          type: labelType
        },
        //Change styles when hovering and clicking nodes
        NodeStyles: {
          enable: true,
          type: 'Native',
          stylesClick: {
            dim: 30,
            'color': '#1aa586'
          },
          stylesHover: {
            dim: 30,
            'color': '#76bf94'
          }
        },
        //Add tooltips
        Tips: {
          enable: true,
          onShow: function(tip, node) {
          }
        },
        //implement event handlers
        Events: {
          enable: true,
          onClick: function(node) {
            if(!node) return;
            //Build detailed information about the file/folder
            //and place it in the right column.
            var html = "<h4>" + node.name + "</h4>", data = node.data;
            if("days" in data) {
              html += "<b>Last modified:</b> " + data.days + " days ago";
            }
            if("size" in data) {
              html += "<br /><br /><b>File size:</b> " + Math.round(data.size / 1024) + "KB";
            }
            if("description" in data) {
              html += "<br /><br /><b>Last commit was:</b><br /><pre>" + data.description + "</pre>";
            }
            $jit.id('inner-details').innerHTML = html;
            //hide tip
            sb.tips.hide();
            //rotate
            sb.rotate(node, animate? 'animate' : 'replot', {
              duration: 1000,
              transition: $jit.Trans.Quart.easeInOut
            });
          },
        },

   });
    //load JSON data.
    sb.loadJSON(json);
    //compute positions and plot.
    sb.refresh();
    //end
}

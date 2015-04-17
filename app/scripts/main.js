var labelType, useGradients, nativeTextSupport, animate;
/*


Требования к визуализации навигационного меню

Внешний вид и смена приведены в видеофайле и в векторном файле

1.Текст
Основой шрифт названий разделов -  Open Sans Light,   цвет rgb(90, 93, 90),
Шрифт активного выбранного раздела -  Open Sans Regular цвет rgb(255, 255, 255),
Выравнивание всех текстов центральное как по вертикали так и по горизонтали
Максимальное количество текстовых символов
1-й уровень – одна строка 15 символов
2-й уровень – максимально 2 строки по 11 символов
3-й уровень - максимально 3 строки по 15 символов
  Размеры шрифтов 15 px межстрочные интервалы 15 px
Смена активного раздела присходит через изменение прозрачности длитильность затухания и появления около 0,15 сек.
При смене фокуса происходит изменение прозрачности на 25%
При выборе раздела в случае, если он не выбирался ранее, следующий уровень занимает центральную позицию относительно линии выбора, и в нем нет перевыбранного раздела, в случае если это второй уровень, третитий уровень не отображаеться.
  При смене подуровня второй уровень вращаеться по часовой стрелке, третий против часовой.
Смена цветов интерфейса 1-го уровня происходит по цветовому кругу путем смещения параметра HUE на количество градусов равное разнице секторов.  Время смены цветов около 0.15 сек. 2-й и 3-й уровеь меняються вращеним старые скрываються, новые появляться из за границ экранной области.
Все автоматические движения происходят с синусоидальным ускорением и замедлением.


*/

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

 console.log($jit.util.extend({b: 11}, {a: 231}))



  var json = { //json tree structure.
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
    $jit.json.eachLevel(json, 0, 3, function(node, depth) {
    console.log(node.id + ' ' + depth);
});

    //init Sunburst
    window.sb = new $jit.Sunburst({
        //id container for the visualization
        injectInto: 'infovis',
        //Distance between levels
        levelDistance: 80,
        //Change node and edge styles such as
        //color, width and dimensions.

        Node: {
          overridable: true,
          type: useGradients ? 'gradient-multipie' : 'multipie',
        },

        Fx: {
          fps:40,
          duration: 2500,
          transition: $jit.Trans.Quart.easeInOut,
          clearCanvas: true
        },
        /**/

        //Select canvas labels
        //'HTML', 'SVG' and 'Native' are possible options
        Label: {
          type: labelType,
          overridable: false,
          style: ' ',
          size: 10,
          family: 'sans-serif',
          textBaseline: 'alphabetic',
          color: '#fff'
        },

        Navigation: {
          enable: true,
          panning: 'avoid nodes',
          zooming: 20
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
            'color': '#ff0000'
          },
          duration: 600
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
            //sb.tips.hide();
            //rotate

            sb.rotate(node, animate? 'animate' : 'replot', {
              duration: 1000,
              transition: $jit.Trans.Quart.easeInOut
            });

            /*


            */
          },
          onMouseEnter: function(node, eventInfo, e) {
            sb.canvas.getElement().style.cursor = 'pointer';

          },
          onMouseLeave: function(node, eventInfo, e) {
            sb.canvas.getElement().style.cursor = '';
            console.log('onMouseLeave');
          }


        },

        //controllers
        onBeforePlotNode: function(node) {
        },
        onBeforePlotLine: function(adj) {
          if(adj.nodeFrom.selected && adj.nodeTo.selected) {
            adj.setData('color', 'pink');
          } else {
            adj.removeData('color');
          }
        },
        onAfterCompute: function() {
          alert("computed!");
        }




   });
    //load JSON data.
    sb.loadJSON(json);
    //compute positions and plot.
    sb.refresh();
    //end
}

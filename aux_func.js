let table;
let i = 0;
const pauses = {};

function getXCoords(table) {
    xCoords = [];
    table.rows.forEach(element => {
      coordX= element.obj['data.clientX'];
      xCoords.push(coordX * scale);
    });
    return xCoords;
  }
  
function getYCoords() {
yCoords = [];
table.rows.forEach(element => {
    coordY= element.obj['data.clientY'];
    yCoords.push(coordY * scale);
    });
return yCoords;
}
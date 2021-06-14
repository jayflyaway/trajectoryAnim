examsID = 'exam-601d5be24e69e84e6e3eeccf';

function preload() {
  itemIDs = loadStrings('assets/' + examsID + '/item_id_list.txt');
  testeeIDs = loadStrings('assets/' + examsID + '/testees_id_list.txt');
  table = loadTable('/data/exam-601d5be24e69e84e6e3eeccf/mouse_pos_items/601d5c9c4e69e84e6e3eecd0/testee-601d5ee8db74b14e5525d85a_interactions.csv', 'csv', 'header');
}

function setup() {
  scale = 0.5

  sel_exam = createSelect()
  sel_exam.option(examsID)
  
  sel_user = createSelect()
  testeeIDs.forEach(element => {
    sel_user.option(element);
  });
  
  sel_item = createSelect();
  itemIDs.forEach(element => {
    sel_item.option(element);
  });
  
  sel_item.changed(changeSelection);
  sel_user.changed(changeSelection);
  
  
  sel_exam.parent("settings_selects")
  sel_item.parent("settings_selects")
  sel_user.parent("settings_selects")

  counter_pause = 0

  let xCoords = getXCoords(table);
  let yCoords = getYCoords(table);
  screenWidth = table.rows[0].obj['data.screenWidth'];
  screenHeight = table.rows[0].obj['data.screenHeight'];
  // screenHeight = table.rows[0].obj['data.clientY'] / table.rows[0].obj['data.clientY_norm'];
  canvas  = createCanvas(screenWidth*scale, screenHeight*scale);
  noStroke();
  rect(0, 0, screenWidth*scale, screenHeight*scale);
  fr = 20
  frameRate(fr);
  canvas.parent("canvas")
}

function draw() {
  if(i < xCoords.length-1) {
    i ++;
    if(table.rows[i].obj['data.isClicking'] == 1) {
      fill('red');
      console.log('click')
      circle(xCoords[i], yCoords[i], 5);
    }
    stroke(0, 0, 0);
    line(xCoords[i-1], yCoords[i-1], xCoords[i], yCoords[i]);
    if(xCoords[i-1] == xCoords[i] && yCoords[i-1] == yCoords[i]) {
      counter_pause ++;
    } else {
      if (counter_pause > 40) {
        console.log('took ' + counter_pause/fr + 2 + ' s')
      }
      counter_pause = 0
    }
    // with a frame rate of 20, this should be no movement in 2 seconds 
    if (counter_pause > 40) {
      console.log('thinking break');
    }
    
  }else {
    console.log('finished')
    noLoop();
  }
}

function changeSelection() {
  stop();
  console. clear()
  loadTable('data/' + sel_exam.value() + '/mouse_pos_items/' + sel_item.value() + '/' + sel_user.value() + '.csv', 'csv', 'header', gotData);
}

function gotData(data) {
  stop();
  i = 0;
  table = data;
  xCoords = getXCoords(table);
  yCoords = getYCoords(table);
  screenWidth = table.rows[0].obj['data.screenWidth'];
  screenHeight = table.rows[0].obj['data.screenHeight'];
  canvas  = createCanvas(screenWidth*scale, screenHeight*scale);
  noStroke();
  rect(0, 0, screenWidth*scale, screenHeight*scale);
  canvas.parent("canvas")
  counter_pause = 0
  loop();
  draw();
}


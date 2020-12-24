//Create variables here
var dog, happyDog, database, foodS, foodStock;
function preload() {
  //load images here
  doggo = loadImage("./Dog.png");
  dogHappy = loadImage("./happyDog.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  dog = createSprite(250, 350);
  dog.addImage(doggo);
  dog.scale = 0.3;

  foodStock = 20;
  foodS = 20;

  foodStock = database.ref("Food");
  foodStock.on("value", function (readStock) {
    readstock = database.foodStock;
  });
}

function draw() {
  background(46, 139, 87);

  if (foodS > 0) {
    if (keyWentDown(UP_ARROW)) {
      writeStock(foodS);
      foodS--;
      dog.addImage(dogHappy);
    }
    if (keyWentUp(UP_ARROW)) {
      dog.addImage(doggo);
    }
  }
  drawSprites();

  //add styles here
  textSize(20);
  fill("white");
  text("Food Left:" + foodS, 200, 150);
}

function readStock(database) {
  foodS = database.val();
}

function writeStock(x) {
  database.ref("/").update({
    Food: x,
  });
}

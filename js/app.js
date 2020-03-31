'use strict';
$(document).ready(function() {

  // array for keywords.
  let keyArr = [];
  //////////////////////////////////////////////////////////////
  // Constructor function for the images from JSON
  function Images (pic) {
    this.image_url = pic.image_url;
    this.title = pic.title;
    this.description = pic.description;
    this.keyword = pic.keyword;
    this.horns = pic.horns;
  }
  ///////////////////////////////////////////////////////////////

  // render the unique filter
  Images.prototype.unique = function () {
    if (!keyArr.includes(this.keyword)) {
      keyArr.push(this.keyword);
      let cloneSelect = $('option:first').clone();
      cloneSelect.attr('value',this.keyword);
      cloneSelect.text(this.keyword);
      $('select').append(cloneSelect);
    }
  };
  ///////////////////////////////////////////////////////////

  // render the cloned images properities.

  Images.prototype.render = function() {
    let $imgCLone = $('#photo-template').clone();
    $('#photo-template section').remove();
    $imgCLone.find('h2').text(this.title);
    $imgCLone.find('img').attr('src',this.image_url);
    $imgCLone.removeAttr('id');
    $imgCLone.find('p').text(this.description);
    $imgCLone.attr('class', `${this.keyword} visiblity`);
    $('main').append($imgCLone);
  };

  /////////////////////////////////////////////////////////

  // TO GET THE INFO INSIDE JSON FILE
  const getJson = function(){
    $.ajax('./data/page-1.json', {method: 'get', dataType: 'JSON'}).then(data => {
      console.log(data);
      data.forEach(value => {
        let finalPic = new Images(value);

        finalPic.render();
        finalPic.unique();
      });
    });
  };
  getJson();

  ////////////////////////////////////////////////////////
  //Event listener for the filter
  $('select').on('change', function(){
    $('section').removeClass('visiblity');
    let $buttonScroll = $('select option:selected').val();
    $(`[class*=${$buttonScroll}]`).addClass('visiblity');
  });
});







//////////////////////////////////////////////////////////////////////////////////////////////

//faild attempt here. need to ask TA for it.


// $(document).ready(function() {
//   var imagesArr = [];
//   var selectPic = [];
//   // creating an array to push the keyword into.
//   //////////////////////////
//   function Images (pic) { //constructor
//     this.title = pic.title;
//     this.image_url = pic.image_url;
//     this.keyword = pic.keyword;
//     this.horns = pic.horns;
//     this.description = pic.discription;
//     imagesArr.push(this);
//   }
//   ///////////////////////////////////////////////
//   Images.prototype.renderOption = function(){
//     let picOption = $('<option></option>').text(this.title);
//     picOption.attr('value', this.keyword);
//     $('select').append(picOption);
//   };
//   ////////////////////////////////////////////////
//   $('select').on('change', function() {
//     var selectImg = this.value;
//     for(let i = 0 ; i < imagesArr.length ; i++){
//       if (imagesArr[i].keyword === selectImg){
//         selectPic.push(imagesArr[i]);
//       }
//     }
//     pic.render();
//   }
//   );

//   ///////////////////////////////////////////////
//   Images.prototype.render = function() {
//     let $picClone = $('#photo-template').clone();
//     $picClone.find('h2').text(this.title);
//     $picClone.find('img').attr('src',this.image_url);
//     $picClone.find('p#p1').text(this.discription);
//     $picClone.find('p#p2').text(`horns: ${this.horns}`);
//     $picClone.removeAttr('id');
//     $picClone.attr('id', this.keyword);
//     $('main').append($picClone);
//   };
//   //////////////////////////////////////////////////
//   const readJson = () => {
//     $.ajax('Data/page-1.json', {method: 'GET', dataType: 'JSON'})
//       .then(data => {
//         data.forEach(value =>{
//           let pic = new Images(value);

//           pic.render();
//           pic.renderOption();

//         });
//       });
//   };
//   readJson();
// });
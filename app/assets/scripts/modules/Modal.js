import $ from "jquery";
class Modal {
  constructor() {
     this.openModalBtn = $('.open-modal');
     this.modal = $(".modal");
     this.closeModalBtn = $(".modal__close");
     this.events();
  }
events(){
  //clicking the open modal _btn
  this.openModalBtn.click(this.openModal.bind(this));
  //clicking the close modal _btn
this.closeModalBtn.click(this.closeModal.bind(this));
  //push the any key key
  $(document).keyup(this.keyPressedHandler.bind(this));
}
keyPressedHandler(e){
if(e.keyCode == 27){
  this.closeModal();
}
}
  openModal(){
   this.modal.addClass("modal--is-visible");
   return false;
  }
  closeModal(){
    this.modal.removeClass("modal--is-visible");
    return false;
  }
}
export default Modal;

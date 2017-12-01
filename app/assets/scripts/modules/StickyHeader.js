import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';
import  smoothScroll from 'jquery-smooth-scroll';

export default class StickyHeader {
  constructor() {
    this.lazyImages = $(".lazyload");
    this.siteHeader = $(".site-header");
    this.headerTriggerElement = $(".large-hero__title");
    this.pageSections = $(".page-section");
    this.headerLink = $(".primary-nav a");
    this.createHeaderWaypoint();
    this.creatPageSectionWaypoints();
    this.addSmoothScrolling();
    this.refreshWaypoints();
  }
  refreshWaypoints(){
    this.lazyImages.on('load' , function(){
      Waypoint.refreshAll();
    });
  }

addSmoothScrolling(){
  this.headerLink.smoothScroll();
}

  createHeaderWaypoint() {
    var that = this;
    new Waypoint({
      element: this.headerTriggerElement[0],
      handler: function(direction) {
        if (direction == "down") {
          that.siteHeader.addClass("site-header--dark");
        } else {
          that.siteHeader.removeClass("site-header--dark");
        }
      }
    });
  }
  creatPageSectionWaypoints(){
    var that = this;
    this.pageSections.each(function() {
       var currentPageSection = this;
      new Waypoint({
        element: currentPageSection ,
        handler: function(direction){
          if(direction == 'down'){
            var mathingHeaderLink = currentPageSection.getAttribute("data-maching-link");
             that.headerLink.removeClass('is-current-link');
            $(mathingHeaderLink).addClass('is-current-link');
          }
        },
        offset:'18%'
      });
      new Waypoint({
        element: currentPageSection ,
        handler: function(direction){
          if(direction == 'up'){
            var mathingHeaderLink = currentPageSection.getAttribute("data-maching-link");
             that.headerLink.removeClass('is-current-link');
            $(mathingHeaderLink).addClass('is-current-link');
          }
        },
        offset:'-40%'
      });
    });
  }

}

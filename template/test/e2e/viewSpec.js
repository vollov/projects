'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('my app', function() {

  beforeEach(function() {
    browser().navigateTo('/');
  });


  it('should automatically redirect to /view1 when location hash/fragment is empty', function() {
	  //dump(browser().location().path());
    expect(browser().location().path()).toBe("/view1");
  });


  describe('view1', function() {

    beforeEach(function() {
      browser().navigateTo('/view1');
    });


    it('should render view1 when user navigates to /view1', function() {
    	//dump(element('[ng-view] p:first'));
      expect(element('[ng-view] p:first').text()).toMatch(/partial for view 1/);
    });

  });


  describe('view2', function() {

    beforeEach(function() {
      browser().navigateTo('/view2');
    });


    it('should render view2 when user navigates to /view2', function() {
      expect(element('[ng-view] p:first').text()).
        toMatch(/partial for view 2/);
    });

  });
});

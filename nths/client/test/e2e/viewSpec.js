'use strict';

describe('Test views for client', function() {

	beforeEach(function() {
		browser().navigateTo('/');
	});

	it('should automatically redirect to / when location hash/fragment is empty', function() {
		//dump(browser().location().path());
		expect(browser().location().path()).toBe("/");
	});

	describe('Test /products view', function() {
		beforeEach(function() {
			browser().navigateTo('/products');
		});
	
		it('should render about page when user navigates to /products', function() {
			//dump(element('[ng-view] p:first'));
			expect(element('[ui-view] div').text()).toMatch(/This is Product Page/);
		});
	});

//	describe('Test /settings view', function() {
//		beforeEach(function() {
//			browser().navigateTo('/settings');
//		});
//	
//		it('should render about page when user navigates to /settings', function() {
//			//dump(element('[ng-view] p:first'));
//			expect(element('[ng-view] div').text()).toMatch(/This is Settings Page/);
//		});
//	});
});

var globalNavObject = globalNavObject || {};

;(function(globalNavObject, undefined) {
	'use strict';

	var obj = globalNavObject;

	// Private properties
	var homepage,
  covidInfoEnabled,
  covidInfoPage,
	searchDomain,
	searchFormMethod,
	searchPlaceholder,
	searchInputName,
	logoPathDesktop,
	logoPathMobile,
	logoAlt,
	localNavAlwaysClass,
	viewportWidth,
	viewportHeight,
	breakPoints,
	searchInputDesktop,
	searchInputTablet,
	searchFormToggle,
	searchFormTablet,
	searchElement,
	globalNav,
	localNav,
	localNavSource,
	isLocalNavSourceEmpty,
	closeLayer,
	menuStates,
	accordionElements,
	accordionDivElements,
	subNavMenu1,
	html,
	body,
	head,
	lastY,
	viewport,
	globalNavCntr,
	localNavCntr,
	closeButton,
	globalBanner,
	focusedElementBeforeFocus,
	defaultBreakPoints = {
		desktop: 930,
        tablet: 700,
        phone: 290,
		vertical:581
	},
	hiddenElementIndices = [];

	// Options
	var options = {
		isResponsive: false,
		animation: 'fall',
		animationLength: 0.5,
		activeNav: {
			global: false,
			local: false
		},
		isSearchFormActive: false,
		searchEnabled: true,
		searchPreserveParams: true,
		el: null
	};

  // Constants
	var MQUERY = {
		DESKTOP: ' GN-mquery-desktop',
		TABLET: ' GN-mquery-tablet',
		PHONE: ' GN-mquery-phone',
		FULL_WIDTH: ' GN-full-width'
	};

	// new <style> element for dynamic rules
	var sheet = (function() {
		var style = document.createElement('style');
		// WebKit hack :(
		style.appendChild(document.createTextNode(''));
		// Add the <style> element to the page
		document.head.appendChild(style);

		return style.sheet;
}());

// private methods
function addCSSRule(sheet, selector, rules, index) {
	if(!sheet) return;
	var indexLast = index || sheet.cssRules.length;

	if('insertRule' in sheet) {
		//console.log(indexLast+":: "+selector + '{' + rules + '}');
		sheet.insertRule(selector + '{' + rules + '}', indexLast);
	} else if('addRule' in sheet) {
		sheet.addRule(selector, rules, indexLast);
	}
}

/**
 * Enables/disables a clickable mask over the viewport that is used to close
* either of the sub navs.
*/
function closeLayerListener() {
	if (options.activeNav.global) {
		closeLayer.addEventListener('click', toggleGlobalNavigation, false);
		// closeLayer.style.zIndex = -11;
	} else {
		closeLayer.removeEventListener('click', toggleGlobalNavigation, false);
		// closeLayer.style.zIndex = 11;
	}

	if (options.activeNav.local) {
		closeLayer.addEventListener('click', toggleLocalNavigation, false);
		// closeLayer.style.zIndex = -11;
	} else {
		closeLayer.removeEventListener('click', toggleLocalNavigation, false);
		// closeLayer.style.zIndex = 11;
	}
}

function createHeader(el) {
	var bodyFirstChild = body.firstElementChild,
	header = document.createElement('nav');

	header.id = 'GN-sub-nav';
	header.innerHTML = '<!-- header:html --><div id="GN-overlay"></div><div id="GN-banner" class="GN-clearfix" role="navigation"><div id="GN-icons-layer" class="GN-clearfix"><button type="button" id="GN-toggle-local-nav" class="' + localNavAlwaysClass + '" role="button" aria-label="Toggle Local Navigation" tabindex="0"><div class="GN-nav-bars"></div></button><div id="GN-logo" class=""><a href="' + homepage + '"><img class="GN-logo-full" src="' + logoPathDesktop + '" alt="' + logoAlt + '"> <img class="GN-logo-short" src="' + logoPathMobile + '" alt="' + logoAlt + '"></a></div><div class="GN-icons-right"><div id="GN-search" class=""><form id="GN-search-form-desktop" name="GNDesktopSearchForm" action="' + searchDomain + '" method="' + searchFormMethod + '" role="search" autocomplete="off"><div id="GN-search-text-field-container-desktop"><input name="' + searchInputName + '" id="GN-search-input-desktop" type="text" placeholder="' + searchPlaceholder + '" aria-label="Search NYU"><button type="submit" class="GN-search-btn"><svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="2 2 16.5 16"><defs><rect x="2" y="2" width="16.5" height="16"/></defs><clipPath><use xlink:href="#SVGID_1_"/></clipPath><path d="M4.1 6.1c0.5-1.1 1.4-1.8 2.5-2.2C7.1 3.7 7.5 3.6 8 3.6c1.9 0 3.5 1.2 4.2 3 0.4 1.1 0.3 2.3-0.2 3.4 -0.5 1.1-1.4 1.8-2.5 2.2 -0.5 0.2-0.9 0.2-1.4 0.2 -1.9 0-3.5-1.2-4.1-3C3.5 8.4 3.6 7.2 4.1 6.1M2.3 10c0.9 2.5 3.2 4.1 5.7 4.1 0.7 0 1.3-0.1 2-0.3 0.3-0.1 0.7-0.3 1-0.4l5.2 4.7 2.4-2.6 -5.1-4.6c0.7-1.4 0.9-3.1 0.3-4.7C12.9 3.6 10.5 2 8 2c-0.7 0-1.3 0.1-2 0.3C2.9 3.4 1.2 6.9 2.3 10" style="clip-path:url(#SVGID_2_);"/></svg> <span class="GN-screen-reader-text GN-btn-txt">Search</span></button></div></form></div><button type="button" id="GN-toggle-search-box" class="" role="button" aria-label="Toggle Search Box" tabindex="0" aria-expanded="false"><svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="2 2 16.5 16"><defs><rect x="2" y="2" width="16.5" height="16"/></defs><clipPath><use xlink:href="#SVGID_1_"/></clipPath><path d="M4.1 6.1c0.5-1.1 1.4-1.8 2.5-2.2C7.1 3.7 7.5 3.6 8 3.6c1.9 0 3.5 1.2 4.2 3 0.4 1.1 0.3 2.3-0.2 3.4 -0.5 1.1-1.4 1.8-2.5 2.2 -0.5 0.2-0.9 0.2-1.4 0.2 -1.9 0-3.5-1.2-4.1-3C3.5 8.4 3.6 7.2 4.1 6.1M2.3 10c0.9 2.5 3.2 4.1 5.7 4.1 0.7 0 1.3-0.1 2-0.3 0.3-0.1 0.7-0.3 1-0.4l5.2 4.7 2.4-2.6 -5.1-4.6c0.7-1.4 0.9-3.1 0.3-4.7C12.9 3.6 10.5 2 8 2c-0.7 0-1.3 0.1-2 0.3C2.9 3.4 1.2 6.9 2.3 10" style="clip-path:url(#SVGID_2_);"/></svg><div class="GN-screen-reader-text">Toggle Search Box</div></button><form id="GN-search-form" name="GNTabletPhoneSearchForm" action="' + searchDomain + '" class="GN-clearfix" role="search"><div id="GN-search-text-field-container"><input role="search" name="' + searchInputName + '" id="GN-search-input-tablet" type="text" placeholder="' + searchPlaceholder + '" aria-label="' + searchPlaceholder + '" aria-expanded="false"> <button type="submit" class="GN-search-btn"><svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="2 2 16.5 16"><defs><rect x="2" y="2" width="16.5" height="16"/></defs><clipPath><use xlink:href="#SVGID_1_"/></clipPath><path d="M4.1 6.1c0.5-1.1 1.4-1.8 2.5-2.2C7.1 3.7 7.5 3.6 8 3.6c1.9 0 3.5 1.2 4.2 3 0.4 1.1 0.3 2.3-0.2 3.4 -0.5 1.1-1.4 1.8-2.5 2.2 -0.5 0.2-0.9 0.2-1.4 0.2 -1.9 0-3.5-1.2-4.1-3C3.5 8.4 3.6 7.2 4.1 6.1M2.3 10c0.9 2.5 3.2 4.1 5.7 4.1 0.7 0 1.3-0.1 2-0.3 0.3-0.1 0.7-0.3 1-0.4l5.2 4.7 2.4-2.6 -5.1-4.6c0.7-1.4 0.9-3.1 0.3-4.7C12.9 3.6 10.5 2 8 2c-0.7 0-1.3 0.1-2 0.3C2.9 3.4 1.2 6.9 2.3 10" style="clip-path:url(#SVGID_2_);"/></svg> <span class="GN-screen-reader-text">Search</span></button></div></form><a id="GN-covid-btn" aria-label="COVID-19 Information" href="' + covidInfoPage + '"><svg id="GN-covid-info" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><defs><clipPath id="clip-path"><rect x="1.277" y="0.6799" width="18" height="18.012" fill="none"/></clipPath></defs><g clip-path="url(#clip-path)"><path d="M19.1728,11.0338A9,9,0,1,1,11.5868.7828a8.9569,8.9569,0,0,1,7.586,10.251" fill="#fff"/><text id="GN-covid-info-text-big" transform="translate(8.2927 14.8569)" font-size="16" fill="#57068c" font-family="GillSans-SemiBold, Gill Sans" font-weight="600">i</text><text id="GN-covid-info-text-small" transform="translate(8.5407 14.3555)" font-size="14" fill="#57068c" font-family="GillSans-SemiBold, Gill Sans" font-weight="600">i</text></g></svg> <span class="GN-btn-txt GN-btn-txt-long">COVID-19 Info</span> <span class="GN-btn-txt GN-btn-txt-short">COVID-19</span> </a><button type="button" id="GN-toggle-global-nav" class="" role="button" aria-label="Toggle All NYU Global Navigation" tabindex="0" aria-expanded="false"><svg xmlns="http://www.w3.org/2000/svg" id="GN-globe" width="18" height="18" viewBox="1 1 18 18"><defs><rect id="SVGID_1_" x="1" y="1" width="18" height="18"/></defs><clipPath id="SVGID_2_"><use xlink:href="#SVGID_1_"/></clipPath><path d="M16.5 14.9h-2.8c-0.5 1.1-1.1 2.1-1.8 3C13.8 17.5 15.4 16.3 16.5 14.9M10.4 18.1c0.9-0.8 1.7-1.9 2.3-3.2h-2.3V18.1zM10.4 14h2.7c0.4-1.1 0.6-2.3 0.7-3.6h-3.4V14zM14.7 10.4c0 1.3-0.3 2.5-0.6 3.6l3 0c0.6-1.1 1-2.3 1.1-3.6H14.7zM8.1 17.9c-0.7-0.9-1.4-1.9-1.8-3H3.5C4.6 16.3 6.2 17.5 8.1 17.9M9.6 14.9H7.2c0.6 1.3 1.4 2.4 2.3 3.2V14.9zM9.6 10.4H6.2c0 1.3 0.3 2.5 0.7 3.6h2.7V10.4zM1.9 10.4c0.1 1.3 0.4 2.5 1.1 3.6l3 0c-0.4-1.1-0.6-2.3-0.6-3.6H1.9zM11.9 2.1c0.7 0.9 1.4 1.9 1.8 3h2.8C15.4 3.7 13.8 2.5 11.9 2.1M10.4 5.1h2.3c-0.6-1.3-1.4-2.4-2.3-3.2V5.1zM10.4 9.6h3.4c0-1.3-0.3-2.5-0.7-3.6h-2.7V9.6zM18.1 9.6c-0.1-1.3-0.4-2.5-1.1-3.6l-3 0c0.4 1.1 0.6 2.3 0.6 3.6L18.1 9.6 18.1 9.6zM3.5 5.1h2.8C6.7 4 7.4 3 8.1 2.1 6.2 2.5 4.6 3.7 3.5 5.1M9.6 1.9c-0.9 0.8-1.7 1.9-2.3 3.2h2.3V1.9zM9.6 6h-2.7C6.5 7.1 6.2 8.3 6.2 9.6h3.4V6zM5.3 9.6c0-1.3 0.3-2.5 0.6-3.6L2.9 6c-0.6 1.1-1 2.3-1.1 3.6L5.3 9.6 5.3 9.6zM19 10c0 5-4 9-9 9 -5 0-9-4-9-9s4-9 9-9C15 1 19 5 19 10" style="clip-path:url(#SVGID_2_);"/></svg> <span class="GN-btn-txt">All NYU</span></button></div></div></div><div id="GN-global-nav" aria-label="NYU Navigation" role="navigation"><div id="GN-global-nav-body" role="dialog" aria-modal="true" aria-label="NYU Global Navigation Menu"><div id="GN-global-nav-nyu-logo"><a href="' + homepage + '" aria-label="Go to Homepage" title="' + logoAlt + '"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88.2 30.1"><path class="st0" d="M37.9 6.7h3.5l8 10.5V6.7h3.7v17h-3.2l-8.3-10.8v10.8h-3.7V6.7zM61.5 17L54.9 6.7h4.4l4.1 6.8 4.1-6.8h4.3l-6.5 10.2v6.8h-3.7V17zM73.4 16.4V6.7h3.7v9.6c0 2.8 1.4 4.2 3.7 4.2 2.3 0 3.7-1.4 3.7-4.1V6.7h3.7v9.6c0 5.2-2.9 7.7-7.5 7.7S73.4 21.4 73.4 16.4M13.4 15.7c-3.1-1.8-2.8-4.5-1.5-6.4 0 0 0-0.1 0-0.2 -0.1-0.5-0.6-1.6-0.8-1.9 -0.1-0.1-0.1-0.1-0.1 0 0 0.5-0.6 1.8-1.5 3.3C8.5 12.2 8.5 15.7 13.4 15.7 13.4 15.8 13.4 15.7 13.4 15.7M14.2 15.6c-1.8-3.9 1.8-6.5 2.4-7 0.1-0.1 0.1-0.1 0.1-0.2 0-1.2-0.7-3.2-0.9-3.5 0 0-0.1 0-0.1 0 -0.3 1.2-2 3-2.3 3.4C10.5 11.6 11.2 13.7 14.2 15.6 14.2 15.7 14.2 15.6 14.2 15.6M14.8 15.4c0.9-4.2 4.3-4.3 4.6-5.1 0.5-1.2-0.4-3.4-0.6-3.7 0 0-0.1 0-0.1 0 -0.5 1-1.2 2-1.8 2.4C16.2 9.7 13.2 11.9 14.8 15.4 14.7 15.5 14.8 15.5 14.8 15.4M15.4 15.8c5.5 0.2 5.9-4.8 5.9-6.7 0-0.1-0.1-0.1-0.1 0 -0.2 0.4-0.9 1.8-2.9 2.6C16.6 12.5 15.5 14.2 15.4 15.8 15.3 15.8 15.4 15.8 15.4 15.8M16.6 16.4h-4.3v1.3h4.3V16.4zM14.1 26.6c0 0.2 0.5 0.3 0.6 0l1-8.3h-2.5L14.1 26.6zM30.1 30.1h-30v-30h30V30.1z"/></svg></a></div><button type="button" class="GN-close-btn" aria-label="Close Campus & Schools Navigation"><span class="GN-screen-reader-text">Close</span></button><div class="GN-nyu-login-btn"><a role="button" aria-label="Login to NYU Home" href="http://home.nyu.edu">Login to NYU Home</a></div><nav id="GN-accordion"><div id="GN-accordion-locations"><button type="button" id="GN-locations-title" class="GN-accordion-title" aria-expanded="false">Global Locations</button><div class="GN-accordion-body" id="GN-locations-list" aria-label="All NYU Locations"><ul><li class="GN-locations-primary"><ul><li><a href="http://www.nyu.edu">New York</a></li><li><a href="http://nyuad.nyu.edu">Abu Dhabi</a></li><li><a href="http://shanghai.nyu.edu">Shanghai</a></li></ul></li><li class="GN-locations-secondary"><ul><li><a href="http://www.nyu.edu/accra">Accra</a></li><li><a href="http://www.nyu.edu/berlin">Berlin</a></li><li><a href="http://www.nyu.edu/buenosaires">Buenos Aires</a></li><li><a href="http://www.nyu.edu/florence">Florence</a></li><li><a href="http://www.nyu.edu/london">London</a></li><li><a href="http://www.nyu.edu/los-angeles">Los Angeles</a></li><li><a href="http://www.nyu.edu/madrid">Madrid</a></li><li><a href="http://www.nyu.edu/paris">Paris</a></li><li><a href="http://www.nyu.edu/prague">Prague</a></li><li><a href="http://www.nyu.edu/sydney">Sydney</a></li><li><a href="http://www.nyu.edu/telaviv">Tel Aviv</a></li><li><a href="http://www.nyu.edu/washingtondc">Washington DC</a></li></ul></li></ul></div></div><div id="GN-accordion-schools"><div id="GN-schools-title" class="GN-accordion-title" role="button" tabindex="0" aria-expanded="false" aria-controls="GN-schools-list">Schools</div><div class="GN-accordion-body" id="GN-schools-list" aria-label="All NYU Locations"><ul><li><a href="http://as.nyu.edu/">Arts and Science</a><ul><li><a href="http://cas.nyu.edu/">College of Arts and Science</a></li><li><a href="http://gsas.nyu.edu/">Graduate School of Arts and Science</a></li><li><a href="http://www.liberalstudies.nyu.edu/">Liberal Studies</a></li></ul></li><li><a href="http://www.nyu.edu/dental/">College of Dentistry</a></li><li><a href="http://www.cims.nyu.edu/">Courant Institute of Mathematical Sciences</a></li><li><a href="http://gallatin.nyu.edu/">Gallatin School of Individualized Study</a></li><li><a href="http://school.med.nyu.edu/">Grossman School of Medicine</a></li><li><a href="http://www.nyu.edu/isaw/">Institute for the Study of the Ancient World</a></li><li><a href="http://ifa.nyu.edu">Institute of Fine Arts</a></li><li><a href="http://www.stern.nyu.edu/">Leonard N. Stern School of Business</a></li><li><a href="http://medli.nyu.edu/">Long Island School of Medicine</a></li><li><a href="http://wagner.nyu.edu/">Robert F. Wagner Graduate School<br>of Public Service</a></li><li><a href="http://nursing.nyu.edu/">Rory Meyers College of Nursing</a></li><li><a href="http://publichealth.nyu.edu">School of Global Public Health</a></li><li><a href="http://www.law.nyu.edu/">School of Law</a></li><li><a href="http://www.sps.nyu.edu/">School of Professional Studies</a></li><li><a href="http://www.nyu.edu/socialwork/">Silver School of Social Work</a></li><li><a href="http://steinhardt.nyu.edu/">Steinhardt School of Culture,&nbsp;<br>Education, and Human Development</a></li><li><a href="http://engineering.nyu.edu/">Tandon School of Engineering</a></li><li><a href="http://www.tisch.nyu.edu/">Tisch School of the Arts</a></li></ul></div></div></nav></div></div><div id="GN-local-nav" aria-label="' + logoAlt + ' Navigation"></div><!-- endinject -->';
	header.setAttribute('aria-label', 'Global');

	if(typeof el !== 'undefined'){
		let div = document.getElementById(el);
		div.appendChild(header);
	} else if(bodyFirstChild) {
		body.insertBefore(header, bodyFirstChild);
	} else {
		body.appendChild(header);
	}
}

function toggleLocalNavigation() {
	if(options.localNavFunc !== false){
		window[options.localNavFunc]();
		toggleClassName(localNavCntr, "active");
	}
	else{
		if(options.activeNav.global) {
			toggleGlobalNavigation();
		}
		// Fix local navigation scrolling on mobile
		toggleClassName(html, 'GN-fix-mobile-scrolling');
		toggleClassName(body, 'GN-reveal-local');
		localNav.setAttribute('aria-hidden','false');
		options.activeNav.local = !options.activeNav.local;
		closeLayerListener();
		toggleClassName(body, 'safari-body-lock');
	}
	trapFocusByQuery('#GN-local-nav');
}

function toggleGlobalNavigation() {
	if(options.activeNav.local) {
		toggleLocalNavigation();
	}

	if (viewport === 'desktop') {
		document.getElementById("GN-locations-title").disabled = true;
		document.getElementById("GN-schools-title").disabled = true;
		document.getElementById("GN-schools-title").setAttribute("role", "heading");
		document.getElementById("GN-schools-title").setAttribute("aria-level", "2");
		document.getElementById("GN-schools-title").removeAttribute("tabindex");
		document.getElementById("GN-schools-title").removeAttribute("aria-controls");
		document.getElementById("GN-schools-title").removeAttribute("aria-expanded");
		for (var i = accordionDivElements.length - 1; i >= 0; i--) {
			accordionDivElements[i].removeEventListener('click', showSubNav, false);
		}
	} else {
		document.getElementById("GN-locations-title").disabled = false;
		document.getElementById("GN-schools-title").disabled = false;
		document.getElementById("GN-schools-title").removeAttribute("aria-level");
		document.getElementById("GN-schools-title").setAttribute("role", "button");
		document.getElementById("GN-schools-title").setAttribute("tabindex", "0");
		document.getElementById("GN-schools-title").setAttribute("aria-expanded", "false");
		document.getElementById("GN-schools-title").setAttribute("aria-controls", "GN-schools-list");
		for (var i = accordionDivElements.length - 1; i >= 0; i--) {
			accordionDivElements[i].addEventListener('click', showSubNav, false);
		}
	}

	if(globalNavCntr.getAttribute("aria-expanded") === "false"){
		globalNavCntr.setAttribute("aria-expanded", "true");
	}
	else{
		globalNavCntr.setAttribute("aria-expanded", "false");
	}

	// if(options.activeNav.global && viewport === 'desktop') {
		// toggleClassName(globalNav, 'disappear');
		// setTimeout(function() {
		// 	toggleClassName(globalNav, 'disappear');
		// 	toggleClassName(body, 'GN-reveal-global');
		// }, 1000 * options.animationLength);

		// document.getElementById("GN-locations-title").disabled = true;
		// document.getElementById("GN-schools-title").disabled = true;

		// toggleClassName(body, 'GN-reveal-global');
	// } else {
		toggleClassName(body, 'GN-reveal-global');
	// }
	
	trapFocusByQuery('#GN-global-nav-body');

	options.activeNav.global = !options.activeNav.global;
	
	const GNContainer = document.getElementById(options.el);
	if(options.activeNav.global){
		//set all background elements to aria-hidden=true:
		let elements = body.children;
		hiddenElementIndices = [];
		for(let i=0; i<elements.length; i++){
				let child = elements[i];
				if (child.getAttribute("aria-hidden") == "true"){ //remember which elements were initially aria-hidden
					hiddenElementIndices.push(true);
				}
				else {
					hiddenElementIndices.push(false);
					child.setAttribute("aria-hidden", "true");
				}
		}
		if(GNContainer){
			GNContainer.setAttribute("aria-hidden", "false");
		}
		else {
			document.getElementById("GN-sub-nav").setAttribute("aria-hidden", "false");
		}
	}
	else {
		//set background elements that weren't aria-hidden before opening menu to aria-hidden=false:
		let elements = body.children;
		for(let i=0; i<elements.length; i++){
			let child = elements[i];
			if(hiddenElementIndices[i] === false) {
				child.setAttribute("aria-hidden", "false");
			}
		}
	}
	closeLayerListener();
	toggleClassName(body, 'safari-body-lock');
}

function closeAllNavigations() {
	body.className = body.className.replace(' GN-reveal-global', '');
	body.className = body.className.replace(' GN-reveal-local', '');
	options.activeNav.global = false;
	options.activeNav.local = false;

	closeLayerListener();
}

function showSearchTablet(event) {
	event.preventDefault();

	searchFormToggle.setAttribute('aria-expanded','true');
	trapFocusByQuery('#GN-search-text-field-container');
	closeAllNavigations();

	/*
	toggleClassName() - See documentation below.
	True: Blur the Input Field (otherwise remains blinking on mobile)
	False: Focus the Input Field
	*/
	if(toggleClassName(body, 'GN-search-form-active')){
		setTimeout(function() { searchInputTablet.blur(); });
	}
	else{
		setTimeout(function() { searchInputTablet.focus(); });
	}
	options.isSearchFormActive = !options.isSearchFormActive;
}

function hideSearchTablet() {

	searchFormToggle.setAttribute('aria-expanded','false');

	// Blur event prevents form submission( investigate why? )
	setTimeout(function() {
		body.className = body.className.replace(' GN-search-form-active', '');
		options.isSearchFormActive = false;
	}, 250);
}

function disableSearch(){
	searchElement.style.display='none';
	searchFormToggle.style.display='none';
}

/**
* Toggles class name
* @param  {HTMLElement} el Element toggle class on
* @param  {string} cn Class name tot toggle
* @return {bool}   true: was toggled, false: was added a new class
*/
function toggleClassName(el, cn) {
	var classNameCached = el.className,
	className = ' ' + cn;

	el.className = el.className.replace(className, '');
	if(classNameCached === el.className) {
		el.className = el.className + className;
		return false;
	}
	return true;
}

function updateLayout() {
	var viewportWidth = window.innerWidth,
	viewportHeight = window.innerHeight,
	scrollWidth = document.body.scrollWidth,
	scrollHeight = document.body.scrollHeight;

	if(!options.isResponsive || viewportWidth >= breakPoints.desktop) {
		// Close all subnavs
		closeAllSubNavs();
	}

	// Reset & attach viewport classes
	removeAllMediaQueryClasses();


	if(!options.isResponsive || (viewportWidth >= breakPoints.desktop && viewportHeight >= breakPoints.vertical)) {
		viewport = 'desktop';
		body.className = body.className + MQUERY.DESKTOP;
		// Open default subnav
		toggleClassName(subNavMenu1, 'GN-reveal-sub-nav');
	} else if(viewportWidth >= breakPoints.tablet) {
		viewport = 'tablet';
		body.className = body.className + MQUERY.TABLET;
	} else if(viewportWidth >= breakPoints.phone) {
		viewport = 'phone';
		body.className = body.className + MQUERY.PHONE;
	}

	if(!options.searchEnabled)
		disableSearch();

	if(options.isFullWidth === true && body.className.indexOf(MQUERY.FULL_WIDTH) === -1){
		toggleClassName(body, MQUERY.FULL_WIDTH);
	}

	if(viewport !== 'desktop'){
	  globalNav.style.height = viewportHeight + 'px';
		localNav.style.height = 'calc(100%)';
	}
	else{
    globalNav.style.height = viewportHeight + 'px';
		localNav.style.height = viewportHeight + 'px';
	}
}

/**
*  Shift Close Layer up if user scrolls beyond Global Banner
*/

function shiftCloseLayer() {
	if (window.scrollY >= globalBanner.clientHeight) {
		closeLayer.style.top = 0;
	} else {
		closeLayer.style.top = globalBanner.clientHeight + 'px';
	}
}

function removeAllMediaQueryClasses() {
	body.className = body.className.replace(MQUERY.DESKTOP, '');
	body.className = body.className.replace(MQUERY.TABLET, '');
	body.className = body.className.replace(MQUERY.PHONE, '');
}

/**
* Toggles the subordinate navigation belonging to the global navigation.
*/
function showSubNav() {
	//console.log("showSubNav");

	var accordionParent,
	toggled,
	thisParent = this.parentNode;

	for (var i = accordionElements.length - 1; i >= 0; i--) {
		accordionParent = accordionElements[i].parentNode;

		if(accordionParent.id === thisParent.id) {
			toggled = toggleClassName(accordionParent, 'GN-reveal-sub-nav');

			// console.log(accordionParent.classList.contains("GN-reveal-sub-nav"));
			// console.log(accordionParent.firstElementChild.getAttribute("aria-expanded"));

			// if accordian is set to open, tell aria-expanded that it's open
			if (accordionParent.classList.contains("GN-reveal-sub-nav")){
				accordionParent.firstElementChild.setAttribute("aria-expanded", "true");
			} else {
				accordionParent.firstElementChild.setAttribute("aria-expanded", "false");
			}

			// We do not want to close active subnav in desktop mode
			if(toggled && viewport === 'desktop') {
				toggleClassName(accordionParent, 'GN-reveal-sub-nav');
			}

		} else if(viewport === 'desktop') {
			// accordionParent.className =
			accordionParent.className.replace(' GN-reveal-sub-nav', '');

		}
	}
}

/*****Trigger click event on keypress******/
function triggerClickKeys(e)  {
	var enterSpace = (e.keyCode === 32 || e.keyCode === 13) ? true : false;

	//Stop scolling on SPACE keydown
	if(e.type == 'keydown' && e.keyCode === 32) {
		e.stopPropagation(); e.preventDefault();
	}

	//SPACE and ENTER
	if(enterSpace && e.type == 'keyup'){
		e.stopPropagation();
		e.preventDefault();
		e.target.click();
	}
}

/*****Return focus on modal close******/
function a11yReturnFocus(e){
	var enterSpace = (e.keyCode === 32 || e.keyCode === 13) ? true : false;
	var eType = e.type.replace('key', '');
	if((enterSpace && e.type == 'keypress') || e.type == 'click'){
		globalNavCntr.focus();
	}
}


function closeAllSubNavs() {
	var accordionParent;
	for(var i = accordionElements.length - 1; i >= 0; i--) {
		accordionParent = accordionElements[i].parentNode;
		accordionParent.className =
		accordionParent.className.replace(' GN-reveal-sub-nav', '');
	}
}

function searchInputListener() {
	var thisParent = this.parentNode;
	toggleClassName(thisParent, ' GN-input-focus');
}

/**
* Custom event listener function
*/
function addEvent(elem, type, eventHandle) {
	if(elem == null || typeof(elem) === 'undefined') return;

	if(elem.addEventListener) {
		elem.addEventListener( type, eventHandle, false);
	} else if(elem.attachEvent) {
		elem.attachEvent('on' + type, eventHandle);
	} else {
		elem['on' + type] = eventHandle;
	}
}

/**
* Debounce function
*/
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}

/**
 * Removes the “COVID-19 Info” button if “covidInfoEnabled” is set to false
 *
 * @return {void}
 */
function manageCovidBtn() {
  if (!covidInfoEnabled) {
    var covidBtn = document.getElementById("GN-covid-btn");
    if (covidBtn) covidBtn.parentElement.removeChild(covidBtn);
  }
}

function addViewPortTag() {
	var viewPortTag = document.createElement('meta');
	viewPortTag.id = 'viewport';
	viewPortTag.name = 'viewport';
	viewPortTag.content = 'initial-scale=1, minimum-scale=1.0,' +
	'width=device-width, shrink-to-fit=no';
	head.appendChild(viewPortTag);
}

/**
* Adds custom css
*/
function createCssRules() {
	addCSSRule( sheet,
		'.GN-mquery-desktop #GN-sub-nav #GN-banner',
		'width: ' + breakPoints.desktop + 'px;'
	);

	if(!options.isResponsive) {
		addCSSRule( sheet,
			'html.GN-reveal-global, html.GN-reveal-local,' +
			'body.GN-reveal-global, body.GN-reveal-local',
			'overflow: scroll !important;'
		);
	}
}

/**
* Disable hover on touch devices by adding .no-touch class
*/
function disableHoverOnTouch() {
	body.addEventListener('touchstart', disableHoverOnTouchListener, false);
}

function disableHoverOnTouchListener() {
	toggleClassName(body, 'GN-no-touch');
	//console.log('disableHoverOnTouchListener');
	body.removeEventListener('touchstart', disableHoverOnTouchListener, false);
}

// If Search is configured to NYU's search endpoint, preserve existing params & redirect with param appended instead
function bindGSA(searchDomain){
	var GSAPath = 'google.nyu.edu';
	var FUNNELBACK_PATH = 'search.nyu.edu';

	if(searchDomain.indexOf(GSAPath)>-1 || searchDomain.indexOf(FUNNELBACK_PATH)>-1 || options.searchPreserveParams === true){
		document.querySelector('#GN-search-form-desktop').addEventListener('submit', function(event){
			event.preventDefault();
			var redirect = searchDomain + "&" + searchInputName + "=" + document.querySelector('#GN-search-input-desktop').value;
			window.location.href = redirect;
		}, false);
		document.querySelector('#GN-search-form').addEventListener('submit', function(event){
			event.preventDefault();
			var redirect = searchDomain + "&" + searchInputName + "=" + document.querySelector('#GN-search-input-tablet').value;
			window.location.href = redirect;
		}, false);
	}
}

/**
* Watch for tabbing focus
*/
function trapFocusByQuery(elemSelector){
	var focusedElementBeforeFocus = document.activeElement;
	var focusedElement = document.querySelector(elemSelector);
	var logo = document.getElementById('GN-logo');
	var rightBanner = document.getElementById('GN-banner');

	closeLayer.setAttribute('aria-hidden','true');
	//globalNav.setAttribute('aria-hidden','true');
	localNav.setAttribute('aria-hidden','true');

	focusedElement.setAttribute('aria-hidden','false');

  // Listen for and trap the keyboard
  focusedElement.addEventListener('keydown', trapTabKey);

	// Find all focusable children
  var focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
  var focusableElements = focusedElement.querySelectorAll(focusableElementsString);
  focusableElements = Array.prototype.slice.call(focusableElements);

  /**
   * Determines if an element is visible
   * @param {HTMLElement} element Element whose visibility to check
   * @return {boolean} true: element is visible, false: element or its parentElement is set to "display: none;"
   */
  function isVisible(element) {
    for (let el = element; el !== focusedElement; el = el.parentElement) {
      if (window.getComputedStyle(el).display === 'none') return false;
    }
    return true;
  }

  /**
   * Finds the first element in an array that satisfies given predicate
   *
   * @template T
   * @param {T[]} arr The array to find the element in
   * @param {function(T, number, T[]): boolean} pred The predicate to check the elements for
   * @return {T|undefined} The first element that satisfies the predicate or undefined
   */
  function findFirst(arr, pred) {
    for (let i = 0; i < arr.length; i++) {
      if (pred(arr[i], i, arr)) return arr[i];
    }
  }

  /**
   * Finds the last element in an array that satisfies given predicate
   *
   * @template T
   * @param {T[]} arr The array to find the element in
   * @param {function(T, number, T[]): boolean} pred The predicate to check the elements for
   * @return {T|undefined} The last element that satisfies the predicate or undefined
   */
  function findLast(arr, pred) {
    for (let i = arr.length - 1; i >= 0; i--) {
      if (pred(arr[i], i, arr)) return arr[i];
    }
  }

  var firstTabStop = findFirst(focusableElements, isVisible);
  var lastTabStop = findLast(focusableElements, isVisible);

  // Focus on close button
  document.querySelector("button.GN-close-btn").focus();

function trapTabKey(e) {

    // SHIFT + TAB
	if (e.shiftKey && e.keyCode === 9) {
      	if (document.activeElement === firstTabStop) {
	        e.preventDefault();
			lastTabStop.focus(); 
      	}
	}

    // TAB
    else if(e.keyCode === 9){
      if (document.activeElement === lastTabStop) {
        e.preventDefault();
        firstTabStop.focus();
      }
    }

		// ESCAPE
	  if (e.keyCode === 27) {
	    releaseFocus();
	  }
  }

	function releaseFocus() {
		if(options.activeNav.global){
			let elements = body.children;
			for(let i=0; i<elements.length; i++){
				let child = elements[i];
				if(hiddenElementIndices[i] === false) {
					child.setAttribute("aria-hidden", "false");
				}
			}
		}
		focusedElement.setAttribute('aria-hidden','true');	
		closeAllSubNavs();
		closeAllNavigations();
	  // Set focus back to element that had it before the VO focus element was opened
	  focusedElementBeforeFocus.focus();
	}
}

// Initialization
obj.init = function init(config) {

// set global vars
homepage = config.homepage ? config.homepage : '//nyu.edu';
covidInfoEnabled = config.covidInfoEnabled ? config.covidInfoEnabled : false;
covidInfoPage = config.covidInfoPage ? config.covidInfoPage : '//nyu.edu/coronavirus';
logoPathDesktop = config.logoPathDesktop ? config.logoPathDesktop : '';
logoPathMobile = config.logoPathMobile ? config.logoPathMobile : '';
logoAlt = config.logoAlt ? config.logoAlt : 'New York University';
searchDomain = config.searchDomain ? config.searchDomain : '';
searchFormMethod = config.searchFormMethod ? config.searchFormMethod : 'GET';
searchInputName = config.searchInputName ? config.searchInputName : 'search';
searchPlaceholder = config.searchPlaceholder ? config.searchPlaceholder : 'SEARCH';
breakPoints = config.breakPoints ? Object.assign({}, defaultBreakPoints, config.breakPoints) : defaultBreakPoints;
options.isFullWidth = config.isFullWidth ? config.isFullWidth : false;
options.isResponsive = config.isResponsive ? config.isResponsive : false;
options.searchEnabled = config.searchEnabled ? config.searchEnabled : false;
options.searchPreserveParams = config.searchPreserveParams ? config.searchPreserveParams : false;
options.localNavFunc = config.localNavFunc ? config.localNavFunc : false;
if(config.showLocalNavAlways === true){
	localNavAlwaysClass = 'permanent';
}
else{
	localNavAlwaysClass = '';
}

options.el = config.el ? config.el : null;
html = document.getElementsByTagName('html')[0];
body = document.getElementsByTagName('body')[0];
head = document.getElementsByTagName('head')[0];

// Create navigation layout
createHeader(config.el);


searchElement = document.getElementById('GN-search');
searchInputDesktop = document.getElementById('GN-search-input-desktop');
searchInputTablet = document.getElementById('GN-search-input-tablet');
searchFormToggle = document.getElementById('GN-toggle-search-box');
searchFormTablet = document.getElementById('GN-search-form');
globalNav = document.getElementById('GN-global-nav');
localNav = document.getElementById('GN-local-nav');
localNavSource = document.getElementById('GN-local-nav-source');
closeLayer = document.getElementById('GN-overlay');
accordionElements = document.getElementsByClassName('GN-accordion-title');
subNavMenu1 = document.getElementById('GN-schools-title');//document.getElementById('GN-subnav-1');
globalBanner = document.getElementById('GN-sub-nav');

// Init local vars
globalNavCntr = document.getElementById('GN-toggle-global-nav');
localNavCntr = document.getElementById('GN-toggle-local-nav');
closeButton = document.getElementsByClassName('GN-close-btn');

// Event listeners
globalNavCntr.addEventListener('click', toggleGlobalNavigation, false);
localNavCntr.addEventListener('click', toggleLocalNavigation, false);
searchInputDesktop.addEventListener('focus', searchInputListener, false);
searchInputDesktop.addEventListener('blur', searchInputListener, false);
closeButton[0].addEventListener('click', toggleGlobalNavigation, false);
closeButton[0].addEventListener('click', a11yReturnFocus, false);
addEvent(window, 'resize', debounce(updateLayout, 250));
addEvent(window, 'scroll', debounce(shiftCloseLayer, 50));
searchFormToggle.addEventListener('click', showSearchTablet, false);
searchInputTablet.addEventListener('blur', hideSearchTablet, false);

/**
 * Acquire an array of all the anchors of class “GN-accordion” bound to
 * each of the three top-level links in the right global nav....
 */
 accordionDivElements = [];
 for (var i = accordionElements.length - 1; i >= 0; i--) {
 	accordionElements[i].addEventListener('click', showSubNav, false);
	if(accordionElements[i].tagName == "DIV") {
		accordionDivElements.push(accordionElements[i]);
		accordionElements[i].addEventListener('keydown', triggerClickKeys, false);
		accordionElements[i].addEventListener('keyup', triggerClickKeys, false);
	}
 }

// Hide search if ESC key = 27 was pressed
document.onkeydown = function (e) {
	if (options.isSearchFormActive && e.keyCode === 27) {
		hideSearchTablet();
	}
};

/**
 * Replace localNav with html from localNavSource then remove localNavSource
 */
isLocalNavSourceEmpty = document.querySelector('#GN-local-nav-source:empty');

if(!!localNavSource && !isLocalNavSourceEmpty) {
	var localNavBody = document.createElement('div');
	localNavBody.setAttribute('id','GN-local-nav-body');
	localNavBody.innerHTML = localNavSource.innerHTML;
 	localNav.appendChild(localNavBody);
 	localNavSource.parentElement.removeChild(localNavSource);
} else { // Local navigation source is empty: disable local menu
	localNavCntr.removeEventListener('click', toggleLocalNavigation, false);
	localNavCntr.style.display = 'none';
}

  manageCovidBtn();
	addViewPortTag();
	createCssRules();
	updateLayout();
	disableHoverOnTouch();
	bindGSA(searchDomain);

	obj.toggleNavigation = function(){
		toggleGlobalNavigation();
	};
};

return obj;
})(window.globalNavObject = window.globalNavObject || {});

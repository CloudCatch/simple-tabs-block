document.addEventListener( 'DOMContentLoaded', function () {
	const cloudCatchTabs = ( tabsWrapper ) => {
		const tabLabels = tabsWrapper.querySelectorAll( '[role="tab"]' );

		for ( let x = 0; x < tabLabels.length; x++ ) {
			tabLabels[ x ].addEventListener( 'focus', focusEventHandler );
		}

		const keys = {
			end: 35,
			home: 36,
			left: 37,
			up: 38,
			right: 39,
			down: 40,
		};

		// Add or subtract depending on key pressed
		const direction = {
			37: -1,
			38: -1,
			39: 1,
			40: 1,
		};

		let activeIndex = 0;

		const init = () => {
			activeIndex = tabsWrapper.getAttribute( 'data-default-tab' ) || 0;

			setActiveTab( activeIndex );
		};

		const initEvents = () => {
			tabLabels.forEach( ( tabLabel ) => {
				tabLabel.addEventListener( 'click', ( e ) => {
					setActiveTab( tabLabel.getAttribute( 'tabid' ) );
				} );

				tabLabel.addEventListener( 'keydown', ( e ) => {
					const key = e.keyCode;

					switch ( key ) {
						case keys.up:
						case keys.down:
							determineOrientation( e );
							break;
					}
				} );

				tabLabel.addEventListener( 'keyup', ( e ) => {
					const key = e.keyCode;

					switch ( key ) {
						case keys.left:
						case keys.right:
							determineOrientation( e );
							break;
					}
				} );
			} );
		};

		const setActiveTab = ( id ) => {
			tabsWrapper
				.querySelectorAll( 'div[tabid]:not([role="tab"])' )
				.forEach( ( tab ) => {
					tab.style.display = 'none';
					tab.classList.remove( 'active' );
				} );

			tabLabels.forEach( ( label ) => {
				label.classList.remove( 'active' );
				label.setAttribute( 'aria-selected', 'false' );
			} );

			activeIndex = parseInt( id );

			const currentTabLabel = tabsWrapper.querySelector(
				'[role="tab"][tabid="' + activeIndex + '"]'
			);

			currentTabLabel.classList.add( 'active' );
			currentTabLabel.setAttribute( 'aria-selected', 'true' );

			tabsWrapper.querySelector(
				'div[tabid="' + activeIndex + '"]:not([role="tab"])'
			).style.display = 'block';
			tabsWrapper
				.querySelector(
					'div[tabid="' + activeIndex + '"]:not([role="tab"])'
				)
				.classList.add( 'active' );

			const event = new Event( 'tabChanged' );

			window.dispatchEvent( event );
		};

		const determineOrientation = ( event ) => {
			const key = event.keyCode;
			const vertical = tabsWrapper.classList.contains( 'is-vertical' );
			let proceed = false;

			if ( vertical ) {
				if ( key === keys.up || key === keys.down ) {
					event.preventDefault();
					proceed = true;
				}
			} else if ( key === keys.left || key === keys.right ) {
				proceed = true;
			}

			if ( proceed ) {
				switchTabOnArrowPress( event );
			}
		};

		function switchTabOnArrowPress( event ) {
			const pressed = event.keyCode;

			if ( direction[ pressed ] ) {
				const desiredIndex = activeIndex + direction[ pressed ];

				if ( typeof tabLabels[ desiredIndex ] !== 'undefined' ) {
					tabLabels[ desiredIndex ].focus();
				} else if ( pressed === keys.left || pressed === keys.up ) {
					tabLabels[ tabLabels.length - 1 ].focus();
				} else if ( pressed === keys.right || pressed == keys.down ) {
					tabLabels[ 0 ].focus();
				}
			}
		}

		function focusEventHandler( event ) {
			const target = event.target;

			setTimeout( checkTabFocus, 0, target );
		}

		// Only activate tab on focus if it still has focus after the delay
		function checkTabFocus( target ) {
			const focused = document.activeElement;

			if ( target === focused ) {
				setActiveTab( target.getAttribute( 'tabid' ) );
			}
		}

		init();
		initEvents();
	};

	const tabsWrappers = document.querySelectorAll(
		'.wp-block-cloudcatch-tabs'
	);

	tabsWrappers.forEach( ( tabsWrapper ) => {
		cloudCatchTabs( tabsWrapper );
	} );
} );

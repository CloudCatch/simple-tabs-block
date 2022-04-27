(() => {

    const cloudCatchTabs = (tabsWrapper) => {
        const tabsContainer = tabsWrapper.querySelector('.wp-block-cloudcatch-tabs__container');
        const tabLabelsContainer = tabsWrapper.querySelector('.wp-block-cloudcatch-tabs__tabs');
        const tabLabels = tabLabelsContainer.querySelectorAll('[role="tab"]');

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
            tabLabels.forEach(tabLabel => {
                if (tabLabel.classList.contains('active')) {
                    activeIndex = tabLabel.getAttribute('tabid');
                }
            });

            setActiveTab(activeIndex);
        };

        const initEvents = () => {
            tabLabels.forEach(tabLabel => {
                tabLabel.addEventListener('click', (e) => {
                    setActiveTab(tabLabel.getAttribute('tabid'));
                });

                tabLabel.addEventListener('keydown', (e) => {
                    var key = e.keyCode;

                    switch (key) {
                        case keys.up:
                        case keys.down:
                            determineOrientation(e);
                            break;
                    }
                });

                tabLabel.addEventListener('keyup', (e) => {
                    var key = e.keyCode;

                    switch (key) {
                        case keys.left:
                        case keys.right:
                            determineOrientation(e);
                            break;
                    }
                });
            });
        };

        const setActiveTab = (id) => {
            tabsContainer.querySelectorAll(':scope > *').forEach(tab => {
                tab.style.display = 'none';
            });

            tabLabels.forEach(label => {
                label.classList.remove('active');
                label.setAttribute( 'aria-selected', 'false' );
            });

            activeIndex = parseInt(id);

            const currentTabLabel = tabLabelsContainer.querySelector('[tabid="' + activeIndex + '"]');
            currentTabLabel.classList.add('active');
            currentTabLabel.setAttribute( 'aria-selected', 'true' );

            tabsContainer.querySelector('[tabid="' + activeIndex + '"]').style.display = 'block';
        };

        const determineOrientation = (event) => {
            var key = event.keyCode;
            var vertical = tabLabelsContainer.getAttribute('aria-orientation') == 'vertical';
            var proceed = false;

            if (vertical) {
                if (key === keys.up || key === keys.down) {
                    event.preventDefault();
                    proceed = true;
                }
            } else {
                if (key === keys.left || key === keys.right) {
                    proceed = true;
                }
            }

            if (proceed) {
                switchTabOnArrowPress(event);
            }
        };

        function switchTabOnArrowPress(event) {
            var pressed = event.keyCode;

            for (var x = 0; x < tabLabels.length; x++) {
                tabLabels[x].addEventListener('focus', focusEventHandler);
            }

            console.log( direction[pressed] );

            if (direction[pressed]) {
                var desiredIndex = activeIndex + direction[pressed];

                if (typeof tabLabels[desiredIndex] !== 'undefined') {
                    tabLabels[desiredIndex].focus();
                } else if (pressed === keys.left || pressed === keys.up) {
                    tabLabels[tabLabels.length - 1].focus();
                } else if (pressed === keys.right || pressed == keys.down) {
                    tabLabels[0].focus();
                }
            }
        }

        function focusEventHandler(event) {
            var target = event.target;

            setTimeout(checkTabFocus, 0, target);
        }

        // Only activate tab on focus if it still has focus after the delay
        function checkTabFocus(target) {
            var focused = document.activeElement;

            if (target === focused) {
                setActiveTab(target.getAttribute('tabid'));
            }
        }

        init();
        initEvents();
    };

    const tabsWrappers = document.querySelectorAll('.wp-block-cloudcatch-tabs');

    tabsWrappers.forEach(tabsWrapper => {
        cloudCatchTabs(tabsWrapper);
    });

})();


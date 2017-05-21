window.addEventListener('load', function() {
    new FastClick(document.body);
}, false);

var app = {

    showAlert: function (message, title) {
        if (navigator.notification) {
            navigator.notification.alert(message, null, title, 'OK');
        } else {
            alert(title ? (title + ": " + message) : message);
        }
    },

    registerEvents: function() {
        $(window).on('hashchange', $.proxy(this.route, this));
        if (document.documentElement.hasOwnProperty('ontouchstart')) {
            $("body").on('touchstart', '.tappable', $.proxy(this.selectItem, this));
            $("body").on('touchend', '.tappable', $.proxy(this.deselectItem, this));
        } else {
            $("body").on('mousedown', '.tappable', $.proxy(this.selectItem, this));
            $("body").on('mouseup', '.tappable', $.proxy(this.deselectItem, this));
        }
    },

    selectItem: function(event) {
        $(event.currentTarget).addClass('tappable-active');
    },

    deselectItem: function(event) {
        $('.tappable-active').removeClass('tappable-active');
    },

    route: function() {
        var self = this;
        var hash = window.location.hash;
        if (!hash) {
            if (this.homePage) {
                this.slidePage(this.homePage);
            } else {
                this.homePage = new HomeView(this.store).render();
                this.slidePage(this.homePage);
            }
            return;
        }
        var match = hash.match(this.reportsURL);
        if (match) {
            this.store.findById(Number(match[1]), function(employee) {
                self.slidePage(new ReportsView(self.store, employee).render());
            });
            return;
        }
        match = hash.match(this.detailsURL);
        if (match) {
            this.store.findById(Number(match[1]), function(employee) {
                self.slidePage(new EmployeeView(employee).render());
            });
            return;
        }
    },

    slidePage: function(page) {

        var currentPageDest,
            self = this;

        // If there is no current page (app just started) -> No transition: Position new page in the view port
        if (!this.currentPage) {
            $(page.el).attr('class', 'page stage-center');
            $('body').append(page.el);
            this.currentPage = page;
            return;
        }

        // Cleaning up: remove old pages that were moved out of the viewport
        $('.stage-right, .stage-left').not('.homePage').remove();

        if (page === app.homePage) {
            // Always apply a Back transition (slide from left) when we go back to the search page
            $(page.el).attr('class', 'page stage-left');
            currentPageDest = "stage-right";
        } else {
            // Forward transition (slide from right)
            $(page.el).attr('class', 'page stage-right');
            currentPageDest = "stage-left";
        }

        $('body').append(page.el);

        // Wait until the new page has been added to the DOM...
        setTimeout(function() {
            // Slide out the current page: If new page slides from the right -> slide current page to the left, and vice versa
            $(self.currentPage.el).attr('class', 'page transition ' + currentPageDest);
            // Slide in the new page
            $(page.el).attr('class', 'page stage-center transition');
            self.currentPage = page;
        });

    },

    initialize: function() {
        var self = this;
        this.detailsURL = /^#employees\/(\d{1,})/;
        this.reportsURL = /^#employees\/(\d{1,})\/reports/;
        this.registerEvents();
        this.store = new MemoryStore(function() {
            self.route();
        });
    }

};

app.initialize();
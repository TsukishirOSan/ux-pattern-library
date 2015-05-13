/*
 * Select menu replacement
 * Handles functionality for the replacement select menus, which
 * allows us to style them to our liking. Accessibility is main-
 * tained via use of the default select control. The replacement 
 * control is not visible to screen readers.
 *
 * Choosing an option in the replacement menu also updates the
 * default seleclt menu thus maintaining accessibility.
 */

$(function() {

    var SelectMenuReplacement = {

        vars: {
            wrapper: $('.select-replaced'),
            original: $('.select-replaced').find('.input-select'),
            value: $('.select-replaced').find('.selected-value'),
            menu: $('.select-replaced').find('.select-replaced-menu'),
            button: $('.select-replaced').find('.select-replaced-menu').next('.button-select-replaced'),
            active: 'is-active',
            visible: 'is-visible',
            hidden: 'is-hidden'
        },

        init: function() {
            this.listenForClick();
        },

        listenForClick: function() {
            var that = this;

            that.vars.wrapper.on('click', that.vars.value, function() {
                that.openSelectMenu($(this));
            }).on('click', that.vars.button, function() {
                that.openSelectMenu($(this));
            });

            that.vars.menu.on('click', '.select-option', function() {
                that.updateChoice($(this).data('option'));
            });

            $(document).on('click', function() {
                // that.closeSelectMenu();
            });
        },

        openSelectMenu: function(control) {
            var that = this;

            control
                .parent()
                .find(that.vars.value)
                .addClass(that.vars.active);

            control
                .parent()
                .find(that.vars.menu)
                .removeClass(that.vars.hidden)
                .addClass(that.vars.visible)
                    .focus();
        },

        closeSelectMenu: function() {
            var that = this,
                open = $(document).find(that.vars.menu).not(':focus');

            if (open) {
                open
                    .removeClass(that.vars.visible)
                    .addClass(that.vars.hidden)
                    .parent()
                    .find(that.vars.value)
                        .removeClass(that.vars.active);
            }
        },

        updateChoice: function(choice) {
            var that = this,
                options = that.vars.menu.find('.select-option');

            options.each(function() {
                $(this).removeClass(that.vars.active);
            });

            that.vars.menu.find('.select-option[data-option="' + choice + '"]')
                .addClass(that.vars.active);

            that.vars.value.text(choice);

            that.updateOriginal(choice);
            that.closeSelectMenu();
        },

        updateOriginal: function(choice) {
            var that = this,
                options = that.vars.original.find('option');

            options.each(function() {
                $(this).removeAttr('selected').removeProp('selected');
            });

            that.vars.original
                .find('option[value="' + choice + '"]')
                .attr('selected', 'selected')
                .prop('selected', 'selected');
        }

    };

    SelectMenuReplacement.init();
});
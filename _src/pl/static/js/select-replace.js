/*
 * Select menu replacement
 * Handles functionality for the replacement select menus, which
 * allows us to style them to our liking. Accessibility is main-
 * tained via use of the default select control. The replacement 
 * control is not visible to screen readers.
 *
 * Choosing an option in the replacement menu also updates the
 * default select menu thus maintaining accessibility.
 */

$(function() {

    var CustomSelectReplacement = {

        vars: {
            replaced:       $('.replace-select'),
            replacedClass:  'is-replaced is-transparent',
            customClass:    'wrapper-custom-select',
            wrapperClass:   'wrapper-replace-select',
            valueClass:     'replace-value'
        },

        init: function() {
            this.replaceFoundSelects();
            this.listenForSelectClick();
        },

        replaceFoundSelects: function() {
            var that = this;

            if (that.vars.replaced.length) {

                that.vars.replaced.each(function() {
                    $(this).addClass(that.vars.replacedClass);
                    $(this).wrap('<div class="' + that.vars.wrapperClass + '"></div>');
                    $(this).parent().append($('<span class="' + that.vars.customClass + '" aria-hidden="true"><span class="' + that.vars.valueClass + '"></span></span>'));

                    that.setInitialText($(this));
                });
            }
        },

        setInitialText: function(el) {
            var that = this,
                val = el.find('option:first').text(),
                wrapper = el.parent(),
                text = wrapper.find('.' + that.vars.valueClass);

            text.text(val);
        },

        listenForSelectClick: function() {
            var that = this;

            that.vars.replaced.on('change', function() {
                var el = $(this);

                that.updateReplacedOption(el);
            });
        },

        updateReplacedOption: function(el) {
            var that = this,
                val = el.val(),
                wrapper = el.parent(),
                text = wrapper.find('.' + that.vars.valueClass);

            text.text(val);
        },

        listenForKeyPress: function() {
            var that = this;

            that.vars.replaced.on('keyup', function() {
                // Not sure this is necessary yet.
            });
        }

    };

    CustomSelectReplacement.init();
});
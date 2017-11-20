(function($) {
    $.fn.chatbot = function() {
        return this.each(function() {
            var chatbot = new Chatbot(this);
            chatbot.init();
        });
    };
}(jQuery));

function Chatbot(item) {
    var self = this;
    
    self.item = item;
    
    self.init = function() {
        console.log(self.item);
    };
}
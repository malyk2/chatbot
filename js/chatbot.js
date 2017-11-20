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
    
    self.messages = {};

    self.item = $(item);
    
    self.wrapper = false;
    
    self.currentMessage = 1;
    
    self.wrap = function() {
        self.item.wrapInner('<div id="hu-messages-container"><div class="hu-messages-wrapper"></div></div>');
        self.wrapper = self.item.find('.hu-messages-wrapper');
    };
    
    self.renderQuesMessage = function(message) {
        let date = new Date();
        let h = date.getHours();
        if (h < 10) {
            h =+ 0;
        }
        let m = date.getMinutes();
        let time = h + ':' + m;
        
        let html = '';
         
        for (let i in message['texts']) {
            let text = message['texts'][i];
            html += `
                <div class="hu-message brand animate left-in">
                    <div class="hu-message-container">
                        <div class="hu-message-margin">
                            <div class="hu-message-info visible" style="transition: transform 0.25s; transform: translateY(0px);">
                                <div class="hu-message-avatar hu-background-color_contrast-fade circle"></div>
                                <div class="hu-message-date hu-a-center hu-s-10 hu-color_contrast">`+time+`</div>
                            </div>
                            <div class="hu-message-content" style="">
                                <div class="hu-message-bubble hu-background-color_bot-message-background" style="width: auto; height: auto;">
                                    <p class="hu-message-text hu-color_bot-message-text" style="display: inline-block; opacity: 1;">`+text.text+`</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
        return html;
    };
    
    self.renderInput = function(message) {
        html = '';
        html += `
        <div id="hu-message-input" class="enabled">
            <div class="hu-input-box" style="height: auto;">
                <div class="hu-input-container menu">
                    <div class="hu-input-header"></div>
                    <div class="hu-input-body">
                        <div class="hu-input-menu"><span class="hu-input-menu-info not-selectable hu-s-10 hu-color_contrast hu-t-uppercase">Choose an option</span>
                            <div class="hu-input-menu-buttons">`;
                            for (let i in message['answers']) {
                                let answer = message['answers'][i];
                                html+= `
                                <button class="chatbot-button menu-button undefined hu-color_button-text hu-background-color_button-background hu-border-color_button-background-dark"                        data-message="`+answer['goto']+`" tabindex="1"><span class="button-text">`+answer['text']+`</span></button>
`;
                            }
                            html += `
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
        return html;
    };
    
    
    self.writeMessage = function() {
        let date = new Date();
        let message = self.messages[self.currentMessage];
        let html = '';
        html += self.renderQuesMessage(message);
        html += self.renderInput(message);
        self.wrapper.append(html);
    };
    
    self.start = function() {
        self.writeMessage(self.currentMessage);
    };
    
    self.actions = function() {
        self.item.on('click', '.chatbot-button', function(){
            let messageNumber = $(this).data('message');
            $(this).hide();
            self.currentMessage = messageNumber;
            self.writeMessage();
        });
    };
    self.init = function() {
        $.getJSON("data.json", function(json) {
            self.messages = json;
        }).done(function() {
            self.wrap();
            self.actions();
            self.start();
        });
    };
}
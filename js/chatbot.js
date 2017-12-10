(function($) {
    $.fn.chatbot = function(params) {
        return this.each(function() {
            var chatbot = new Chatbot(this, params);
            chatbot.init();
        });
    };
}(jQuery));

function Chatbot(item, params) {
    var self = this;
    
    self.messages = {};

    self.item = $(item);
    
    self.params = params;
    
    self.wrapper = false;
    
    self.inputData = {};
    
    self.currentMessage = 1;
    
    self.timeoutMessage = 3000;
    
    self.timeoutInput = 2000;
    
    self.wrap = function() {
        self.item.wrapInner('<div id="hu-messages-container"><div class="hu-messages-wrapper"></div></div>');
        self.wrapper = self.item.find('.hu-messages-wrapper');
    };
    
    self.getTime = function() {
        let date = new Date();
        let h = date.getHours();
        if (h < 10) {
            h = 0+''+h;
        }
        let m = date.getMinutes();
        if (m < 10) {
            m = 0+''+m;
        }
        return (h + ':' + m);
    };
    
    self.handleText = function(text) {
        if (Object.keys(self.inputData).length && text.type === 'text') {
            for (let i in self.inputData) {
                text.text = text.text.replace('{{'+i+'}}', self.inputData[i]);
            }
        }
        return text;
    };
    
    self.renderQuesMessage = function(message) {
        let time = self.getTime();
        let html = '';
        for (let i in message['texts']) {
            let classContainer = ((i*1 +1) === message['texts'].length);
            let text = self.handleText(message['texts'][i]);
            html += '\n\
<div class="hu-message brand animate left-in">\n\
                    <div class="hu-message-container '+(classContainer ? 'active' : '') +'">\n\
                        <div class="hu-message-margin">\n\
                            <div class="hu-message-info visible" style="transition: transform 0.25s; transform: translateY(0px);">\n\
                                <div class="hu-message-avatar hu-background-color_contrast-fade circle"></div>\n\
                                <div class="hu-message-date hu-a-center hu-s-10 hu-color_contrast">'+ ((classContainer) ? time : '' ) +'</div>\n\
                            </div>\n\
                            <div class="hu-message-content">\n\
                                <div class="hu-message-bubble hu-background-color_bot-message-background" style="width: auto; height: auto;">\n\
                                <div class="typing-spinner loading"><div class="ball hu-background-color_accent"></div><div class="ball hu-background-color_accent"></div><div class="ball hu-background-color_accent"></div></div>';
                            switch (text.type) {
                                case 'text':
                                    html += '<p class="hu-message-text hu-color_bot-message-text hidden loading">'+text.text+'</p>';
                                break;
                                case 'image': 
                                    html += '<div class="hu-message-image" style="display: inline-block; opacity: 1;">\n\
                                                <img src="'+text.src+'">\n\
                                             </div>'; 
                            }
                            html += '</div>\n\
                                </div>\n\
                            </div>\n\
                        </div>\n\
                    </div>\n\
                </div>';
        }
        return html;
    };
    
    self.renderText =  function(lastText) {
        let time = self.getTime();

        let text = self.handleText(self.messages[self.currentMessage].texts.shift());

        let html = '';
        html += '\n\
            <div class="hu-message-info visible" style="transition: transform 0.25s; transform: translateY(0px);">\n\
                <div class="hu-message-avatar hu-background-color_contrast-fade circle"></div>\n\
                <div class="hu-message-date hu-a-center hu-s-10 hu-color_contrast">'+time+'</div>\n\
            </div>\n\
            <div class="hu-message-content">\n\
                <div class="hu-message-bubble hu-background-color_bot-message-background" style="width: auto; height: auto;">\n\
                <div class="typing-spinner loading">\n\
                    <div class="ball"></div>\n\
                    <div class="ball"></div>\n\
                    <div class="ball"></div>\n\
                    <div class="ball"></div>\n\
                    <div class="ball"></div>\n\
                </div>';
        switch (text.type) {
            case 'text':
                html += '<p class="hu-message-text hu-color_bot-message-text hidden loading">'+text.text+'</p>\n\
                        </div>';
            break;
            case 'image': 
                html += '<div class="hu-message-image hidden loading">\n\
                            <img src="'+text.src+'">\n\
                        </div>\n\
                        </div>';
        }
        html += '</div>';
        self.container.append(html);

        setTimeout(function(){
            self.disableLoading(self.container.find('.hu-message-content'));
            if ( ! lastText) {
                self.container.removeClass('active');
            }
            self.writeMessage();
        }, self.timeoutMessage);
    };
    
    self.disableLoading = function(messageContent) {
        messageContent.find('.hu-message-text.loading').removeClass('hidden').removeClass('loading');
        messageContent.find('.hu-message-image.loading').removeClass('hidden').removeClass('loading');
        messageContent.find('.typing-spinner.loading').removeClass('loading').hide();
    };
    
    self.renderInput = function() {
        let message = self.messages[self.currentMessage];
        if(message['customVars'] && message['customVars'].length > 0) {
            for (let i in message['customVars']) {
                let customVar = message['customVars'][i];
                self.inputData[customVar.name] = customVar.value;
            }
        }
        if (message['answers'].length > 0) {
            html = '';
            html += '<div id="hu-message-input" class="enabled">\n\
                        <div class="hu-input-box" style="height: auto;">\n\
                            <div class="hu-input-container menu">\n\
                                <div class="hu-input-header"></div>\n\
                                <div class="hu-input-body">';
                            switch(message['answers_type']) {
                                case 'button':
                                    html += '<div class="hu-input-menu">\n\
                                                <div class="select-text"><span>Select an option</span></div>\n\
                                            <div class="hu-input-menu-buttons">';
                                    for (let i in message['answers']) {
                                        let answer = message['answers'][i];
                                        html += '<button class="chatbot-button menu-button undefined hu-color_button-text hu-background-color_button-background hu-border-color_button-background-dark" data-message="'+answer['goto']+'" tabindex="1"><span class="button-text">'+answer['text']+'</span></button>';
                                    }
                                    break;
                                case 'input':
                                    for (let i in message['answers']) {
                                        let answer = message['answers'][i];
                                        html += '<div class="hu-textarea-light empty">\n\
                                                    <div class="hu-textarea-input-container hu-background-color_textarea-background text">\n\
                                                        <div class="hu-textarea hu-color_textarea-text" contenteditable="true" tabindex="1" placeholder="'+answer['text']+'" ></div>\n\
                                                        <div class="hu-textarea-buttons">\n\
                                                            <button class="send send-input" tabindex="2" data-name="'+answer['name']+'" data-message="'+answer['goto']+'">\n\
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" x="3650" y="3688">\n\
                                                                    <path fill="" d="M1.1 21.757l22.7-9.73L1.1 2.3l.012 7.912 13.623 1.816-13.623 1.817-.01 7.912z"></path>\n\
                                                                </svg>\n\
                                                            </button>\n\
                                                        </div>\n\
                                                    </div>\n\
                                                    <div class="separator hu-background-color_inline-input"></div>\n\
                                                </div>\n\
                                                <span class="hu-textarea-footer-info not-selectable hu-s-10 hu-color_contrast hu-t-uppercase">Press enter to send</span>';
                                    }
                                    break;
                            }
                            html += '</div>\n\
                                </div>\n\
                            </div>\n\
                        </div>\n\
                    </div>\n\
                </div>';
            self.wrapper.append(html);
            $('html, body').stop().animate({
                'scrollTop': self.wrapper.find('.hu-input-box').last().offset().top-150
            }, 800);
        }
    };
    self.writeAnswer = function (text) {
        self.container.removeClass('active');
        let time = self.getTime();
        html = '<div class="hu-message user animate" style="height: auto;">\n\
                    <div class="hu-message-container">\n\
                        <div class="hu-message-margin">\n\
                            <div class="hu-message-info visible">\n\
                                <div class="hu-message-date hu-a-center hu-s-10 hu-color_contrast" style="">'+time+'</div>\n\
                            </div>\n\
                            <div class="hu-message-content" style="">\n\
                                <div class="hu-message-bubble hu-background-color_user-message-background" style="width: auto; height: auto;">\n\
                                    <p class="hu-message-text hu-color_user-message-text" style="">'+text+'</p>\n\
                                </div>\n\
                            </div>\n\
                        </div>\n\
                    </div>\n\
                </div>';
        self.wrapper.append(html);
    };
    
    self.writeMessage = function() {
        if (self.messages[self.currentMessage].texts.length > 0) {
            let lastText = self.messages[self.currentMessage].texts.length === 1;
            let html = '';
            html += '<div class="hu-message brand animate left-in">\n\
                        <div class="hu-message-container">\n\
                            <div class="hu-message-margin active">\n\
                            </div>\n\
                        </div>\n\
                    </div>';  
            self.wrapper.append(html);
            self.container = self.item.find('.hu-message-margin').last();
            self.renderText(lastText);
            
            if (lastText && (self.messages[self.currentMessage].finish)) {
                self.sendData();
            } 
            
            $('html, body').stop().animate({
                'scrollTop': self.container.offset().top-420
            }, 800);
        
        } else {
            setTimeout(function() {
                self.renderInput();
            }, self.timeoutInput);
        }
    };
    
    self.hideLoading = function() {
        $('.hu-message-text.loading').removeClass('hidden').removeClass('loading');
        $('.typing-spinner.loading').removeClass('loading').hide();
    };
    
    self.start = function() {
        self.writeMessage(self.currentMessage);
    };
    
    self.actions = function() {
        self.item.on('click', '.chatbot-button', function(){
            let messageNumber = $(this).data('message');
            $(this).closest('#hu-message-input').hide();
            self.writeAnswer($(this).text());
            self.currentMessage = messageNumber;
            self.writeMessage();
        });
        self.item.on('click', '.send-input', function() {
            let name = $(this).data('name');
            let value = $(this).closest('.hu-textarea-input-container').find('.hu-textarea').text();
            let messageNumber = $(this).data('message');
            switch (name) {
                case 'username':
                    if (value !== '') {
                        self.inputData[name] = value;
                        self.writeAnswer(value);
                        self.currentMessage = messageNumber;
                        self.writeMessage();
                        $(this).closest('#hu-message-input').removeClass('enabled');
                        $(this).closest('#hu-message-input').hide();
                    } 
                    break;
                case 'useremail':
                    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    if (re.test(value)) {
                        self.inputData[name] = value;
                        self.writeAnswer(value);
                        self.currentMessage = messageNumber;
                        self.writeMessage();
                        $(this).closest('#hu-message-input').removeClass('enabled');
                        $(this).closest('#hu-message-input').hide();
                    } else {
                        self.currentMessage = 6;
                        self.writeMessage();
                        $(this).closest('#hu-message-input').removeClass('enabled');
                        $(this).closest('#hu-message-input').hide();
                    }
                    break;
                case 'userphone':
                    if (value !== '') {
                        self.inputData[name] = value;
                        self.writeAnswer(value);
                        self.currentMessage = messageNumber;
                        self.writeMessage();
                        $(this).closest('#hu-message-input').removeClass('enabled');
                        $(this).closest('#hu-message-input').hide();
                    }
                    break;
            }
        });
        self.item.on('keypress','.hu-textarea',function(e) {
            if(e.which == 13) {
                e.preventDefault();
                $(this).next().find('button.send-input').trigger('click');
            }
        });
    };
    
    self.sendData = function() {
        if (self.params.api_url) {
            $.ajax({
                type: 'post',
                data: self.inputData,
                url: self.params.api_url
            });
        }
    };
    
    self.init = function() {
        self.messages = messages;
        self.wrap();
        self.actions();
        self.start();
    };
}
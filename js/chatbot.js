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
        let username = self.username || '';
        let useremail = self.useremail || '';
        if (text.type == 'text') {
            text.text = text.text.replace('{{username}}', username);
            text.text = text.text.replace('{{useremail}}', useremail);
        }
        return text;
    };
    
    self.renderQuesMessage = function(message) {
        let time = self.getTime();
        let html = '';
        for (let i in message['texts']) {
            let classContainer = ((i*1 +1) === message['texts'].length);
            let text = self.handleText(message['texts'][i]);
            html += `
                <div class="hu-message brand animate left-in">
                    <div class="hu-message-container `+(classContainer ? 'active' : '') +`">
                        <div class="hu-message-margin">
                            <div class="hu-message-info visible" style="transition: transform 0.25s; transform: translateY(0px);">
                                <div class="hu-message-avatar hu-background-color_contrast-fade circle"></div>
                                <div class="hu-message-date hu-a-center hu-s-10 hu-color_contrast">`+ ((classContainer) ? time : '' ) +`</div>
                            </div>
                            <div class="hu-message-content">
                                <div class="hu-message-bubble hu-background-color_bot-message-background" style="width: auto; height: auto;">
                                <div class="typing-spinner loading"><div class="ball hu-background-color_accent"></div><div class="ball hu-background-color_accent"></div><div class="ball hu-background-color_accent"></div></div>
                            `;
                            switch (text.type) {
                                case 'text':
                                    html += `
                                            <p class="hu-message-text hu-color_bot-message-text hidden loading">`+text.text+`</p>
                                    `;
                                break;
                                case 'image': 
                                    html += `
                                        <div class="hu-message-image" style="display: inline-block; opacity: 1;">
                                            <img src="`+text.src+`">
                                        </div>
                                    `; 
                            }
                            html += `
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
                    <div class="hu-input-body">`;
                        switch(message['answers_type']) {
                            case 'button':
                                html += `<div class="hu-input-menu"><span class="hu-input-menu-info not-selectable hu-s-10 hu-color_contrast hu-t-uppercase">Choose an option</span>
                                        <div class="hu-input-menu-buttons">`; 
                                for (let i in message['answers']) {
                                    let answer = message['answers'][i];
                                    html+= `
                                            <button class="chatbot-button menu-button undefined hu-color_button-text hu-background-color_button-background hu-border-color_button-background-dark"                        data-message="`+answer['goto']+`" tabindex="1"><span class="button-text">`+answer['text']+`</span></button>
                                    `;
                                }
                                break;
                            case 'input':
                                for (let i in message['answers']) {
                                    let answer = message['answers'][i];
                                    html += `
                                    <div class="hu-textarea-light empty">
                                        <div class="hu-textarea-input-container hu-background-color_textarea-background text">
                                            <div class="hu-textarea hu-color_textarea-text" contenteditable="true" tabindex="1" placeholder="`+answer['text']+`" suppresscontenteditablewarning="true"></div>
                                            <div class="hu-textarea-buttons">
                                                <button class="send send-input" tabindex="2" data-name="`+answer['name']+`" data-message="`+answer['goto']+`">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" x="3650" y="3688">
                                                        <path fill="" d="M1.1 21.757l22.7-9.73L1.1 2.3l.012 7.912 13.623 1.816-13.623 1.817-.01 7.912z"></path>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                        <div class="separator hu-background-color_inline-input"></div>
                                    </div>
                                    <span class="hu-textarea-footer-info not-selectable hu-s-10 hu-color_contrast hu-t-uppercase">Press enter to send</span>
                                    `;
                                }
                                break;
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
    self.writeAnswer = function (text) {
        let time = self.getTime();
        html = `
            <div class="hu-message user animate" style="height: auto;">
                <div class="hu-message-container">
                    <div class="hu-message-margin">
                        <div class="hu-message-info visible">
                            <div class="hu-message-date hu-a-center hu-s-10 hu-color_contrast" style="">`+time+`</div>
                        </div>
                        <div class="hu-message-content" style="">
                            <div class="hu-message-bubble hu-background-color_user-message-background" style="width: auto; height: auto;">
                                <p class="hu-message-text hu-color_user-message-text" style="">`+text+`</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        self.wrapper.append(html);
    };
    
    self.writeMessage = function() {
        let date = new Date();
        let message = self.messages[self.currentMessage];
        let html = '';
        html += self.renderQuesMessage(message);
        html += self.renderInput(message);
        self.wrapper.append(html);
        setTimeout(function() {
            self.hideLoading();
        }, 1000);
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
                        self[name] = value;
                        self.writeAnswer(value);
                        self.currentMessage = messageNumber;
                        self.writeMessage();
                    } 
                    break;
                case 'useremail':
                    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    if (re.test(value)) {
                        self[name] = value;
                        self.writeAnswer(value);
                        self.currentMessage = messageNumber;
                        self.writeMessage();
                    } else {
                        self.currentMessage = 6;
                        self.writeMessage();
                    }
                    break;
                case 'userphone':
                    if (value !== '') {
                        self[name] = value;
                        self.writeAnswer(value);
                        self.currentMessage = messageNumber;
                        self.writeMessage();
                    }
                    break;
            }
            $(this).closest('#hu-message-input').hide();
        });
        
    };
    self.init = function() {
        self.messages = messages;
        self.wrap();
        self.actions();
        self.start();
    };
}
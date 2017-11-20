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
    
    self.data = {
        messages: [
            {
                type: 'text',
                texts : [
                    {
                        text: 'Hello there!'
                    }
                ],
                finish: true,
                answers: [
                    {
                        type: 'button',
                        text: 'Hi!',
                        goto: 1
                    }
                ]
            }
        ]
    };
    
    self.temp = {
        messages: {
            items: {
                type: 'text',
                text : 'Hello there!'
            },
            answers: {
                type: 'button',
                text: 'Hi!',
                goto: 1
            }
        }
    };
    
    self.messages = {
        1 : {
            type: 'text',
                texts : [
                    {
                        text: 'Hello there!'
                    }
                ],
                finish: true,
                answers: [
                    {
                        type: 'button',
                        text: 'Hi!',
                        goto: 2
                    }
                ]
        },
        2 : {
            type: 'text',
                texts : [
                    {
                        text: 'You must be having some back pain!  We know how much that can impact your life - but trust us, there is nothing like getting to the other side!' 
                    },
                    {
                        text: 'In fact - this is actual footage of what our clinic looks like when we see someone recover from pain! ' 
                    }
                ],
                answers: [
                    {
                        type: 'button',
                        text: 'A bit',
                        goto: 1
                    },
                    {
                        type: 'button',
                        text: 'Sore but manageable',
                        goto: 1
                    },
                    {
                        type: 'button',
                        text: 'Can\'t handle the pain',
                        goto: 1
                    }
                ]
        }
    };

    self.item = $(item);
    
    self.wrapper = false;
    
    self.currentMessage = 1;
    
    self.wrap = function() {
        self.item.wrapInner('<div id="chatbot-messages-container"><div class="chatbot-messages-wrapper"></div></div>');
        self.wrapper = self.item.find('.chatbot-messages-wrapper');
    };
    
    
    self.writeMessage = function() {
        let date = new Date();
        let message = self.messages[self.currentMessage];
        let html = `
            <div class="chatbot-message-container"><div class="chatbot-message-margin">
            <div class="chatbot-message-info visible" style="transition: transform 0.25s ease 0s; transform: translateY(0px);">
                <div class="chatbot-message-avatar hu-background-color_contrast-fade circle"></div>
                <div class="chatbot-message-date hu-a-center hu-s-10 hu-color_contrast">`+date.getHours()+':'+date.getMinutes()+`</div>
            </div>`;
            for(let i in message.texts) {
                let item = message.texts[i];
                html += `
                    <div class="chatbot-message-content" style="">
                        <div class="chatbot-message-bubble hu-background-color_bot-message-background" style="width: auto; height: auto;">
                            <div class="typing-spinner" style="height: 24px; width: 0px;">
                                <div class="ball hu-background-color_accent"></div>
                                <div class="ball hu-background-color_accent"></div>
                                <div class="ball hu-background-color_accent"></div>
                            </div>
                            <p class="chatbot-message-text hu-color_bot-message-text" style="display: inline-block; opacity: 1;">`+item['text']+`</p>
                        </div>
                    </div>
                `;
            }
            
            if (message['answers'].length > 0) {
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
            }
            html+='</div></div>';
      
        //self.wrapper.find('.chatbot-message-margin').append(html);
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
        console.log(self.messages[1]);
        
        self.wrap();
        self.actions();
        self.start();
    };
}
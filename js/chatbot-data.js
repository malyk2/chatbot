var messages = {
    "1" : {
            "texts" : [
                {
                    "type": "text",
                    "text": "Hello there!"
                }
            ],
            "answers": [
                {
                    "text": "Hi!",
                    "goto": "2"
                }
            ],
            "answers_type": "button"
    },
    "2" : {
            "texts" : [
                {
                    "type": "text",
                    "text": "You must be having some back pain!  We know how much that can impact your life - but trust us, there is nothing like getting to the other side!" 
                },
                {
                    "type": "text",
                    "text": "In fact - this is actual footage of what our clinic looks like when we see someone recover from pain! " 
                },
                {
                    "type": "image",
                    "src": "img/0_gL8rmnA.gif" 
                },
                {
                    "type": "text",
                    "text": "When back pain starts, it can change your life pretty quickly." 
                },
                {
                    "type": "text",
                    "text": "How much pain are you in? " 
                }
            ],
            "answers": [
                {
                    "text": "A bit",
                    "goto": 3
                },
                {
                    "text": "Sore but manageable",
                    "goto": 9
                },
                {
                    "text": "Can\"t handle the pain",
                    "goto": 10
                }
            ],
            "answers_type": "button"
    },
    "3" : {
            "texts" : [
                {
                    "type": "text",
                    "text": "Phew! We are glad you are able to manage.  Treating back pain before it gets too bad can help in the long term.  "
                },
                {
                    "type": "text",
                    "text": "How about we setup a 10 minute call to hear more talk and see if we can help? "
                }
            ],
            "answers": [
                {
                    "text": "Sure, please call me",
                    "goto": "4"
                },
                {
                    "text": "Can you just email some back pain info?",
                    "goto": "1"
                }
            ],
            "answers_type": "button"
    },
    "4" : {
            "texts" : [
                {
                    "type": "text",
                    "text": "Sure thing, can we get your name please:"
                }
            ],
            "answers": [
                {
                    "text": "Type your name here...",
                    "name": "username",
                    "goto": "5"
                }
            ],
            "answers_type": "input"
    },
    "5" : {
            "texts" : [
                {
                    "type": "text",
                    "text": "Awesome, thank {{username}} !"
                },
                {
                    "type": "text",
                    "text": "Which email address shall we use to reach you?"
                }
            ],
            "answers": [
                {
                    "text": "Type your email here...",
                    "name": "useremail",
                    "goto": "7"
                }
            ],
            "answers_type": "input"
    },
    "6" : {
            "texts" : [
                {
                    "type": "text",
                    "text": "I'm afraid I didn't understand, could you try again, please?"
                }
            ],
            "answers": [
                {
                    "text": "Type your email here...",
                    "name": "useremail",
                    "goto": "7"
                }
            ],
            "answers_type": "input"
    },
    "7" : {
            "texts" : [
                {
                    "type": "text",
                    "text": "{{username}} - last thing here, what is the best phone number to reach you at?"
                }
            ],
            "answers": [
                {
                    "text": "Type your phone here...",
                    "name": "userphone",
                    "goto": "8"
                }
            ],
            "answers_type": "input"
    },
    "8" : {
            "texts" : [
                {
                    "type": "text",
                    "text": "Perfect! We will contact you very soon. "
                },
                {
                    "type": "text",
                    "text": "Here is some more actual footage of our PTs after client recovery."
                },
                {
                    "type": "image",
                    "src": "img/0_x6Xh79K.gif" 
                },
                {
                    "type": "text",
                    "text": "{{username}}  - We can't wait to celebrate for you!  Let's get you on the path to recovery and doing the things you love!"
                }
            ],
            "answers": [
                
            ],
            "answers_type": "input"
    },
    "9" : {
            "texts" : [
                {
                    "type": "text",
                    "text": "Phew! We are glad you are able to manage.  Treating back pain before it gets too bad can help in the long term."
                },
                {
                    "type": "text",
                    "text": "How about we setup a 10 minute call to hear more talk and see if we can help? "
                }
            ],
            "answers": [
                {
                    "text": "Sure, please call me",
                    "goto": "4"
                },
                {
                    "text": "Can you just email some back pain info?",
                    "goto": "1"
                }
            ],
            "answers_type": "button"
    },
    "10" : {
            "texts" : [
                {
                    "type": "text",
                    "text": "Ouch!  That's tough to live with.  How about we setup a 10 minute call to hear more talk and see if we can help? "
                }
            ],
            "answers": [
                {
                    "text": "Sure, please call me",
                    "goto": "4"
                },
                {
                    "text": "Can you just email some back pain info?",
                    "goto": "11"
                }
            ],
            "answers_type": "button"
    },
    "11" : {
            "texts" : [
                {
                    "type": "text",
                    "text": "No problem -we've got some great information for you!"
                },
                {
                    "type": "text",
                    "text": "What email address should we send this to (we hate SPAM too! We will protect your email)"
                }
            ],
            "answers": [
                {
                    "text": "Type your email here...",
                    "name": "useremail",
                    "goto": "12"
                }
            ],
            "answers_type": "input"
    },
    "12" : {
            "texts" : [
                {
                    "type": "text",
                    "text": "What is your name? "
                }
            ],
            "answers": [
                {
                    "text": "Type here...",
                    "name": "username",
                    "goto": "13"
                }
            ],
            "answers_type": "input"
    },
    "13" : {
            "texts" : [
                {
                    "type": "text",
                    "text": "Thanks {{username}}.  We'll send you a link to our back pain ebook shorty!"
                },
                {
                    "type": "text",
                    "text": "Here is some more actual footage of our PTs after client recovery. "
                },
                {
                    "type": "image",
                    "src": "img/0_x6Xh79K.gif" 
                },
                {
                    "type": "text",
                    "text": "{{username}}  - We can't wait to celebrate for you!  Let's get you on the path to recovery and doing the things you love!"
                }
            ],
            "answers": [
                
            ],
            "answers_type": "input"
    }
};
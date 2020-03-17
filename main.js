let botui = BotUI('botui-app', {
    vue: Vue
});

const showVideo = () => {
    return new Promise((resolve, reject) => {
        botui.message.add({
            delay: 1000,
            type: 'embed', 
            content: 'https://www.youtube.com/embed/x1kD6-izWtY'
        }).
        then(resolve());
    });
}

// Greetings
const greeting = () => {
    botui.message.add({
        content: 'Hello! Im the ZamApps chatbot, you can call me...',
        delay: 1000,
    }).then(() => {
        botui.message.add({
            delay: 1000,
            content: '...the ZamBot! What\'s your name?'
        }).then(() => {
            return botui.action.text({
                action: {
                    delay: 1000,
                    human: true,
                    placeholder: 'Name :)'
                }
            });
        }).then((res) => { // get the result
            botui.message.add({
                content: `Hey ${res.value}, Do you want to know what VinoEz is? `,
                delay: 1000,
            }).then(() => {
                describeVinoEz();
            });
        });
    });
}

const describeVinoEz = () => {
    botui.action.button({
        delay: 1000,
        human: true,
        action: [{
            icon: 'check',
            text: 'Yes!',
            value: 'confirm'
        }, {
            icon: 'close',
            text: 'No',
            value: 'no'
        }]
    }).then((res) => {
        botui.action.hide();
        if (res.value == 'confirm') {
            showVideo()
            .then(() => {
                botui.message.add({
                    delay: 2500,
                    content: 'From planning out the various steps in blending to scheduling harvest, vinoEZ provides a central location for winemakers, the cellar team, viticulturists and management to track and facilitate work.'
                }).then(() =>{
                    return botui.message.add({
                        delay: 3500,
                        content: 'In order to accomplish this vinoEZ make uses of several modules:'
                    });
                }).then(() => {
                    return botui.message.add({
                        type: 'html', 
                        loading: true,
                        delay: 2000,
                        content: '<div class="vinoez-module"><img src="https://vinoez.com/wp-content/uploads/2019/04/ic-96-px-harvest.png" class="attachment-full size-full" alt="" scale="0"><p>Harvest Scheduler</p><p>Centralized schedule for all fruit coming into all wineries. Winemakers, viticulturist and wineries are all on the same page with one version of the schedule. The schedule is accessed and updated either via the web interface or the iPhone/iPad companion application.</p></div>'
                    });
                }).then(() => {
                    return botui.message.add({
                        type: 'html', 
                        loading: true,
                        delay: 2000,
                        content: '<div class="vinoez-module"><img src="https://vinoez.com/wp-content/uploads/2019/04/ic-96-px-blend.png" class="attachment-full size-full" alt="" scale="0"><p>Blend Planning</p><p>Driven from scheduling bottling and available bulk wine inventory, the Blend Planning module generates planned blending activities across the network. It is a collaboration platform for everyone involved with getting blends ready to bottle.</p></div>'
                    });
                }).then(() => {
                    endConversation();
                })
            })
        } else {
            endConversation();
        }
    });
}

const endConversation = () => {
    botui.message.add({
        loading: true,
        delay: 2000,
        content: 'Before you go, suscribe to our newsletter!'
    }).then(() => {
        botui.action.text({
            action: {
                sub_type: 'email',
                placeholder: 'Enter your email here :)'
            }
        });
    });
}

// Conversation
greeting();
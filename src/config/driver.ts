import Driver from 'driver.js';
// intl 的翻译hooks方法只能在react组件里使用，所以这里对象改为方法，调用的时候将intl的formatMessage传进来
export function initDriver(formatMessage: Function) {
    const guideParams = {
        allowClose: false, //禁止点击外部关闭
        padding: 0, // 如果设置padding要设法解决右侧元素可能会挤出页面的横向滚动条
        stageBackground: '#fff', // 引导对话的背景色
        doneBtnText: formatMessage({ id: 'guide.finish' }), // 完成按钮标题
        closeBtnText: formatMessage({ id: 'guide.close' }), // 关闭按钮标题
        nextBtnText: formatMessage({ id: 'guide.next' }), // 下一步按钮标题
        prevBtnText: formatMessage({ id: 'guide.prev' }) // 上一步按钮标题
    }
    const guideSteps = [
        {
            element: "#sider-trigger",
            popover: {
                title: formatMessage({ id: 'guide.change.collapse' }),
                description: formatMessage({ id: 'guide.change.collapse.desc' }),
                position: "bottom-left",
            },
        },
        {
            element: "#fullscreen",
            popover: {
                title: formatMessage({ id: 'guide.change.fullscreen' }),
                description: formatMessage({ id: 'guide.change.fullscreen.desc' }),
                position: "bottom-center",
            },
        },
        {
            element: "#language-switch",
            popover: {
                title: formatMessage({ id: 'guide.change.language' }),
                description: formatMessage({ id: 'guide.change.language.desc' }),
                position: "bottom-right"
            }
        },
        {
            element: "#system-setting",
            popover: {
                title: formatMessage({ id: 'guide.change.setting' }),
                description: formatMessage({ id: 'guide.change.setting.desc' }),
                position: "bottom-right"
            }
        }
    ]

    const driver = new Driver(guideParams)
    driver.defineSteps(guideSteps)
    return driver
}
